(() => {
    'use strict';

    const MEASUREMENT_ID = 'G-15E64V5DTL';
    const STORAGE_KEY = 'wiyao_analytics_consent_v1';
    const CONSENT_MAX_AGE = 183 * 24 * 60 * 60 * 1000;

    const translations = {
        en: {
            title: 'Audience measurement',
            description: 'With your permission, Google Analytics measures viewed pages, traffic sources and interactions to improve this portfolio. No Analytics tracking is loaded if you decline. Your choice is stored for six months.',
            decline: 'Decline',
            accept: 'Accept',
            settings: 'Privacy',
            privacy: 'Google information'
        },
        fr: {
            title: 'Mesure d’audience',
            description: 'Avec votre accord, Google Analytics mesure les pages consultées, l’origine des visites et les interactions afin d’améliorer ce portfolio. Aucun suivi Analytics n’est chargé si vous refusez. Votre choix est conservé pendant six mois.',
            decline: 'Refuser',
            accept: 'Accepter',
            settings: 'Confidentialité',
            privacy: 'Informations Google'
        }
    };

    let analyticsLoaded = false;
    let analyticsActive = false;
    let panel;
    let title;
    let description;
    let privacyLink;
    let declineButton;
    let acceptButton;
    let settingsButton;

    const currentLanguage = () => document.documentElement.getAttribute('lang') === 'fr' ? 'fr' : 'en';

    function readConsent() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
            const validChoice = saved && (saved.value === 'granted' || saved.value === 'denied');
            const validDate = saved && typeof saved.savedAt === 'number';

            if (!validChoice || !validDate || Date.now() - saved.savedAt > CONSENT_MAX_AGE) {
                if (typeof localStorage.removeItem === 'function') {
                    localStorage.removeItem(STORAGE_KEY);
                }
                return null;
            }

            return saved.value;
        } catch {
            return null;
        }
    }

    function saveConsent(value) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                value,
                savedAt: Date.now()
            }));
        } catch {
            // The preference remains valid for the current page if storage is unavailable.
        }
    }

    function consentState(analyticsStorage) {
        return {
            analytics_storage: analyticsStorage,
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
        };
    }

    function enableAnalytics() {
        if (analyticsLoaded) {
            window.gtag('consent', 'update', consentState('granted'));
            analyticsActive = true;
            return;
        }

        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag() {
            window.dataLayer.push(arguments);
        };

        window.gtag('consent', 'default', consentState('granted'));
        window.gtag('js', new Date());
        window.gtag('config', MEASUREMENT_ID, {
            allow_google_signals: false,
            allow_ad_personalization_signals: false
        });

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
        document.head.appendChild(script);

        analyticsLoaded = true;
        analyticsActive = true;
    }

    function disableAnalytics() {
        if (analyticsLoaded && typeof window.gtag === 'function') {
            window.gtag('consent', 'update', consentState('denied'));
        }
        analyticsActive = false;
    }

    function sendEvent(name, parameters = {}) {
        if (!analyticsActive || typeof window.gtag !== 'function') {
            return false;
        }

        window.gtag('event', name, parameters);
        return true;
    }

    function createElement(tagName, className) {
        const element = document.createElement(tagName);
        if (className) {
            element.className = className;
        }
        return element;
    }

    function updateCopy() {
        const language = currentLanguage();
        const copy = translations[language];

        title.textContent = copy.title;
        description.textContent = copy.description;
        declineButton.textContent = copy.decline;
        acceptButton.textContent = copy.accept;
        settingsButton.textContent = copy.settings;
        privacyLink.textContent = copy.privacy;
        privacyLink.href = `https://policies.google.com/privacy?hl=${language}`;
        panel.setAttribute('aria-label', copy.title);
        settingsButton.setAttribute('aria-label', copy.settings);
    }

    function showPreferences() {
        panel.hidden = false;
        settingsButton.hidden = true;
        if (typeof declineButton.focus === 'function') {
            declineButton.focus();
        }
    }

    function hidePreferences() {
        panel.hidden = true;
        settingsButton.hidden = false;
    }

    function choose(value) {
        saveConsent(value);
        if (value === 'granted') {
            enableAnalytics();
        } else {
            disableAnalytics();
        }
        hidePreferences();
    }

    function trackImportantLink(event) {
        if (!analyticsActive || !event.target || typeof event.target.closest !== 'function') {
            return;
        }

        const link = event.target.closest('a[href]');
        if (!link) {
            return;
        }

        const href = link.href || '';
        if (href.startsWith('mailto:') || href.startsWith('tel:')) {
            sendEvent('contact_click', {
                contact_method: href.startsWith('mailto:') ? 'email' : 'phone'
            });
        } else if (/researchgate\.net|linkedin\.com/i.test(href)) {
            sendEvent('outbound_profile_click', {
                destination: /researchgate\.net/i.test(href) ? 'researchgate' : 'linkedin'
            });
        }
    }

    function buildInterface() {
        panel = createElement('section', 'consent-panel');
        panel.id = 'analytics-consent';
        panel.hidden = true;
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-live', 'polite');

        const content = createElement('div', 'consent-panel__content');
        const text = createElement('div', 'consent-panel__text');
        title = createElement('h2', 'consent-panel__title');
        description = createElement('p', 'consent-panel__description');
        privacyLink = createElement('a', 'consent-panel__link');
        privacyLink.target = '_blank';
        privacyLink.rel = 'noopener noreferrer';
        text.append(title, description, privacyLink);

        const actions = createElement('div', 'consent-panel__actions');
        declineButton = createElement('button', 'consent-button consent-button--decline');
        declineButton.type = 'button';
        acceptButton = createElement('button', 'consent-button consent-button--accept');
        acceptButton.type = 'button';
        actions.append(declineButton, acceptButton);

        content.append(text, actions);
        panel.append(content);

        settingsButton = createElement('button', 'consent-settings');
        settingsButton.type = 'button';
        settingsButton.hidden = true;

        document.body.append(panel, settingsButton);
        updateCopy();

        declineButton.addEventListener('click', () => choose('denied'));
        acceptButton.addEventListener('click', () => choose('granted'));
        settingsButton.addEventListener('click', showPreferences);
        window.addEventListener('languagechange', updateCopy);
        document.addEventListener('click', trackImportantLink);

        const consent = readConsent();
        if (consent === 'granted') {
            enableAnalytics();
            hidePreferences();
        } else if (consent === 'denied') {
            hidePreferences();
        } else {
            showPreferences();
        }

        window.portfolioAnalytics = {
            event: sendEvent,
            openPreferences: showPreferences
        };
    }

    function init() {
        if (document.body) {
            buildInterface();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
