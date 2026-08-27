# Pourquoi une chaussée neuve peut-elle gagner en adhérence avant d’en perdre ?

On associe volontiers l’usure à une perte de performance. Pourtant, dans les essais présentés ici, le polissage d’un enrobé commence par une augmentation de l’adhérence. Pour comprendre ce résultat, il faut distinguer deux transformations : le décapage du liant qui expose les granulats, puis l’usure de leurs aspérités. Une analyse à plusieurs échelles permet de suivre cette transition.

## La surface d’un enrobé n’est pas immuable

Un enrobé associe des granulats, des fractions fines et un liant bitumineux. À sa surface, la gomme du pneumatique ne rencontre pas uniquement une géométrie minérale fixée une fois pour toutes. L’exposition des granulats et la forme des aspérités évoluent avec les sollicitations.

Dans les travaux présentés ici, la question n’est donc pas seulement de savoir quel enrobé possède le meilleur niveau initial de frottement. Il s’agit de comprendre comment ce niveau change et quelles transformations de texture accompagnent cette évolution.

L’étude publiée dans *Road Materials and Pavement Design* examine sept formulations. Elle prolonge la démarche développée dans ma thèse, qui comprend une campagne sur huit formulations. Ces ensembles sont proches, mais leurs résultats ne doivent pas être fusionnés comme s’ils constituaient une seule série identique. [1, 2]

Leur point commun est un comportement en deux phases : l’adhérence augmente d’abord, atteint un maximum, puis diminue. Expliquer ces deux phases demande de regarder ce que le polissage révèle autant que ce qu’il enlève.

## Observer l’évolution dans un cadre contrôlé

Les essais utilisent la machine Wehner & Schulze, avec une unité dédiée au polissage et une autre à la mesure du frottement. Des cônes en caoutchouc sollicitent les éprouvettes en présence d’eau et de silice abrasive. La mesure du frottement repose sur le freinage d’une tête équipée de patins en caoutchouc. [1, 2]

Ce dispositif permet de comparer les formulations dans un protocole commun. Il ne reproduit pas toutes les situations rencontrées sur une route : diversité des véhicules, conditions météorologiques, vieillissement du liant ou présence de contaminants. Un nombre de passages de polissage est donc une variable d’essai, pas une durée de service.

Dans la publication sur les sept formulations, deux éprouvettes sont testées par formule. L’une sert notamment à repérer l’évolution du frottement ; l’autre permet de suivre cette évolution en réalisant également des cartographies de surface. Les valeurs de frottement présentées sont les moyennes des deux mesures. Le coefficient de variation moyen rapporté est de 2 %, avec un maximum de 8 %. Ces chiffres renseignent sur la répétabilité observée dans ce programme, pas sur une précision universelle ni sur une équivalence avec le terrain. [1]

## Première phase : le polissage révèle des aspérités

Dans l’article, les sept formulations atteignent leur maximum d’adhérence entre 3 000 et 7 000 passages. La thèse rapporte, pour ses huit formulations, des maxima entre 4 000 et 7 000 passages. Ces intervalles sont propres aux résultats présentés dans chaque document. [1, 2]

L’interprétation proposée est celle d’un décapage progressif du liant et des matériaux fins présents en surface. Leur retrait expose de nouvelles irrégularités minérales. La gomme rencontre alors une géométrie différente de celle de l’état initial.

L’augmentation du frottement n’est donc pas le signe d’une absence d’usure. Une transformation de surface peut enlever de la matière tout en rendant accessibles des aspérités qui contribuent davantage au contact et à la déformation de la gomme.

Cette première phase n’est pas strictement identique pour toutes les formulations. La quantité et la nature des fractions fines, la granulométrie et l’état du liant influencent les transformations observées. Dire simplement que « la rugosité augmente » est trop général : certaines tailles de relief peuvent diminuer pendant que d’autres sont révélées.

## Seconde phase : les aspérités s’aplanissent

Après le maximum, le mécanisme dominant change. L’usure des granulats exposés réduit progressivement une partie des reliefs et de leurs arêtes. Les cartes de surface et les paramètres de texture permettent de suivre cet aplanissement.

La gomme est un matériau viscoélastique : sa réponse dépend de la manière et du rythme auxquels elle est déformée. Une partie du frottement est associée à l’énergie dissipée lors de son interaction avec les aspérités. Modifier la hauteur, la pente ou la courbure de ces aspérités modifie donc les conditions de cette dissipation. [2]

