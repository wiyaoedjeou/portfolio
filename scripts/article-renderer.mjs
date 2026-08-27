// Small, dependency-free renderer for the documented editorial Markdown subset.
// Raw HTML is escaped. Local links must be resolved by the caller.
export const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));

export function renderArticle(markdown, { lang, resolveLink }) {
  const lines = markdown.replace(/\r\n/g, '\n').trim().split('\n');
  if (!/^# [^#]/.test(lines[0])) throw new Error('An article must start with one H1.');
  const title = lines.shift().slice(2).trim();
  const outline = [];
  const headingIds = new Set();
  const referenceIds = new Set();
  const citedIds = new Set();
  let references = false;

  function inline(text) {
    let html = '';
    for (let i = 0; i < text.length;) {
      const rest = text.slice(i);
      const link = rest.match(/^\[([^\]]+)\]\(([^)]+)\)/);
      if (link) {
        const href = resolveLink(link[2]);
        if (!href || /^(?:javascript|data|vbscript):/i.test(href)) throw new Error('Unsafe link.');
        html += `<a href="${escapeHtml(href)}">${inline(link[1])}</a>`;
        i += link[0].length;
        continue;
      }
      const cite = rest.match(/^\[(\d+(?:,\s*\d+)*)\]/);
      if (cite) {
        const ids = cite[1].split(/,\s*/);
        ids.forEach(id => citedIds.add(id));
        html += `<span class="citation">[${ids.map(id => `<a href="#ref-${id}" aria-label="${lang === 'fr' ? 'Référence' : 'Reference'} ${id}">${id}</a>`).join(', ')}]</span>`;
        i += cite[0].length;
        continue;
      }
      const delimiter = rest.startsWith('**') ? '**' : rest.startsWith('*') ? '*' : rest.startsWith('`') ? '`' : null;
      if (delimiter) {
        const end = text.indexOf(delimiter, i + delimiter.length);
        if (end > i + delimiter.length) {
          const value = text.slice(i + delimiter.length, end);
          const tag = delimiter === '**' ? 'strong' : delimiter === '*' ? 'em' : 'code';
          html += `<${tag}>${delimiter === '`' ? escapeHtml(value) : inline(value)}</${tag}>`;
          i = end + delimiter.length;
          continue;
        }
      }
      html += escapeHtml(text[i++]);
    }
    return html;
  }

  function headingId(text) {
    const base = text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
    let id = base;
    let suffix = 2;
    while (headingIds.has(id)) id = `${base}-${suffix++}`;
    headingIds.add(id);
    return id;
  }

  const cells = line => line.trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim());
  const isTableRule = line => line && line.trim().startsWith('|') && cells(line).every(cell => /^:?-{3,}:?$/.test(cell));
  const isBlock = line => /^(?:#{1,6} |[-*+] |\d+\. |```|>|\|)/.test(line);
  const blocks = [];
  for (let i = 0; i < lines.length;) {
    const line = lines[i].trimEnd();
    if (!line.trim()) { i++; continue; }
    const heading = line.match(/^(#{2,3}) (.+)$/);
    if (heading) {
      const level = heading[1].length;
      const id = headingId(heading[2]);
      references = /^(?:Références|References)$/.test(heading[2]);
      if (level === 2) outline.push({ id, text: heading[2] });
      blocks.push(`<h${level} id="${id}">${inline(heading[2])}</h${level}>`);
      i++;
      continue;
    }
    if (line.startsWith('|') && isTableRule(lines[i + 1])) {
      const headers = cells(line);
      const align = cells(lines[i + 1]).map(cell => cell.endsWith(':') ? ' class="numeric"' : '');
      if (headers.length !== align.length) throw new Error('Table column count mismatch.');
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const values = cells(lines[i++]);
        if (values.length !== headers.length) throw new Error('Table row column count mismatch.');
        rows.push(`<tr>${values.map((value, column) => column === 0 ? `<th scope="row">${inline(value)}</th>` : `<td${align[column]}>${inline(value)}</td>`).join('')}</tr>`);
      }
      blocks.push(`<div class="table-scroll" tabindex="0" role="region" aria-label="${lang === 'fr' ? 'Tableau comparatif' : 'Comparison table'}"><table><thead><tr>${headers.map((value, column) => `<th scope="col"${align[column]}>${inline(value)}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`);
      continue;
    }
    const unordered = /^- /.test(line);
    const ordered = /^\d+\. /.test(line);
    if (unordered || ordered) {
      const pattern = unordered ? /^- (.+)$/ : /^(\d+)\. (.+)$/;
      const items = [];
      while (i < lines.length) {
        const item = lines[i].match(pattern);
        if (!item) break;
        let id = '';
        if (ordered && references) {
          if (referenceIds.has(item[1])) throw new Error(`Duplicate reference ${item[1]}.`);
          referenceIds.add(item[1]);
          id = ` id="ref-${item[1]}"`;
        }
        items.push(`<li${id}>${inline(item[unordered ? 1 : 2])}</li>`);
        i++;
      }
      const tag = unordered ? 'ul' : 'ol';
      blocks.push(`<${tag}${ordered && references ? ' class="reference-list"' : ''}>${items.join('')}</${tag}>`);
      continue;
    }
    if (isBlock(line)) throw new Error(`Unsupported Markdown block: ${line.slice(0, 80)}`);
    const paragraph = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !isBlock(lines[i])) paragraph.push(lines[i++]);
    blocks.push(`<p>${inline(paragraph.join(' '))}</p>`);
  }
  for (const id of citedIds) if (!referenceIds.has(id)) throw new Error(`Missing reference ${id}.`);
  const body = markdown.split(/\n## (?:Références|References)\n/)[0];
  const words = body.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[#*`|]/g, '').trim().split(/\s+/).length;
  return { title, html: blocks.join('\n'), outline, words, references: [...referenceIds] };
}