Cette description ne signifie pas que toute variation du frottement peut être attribuée à un unique paramètre géométrique. Elle fournit un mécanisme d’interprétation, à confronter aux mesures. Dans la phase d’usure, la diminution des paramètres de texture aux petites échelles accompagne la diminution du frottement. [1]

Le passage par un maximum résulte ainsi de la succession et du chevauchement de transformations différentes. Le décapage peut rendre la texture minérale plus présente dans le contact ; son polissage ultérieur peut réduire son efficacité. Une valeur mesurée à un seul instant ne permet pas de distinguer ces trajectoires.

## Pourquoi une moyenne de rugosité ne suffit pas

La même valeur moyenne peut résulter de surfaces organisées différemment. Des reliefs larges et peu nombreux ne sollicitent pas la gomme comme une multitude de petites aspérités. De même, deux surfaces présentant une dispersion de hauteurs comparable peuvent avoir des pentes ou des courbures différentes.

L’étude suit plusieurs paramètres : la dispersion des hauteurs, représentée par Sq ; les pentes, par Sdq ; la courbure des sommets, par Ssc ; et leur volume, par Vmp. Calculés sur la surface entière, ils décrivent certains aspects de la géométrie. Mais ils ne précisent pas directement quelles tailles d’irrégularités portent les changements. [1]

Cette limite devient particulièrement importante pendant le décapage. Si de très petits reliefs disparaissent pendant que des reliefs plus grands émergent, une moyenne globale peut atténuer ou masquer les deux évolutions. On risque alors de rechercher une relation simple avec le frottement là où plusieurs mécanismes se superposent.

L’enjeu n’est pas d’abandonner les paramètres classiques. Il est de leur ajouter une information d’échelle pour mieux interpréter ce qu’ils résument.

## Regarder la même surface à plusieurs échelles

La méthode utilisée dans la publication repose sur une décomposition par ondelettes continues appliquée aux cartes tridimensionnelles. Elle permet d’examiner des composantes de texture associées à différentes tailles de relief, puis de recalculer les paramètres sur ces composantes. L’ondelette employée pour cette analyse bidimensionnelle est celle dite du chapeau mexicain. [1]

Il ne s’agit pas de nouveaux essais sur des surfaces physiquement séparées : ce sont différentes lectures mathématiques d’une même topographie mesurée. Leur intérêt est de localiser les changements dans l’ensemble des échelles accessibles à la mesure.

Dans le programme expérimental, quatre zones de 3 × 3 mm sont cartographiées par formulation à plusieurs états : état initial, voisinage du maximum d’adhérence, puis 90 000 et 180 000 passages. La répétition des observations sur les zones suivies aide à relier les changements de texture à l’évolution du frottement. Elle ne supprime pas pour autant l’hétérogénéité de l’éprouvette. [1]

Pendant la phase initiale, les auteurs relient notamment la révélation de reliefs entre 300 et 3 000 µm au retrait du liant et des fines. Les réponses varient selon la composition, et les formulations sans sable ou riches en sable ne suivent pas exactement les mêmes évolutions. Pendant l’usure, la diminution des paramètres aux échelles inférieures à environ 1 000 µm est particulièrement liée à la perte de frottement. [1]

Ces plages décrivent les observations et l’analyse de cette étude. Elles ne définissent pas une taille d’aspérité optimale pour toute chaussée. Elles sont également liées aux dimensions des cartes, à la résolution et aux traitements appliqués : on ne peut pas décrire toute la macrotexture routière à partir de fenêtres de quelques millimètres.

## La granulométrie modifie la trajectoire

Dans les formulations étudiées, les niveaux de frottement les plus élevés sont associés à certaines compositions contenant des granulats de 1 à 2 mm (fraction 1/2). Les comparaisons entre formulations suggèrent un rôle des discontinuités de surface et de la géométrie de ces petits éléments dans la sollicitation de la gomme. [1]

Ce résultat ne se réduit pas à « plus les grains sont petits, meilleure est l’adhérence ». Les fractions fines et les granulats n’ont ni la même forme ni nécessairement la même résistance au polissage. Leur proportion change aussi l’organisation de la surface et les transformations qui apparaissent pendant le décapage.

La comparaison des mélanges apporte donc des pistes pour comprendre et améliorer une formulation. Elle ne constitue pas, à elle seule, une recette universelle : plusieurs caractéristiques varient simultanément et leurs effets doivent être interprétés ensemble.

## Le liant peut déplacer le moment du maximum

La thèse apporte un exemple complémentaire avec les formulations F4 et F4 bis. Elles ont une composition granulométrique comparable et des liants différents. Le maximum de frottement est atteint à 4 000 passages pour F4 et à 7 000 pour F4 bis. Les valeurs maximales rapportées sont respectivement de 0,470 et 0,488. [2]

L’écart de niveau, soit 0,018, doit être interprété au regard de la répétabilité de l’essai ; il ne suffit pas à revendiquer un gain important et général d’adhérence. La différence de position du maximum est, elle, discutée dans la thèse en lien avec la résistance au décapage du liant modifié.

Ce cas montre pourquoi il est utile de comparer les courbes complètes. Deux formulations peuvent atteindre des maxima proches tout en ayant une évolution différente. Pour comprendre leur comportement, le moment où le maximum apparaît compte autant que sa hauteur.

Les désignations F4 et F4 bis employées ici sont celles de la thèse. Ce cas n’est pas ajouté aux données de la publication sur sept formulations comme s’il s’agissait du même ensemble expérimental.

## Ce que ces résultats permettent de dire

Les essais montrent qu’une augmentation initiale de l’adhérence est compatible avec une transformation de la surface par polissage. Ils montrent aussi l’intérêt d’une analyse multiéchelle pour distinguer la mise à nu du relief minéral et son aplanissement ultérieur.

Ils ne permettent pas de calculer directement l’âge auquel une chaussée réelle atteindra son maximum, ni de convertir 180 000 passages de machine en un nombre de kilomètres ou d’années. Une telle transposition demanderait une validation spécifique sur le terrain.

Il faut également distinguer les corrélations géométriques d’une démonstration causale complète. Les débris peuvent être évacués, réintroduits dans le contact ou compactés ; le décapage n’est pas uniforme. Les paramètres mesurés résument les effets de ces phénomènes sans nécessairement les identifier séparément. [1]

La modélisation physique peut aider à approfondir l’interprétation. La thèse explore ainsi le contact et la dissipation dans la gomme, mais souligne aussi que la représentation incomplète du liant et de son décapage limite le modèle appliqué aux enrobés. L’analyse de texture et le calcul mécanique sont complémentaires ; ils ne dispensent pas de représenter les mécanismes pertinents. [2]

## Une performance à comprendre dans le temps

La leçon principale est qu’un état initial ne suffit pas à caractériser le comportement d’une surface. Ce qui est exposé au contact change, et les mécanismes qui gouvernent cette évolution changent avec lui.

Pour les enrobés étudiés, le maximum d’adhérence marque une transition entre une phase où la texture minérale se révèle et une phase où son usure devient dominante. L’analyse multiéchelle rend cette transition plus lisible en montrant quels reliefs évoluent et comment.

C’est cette connaissance qui peut guider des comparaisons de matériaux plus pertinentes : non seulement demander « combien adhère cette surface ? », mais aussi « pourquoi ce niveau change-t-il, à quelles échelles et sous quelles conditions ? ».

## Pour approfondir

- [Texture des chaussées : pourquoi l’échelle change notre lecture de l’adhérence](../fr/05-texture-multiechelle-adherence.md)
- [Du relief à la pression : comprendre le calcul du contact rugueux par BEM](../fr/04-bem-contact-rugueux.md)

## Références

1. Edjeou, W., Cerezo, V., Do, M.-T., Zahouani, H., Ropert, C. et Augris, P. (mise en ligne en 2023). *Multiscale analyse of the relation between skid resistance and pavements surfaces texture evolution with polishing*. Road Materials and Pavement Design. [Article et DOI](https://doi.org/10.1080/14680629.2023.2191723).
2. Edjeou, W. (2021). *Analyse multiéchelle de la texture des chaussées - effet sur l’adhérence des revêtements routiers*. Thèse, École centrale de Nantes, notamment chapitres 3 à 5. [Manuscrit sur HAL](https://theses.hal.science/tel-03651239v1).

*Cet article présente des résultats de laboratoire et leurs interprétations. Il ne constitue ni une recommandation de conduite ni un critère d’acceptation d’un revêtement routier.*
