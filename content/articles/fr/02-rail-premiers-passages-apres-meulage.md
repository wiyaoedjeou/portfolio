# Après le meulage d’un rail, pourquoi les premiers passages comptent-ils autant ?

Le meulage est une opération d’entretien : il enlève de la matière et corrige l’état de la surface du rail. Il laisse aussi des traces d’usinage. Leur hauteur peut diminuer rapidement sous le trafic, mais les sollicitations qu’elles produisent au début ne sont pas nécessairement effacées avec elles. Pour comprendre cette phase, il faut regarder à la fois la topographie et ce qui se passe dans le matériau.

## Entretenir une surface, c’est aussi lui donner un nouvel état initial

La surface d’un rail évolue sous les contacts répétés avec les roues. Usure et fatigue de contact contribuent à cette évolution. Le meulage intervient pour retirer une couche de matière, corriger le profil et traiter certains défauts superficiels. Son intérêt pour la maintenance n’est pas remis en cause par les travaux présentés ici.

La question est plus ciblée : que devient le contact lorsque l’on tient compte de la rugosité réellement produite par cette opération ?

Un profil transversal décrit la forme générale du rail. À une échelle plus fine, les traces de meulage introduisent des sommets, des vallées et des variations locales d’orientation. Deux calculs utilisant le même profil général peuvent alors donner des répartitions de pression très différentes selon qu’ils incluent ou non ces détails.

L’étude publiée dans *Tribology International*, volume 201, associe une campagne de mesure sur le terrain à un modèle de contact élastoplastique pour examiner cette différence. Elle est parue en ligne en 2024, dans un volume daté de 2025. [1]

## Prendre une empreinte plutôt que déplacer le rail

La première difficulté est expérimentale. Une surface ferroviaire ne peut pas toujours être mesurée directement, sur le terrain, avec la finesse et les conditions d’accès disponibles en laboratoire.

La méthode retenue consiste à réaliser des répliques en silicone. Un moule adapté permet de reproduire le profil transversal de la tête du rail. La surface des répliques est ensuite mesurée avec un profilomètre optique. On transfère ainsi une information géométrique du terrain vers le laboratoire, sans prélever une section du rail. [1]

Les campagnes ont été réalisées sur une portion droite de voie à Luleå, en Suède, après le meulage puis au cours des semaines suivantes. Les mesures permettent d’observer la surface neuve et son évolution sous trafic. Les zones réellement sollicitées se distinguent progressivement des régions moins affectées.

La réplique n’est cependant pas la fin de la chaîne de mesure. La topographie acquise doit être traitée pour gérer les points non mesurés, les artefacts et la séparation entre forme générale et rugosité. Ces opérations sont documentées dans l’étude. Elles comptent autant que le choix du capteur, car les petites irrégularités conservées dans les données deviendront ensuite des sollicitations dans le modèle.

## Ce que l’on observe après les premiers passages

À l’échelle des photographies, les marques du meulage s’atténuent et les zones de passage prennent un aspect plus lisse. Les mesures topographiques permettent de quantifier cette évolution au-delà d’une impression visuelle.

L’analyse utilise notamment la hauteur moyenne arithmétique de surface, notée Sa, ainsi que des paramètres décrivant les sommets, le cœur du relief et les vallées. Leur évolution indique une réduction importante de la rugosité au début de la période suivie. Dans cette campagne, la mesure réalisée trois jours après le meulage montre déjà un changement marqué. [1]

Ce délai est une observation propre au site et au trafic étudiés, pas une durée universelle de stabilisation. Il ne faut pas le transposer à toute ligne ferroviaire. La charge transportée, les profils des roues, les conditions du contact et l’environnement peuvent modifier cette évolution.

L’aplanissement observé résulte de mécanismes qui peuvent agir simultanément : enlèvement de matière et déformation plastique. Une surface moins rugueuse ne permet pas, à elle seule, de reconstituer la part de chacun. Elle montre le résultat géométrique de leur action, pas toute l’histoire mécanique du matériau.

## Pourquoi un modèle purement élastique ne suffit pas toujours

Dans un comportement élastique, le matériau retrouve son état initial lorsque la charge disparaît. Un comportement plastique introduit au contraire une part de déformation permanente.

Sous une aspérité, la charge peut être transmise sur une région très limitée. Les sollicitations locales peuvent alors nécessiter une description élastoplastique, même si une représentation plus lisse du contact semble moins sévère. La plasticité modifie la géométrie, redistribue les pressions et laisse un état résiduel après le déchargement.

Le modèle développé dans cette première étude résout le contact normal sans frottement entre la roue et le rail. Il utilise une approche par intégrales de frontière, dans le cadre des petites déformations et de l’approximation de demi-espace. Le matériau du rail suit une loi élastoplastique avec écrouissage, c’est-à-dire une évolution de sa résistance à la déformation plastique. [1]

Cette formulation permet de calculer les pressions à l’interface, les déplacements et les champs de contraintes et de déformations dans le rail. Elle ne simule pas encore, dans cette publication, toute la succession des contacts roulants avec efforts tangentiels. Cette limite définit précisément ce que l’on peut demander au calcul.

## Introduire la rugosité mesurée sans prétendre conserver tous les détails

La comparaison porte sur un contact de référence sans la composante fine de rugosité, puis sur un contact où cette composante est ajoutée au profil du rail. « Sans rugosité » ne signifie donc pas que toute la géométrie de la roue et du rail a disparu. La forme générale du contact reste présente.

La topographie mesurée est adaptée au domaine de calcul. Comme sa résolution est plus fine que celle de la grille numérique, un filtrage précède le rééchantillonnage. Les longueurs d’onde trop petites pour être correctement résolues ne peuvent pas être conservées telles quelles. [1]

Ce point peut sembler purement numérique ; il est pourtant physique. Une aspérité mal représentée peut conduire à une pression locale peu fiable. La finesse du calcul doit donc être cohérente avec les échelles de surface étudiées.

Dans le cas présenté, une charge normale de 67 kN est appliquée, correspondant à la charge moyenne par roue estimée pendant la période de mesure. Le chargement est introduit progressivement dans le solveur. Les incréments utilisés pour faire converger ce chargement ne représentent pas des passages successifs de trains. [1]

## Ce que la rugosité change dans le calcul

Avec la topographie rugueuse, le transfert de charge devient beaucoup moins uniforme. Des pics de pression apparaissent près des aspérités les plus sollicitées, et les champs plastiques se concentrent davantage à proximité de la surface.

Quelques valeurs permettent de mesurer l’importance de cette différence dans la configuration calculée :

| Grandeur maximale calculée | Contact sans la rugosité fine | Contact avec la rugosité mesurée |
| --- | ---: | ---: |
| Pression de contact | 1,00 GPa | 4,33 GPa |
| Déformation plastique équivalente résiduelle | 0,48 % | 2,58 % |
| Contrainte équivalente de von Mises résiduelle | 0,33 GPa | 1,64 GPa |

Ces valeurs proviennent des figures 3-6, 3-7 et 3-9 de l’étude. Ce sont des maxima locaux de simulation, associés au chargement, à la géométrie, au matériau et à la discrétisation retenus. Ce ne sont ni des pressions moyennes sur toute l’empreinte ni des mesures directes de contraintes dans le rail en service. [1]

L’intérêt principal n’est donc pas de retenir un facteur multiplicatif applicable partout. Il est de constater que négliger la rugosité peut masquer des zones de sollicitation élevée. La forme générale du profil et les détails de surface contribuent ensemble à la distribution des efforts.

## Une surface plus lisse peut conserver une histoire mécanique

Après le déchargement, la partie élastique de la déformation se relâche, mais une partie plastique demeure. Le calcul fournit ainsi un état résiduel : le matériau n’est plus exactement dans l’état où il se trouvait avant le contact.

Cela explique pourquoi l’apparence finale de la surface ne raconte pas nécessairement toute son histoire. Des aspérités peuvent être aplanies ou usées après avoir généré de fortes sollicitations locales. Leur diminution ultérieure ne permet pas de conclure que ces sollicitations n’ont jamais existé.

Dans l’étude, la rugosité accroît les concentrations de déformations et de contraintes résiduelles près de la surface. Ces résultats motivent une analyse de leurs conséquences possibles sur l’amorçage de défauts et la fatigue de contact. Ils ne constituent pas, à eux seuls, une observation de fissuration ni une prédiction complète de durée de vie. [1]

Il faut notamment éviter un raccourci : un maximum de contrainte n’est pas un compteur de cycles avant rupture. Pour traiter la fatigue, il faut considérer l’histoire du chargement, les propriétés pertinentes du matériau et un modèle d’endommagement adapté.

## Les hypothèses qui encadrent l’interprétation

La première étude isole volontairement une partie du problème. Le contact est normal et sans frottement ; les petites déformations sont supposées ; la géométrie correspond à une portion droite de voie. Les conclusions ne peuvent pas être transférées automatiquement à toutes les configurations roue-rail.

Une autre limite concerne l’état métallurgique de la surface. Le meulage peut produire une couche superficielle aux propriétés différentes de celles du matériau sous-jacent. Cette couche durcie n’est pas représentée explicitement dans le modèle présenté. L’article indique que sa prise en compte pourrait modifier les déformations plastiques calculées. [1]

Enfin, la description de la rugosité dépend de l’acquisition, du traitement et de la grille utilisée. Ces choix ne rendent pas le résultat inutile ; ils précisent son domaine de validité. Pour la maintenance, un calcul explicatif devient plus intéressant lorsqu’on sait exactement quelles situations il représente et lesquelles restent à examiner.

## Du contact initial à l’usure et à la fatigue

Un travail ultérieur, publié dans *Wear*, prolonge cette démarche vers le contact roulant. Il introduit les efforts tangentiels, les zones d’adhérence et de glissement dans l’empreinte, puis associe le contact à une analyse d’usure fondée sur la loi d’Archard et à un modèle de fatigue. [2]

Cette évolution permet d’étudier l’accumulation des effets mécaniques au fil des cycles. Elle ne transforme toutefois pas automatiquement les simulations en prévisions de durée de vie validées sur le terrain : cette seconde publication précise que les données expérimentales fournissent la géométrie réelle, mais ne valident pas directement les prédictions numériques d’usure et de fatigue. [2]

La progression scientifique est donc importante : mesurer la surface, comprendre son effet sur le contact, puis étudier les conséquences cumulées. Chaque étape ajoute des mécanismes, mais aussi des besoins de validation.

## Ce que cela apporte à la réflexion sur le meulage

L’enjeu n’est pas de choisir abstraitement entre une surface rugueuse et une surface parfaitement lisse. Le meulage répond à des objectifs d’entretien, dans des conditions matérielles et opérationnelles données. Les travaux montrent l’intérêt d’examiner également l’état de surface qu’il laisse derrière lui.

Les premiers contacts peuvent modifier rapidement la topographie et établir un état mécanique résiduel qui mérite d’être pris en compte. C’est pourquoi une rugosité transitoire ne doit pas être considérée comme mécaniquement négligeable simplement parce qu’elle s’atténue.

Le résultat le plus utile est cette articulation entre terrain et calcul : une empreinte réelle devient une entrée de modèle, et le modèle révèle des sollicitations que l’observation de la seule surface ne permet pas de voir. C’est une base pour mieux poser les questions de maintenance, pas une prescription universelle de meulage.

## Pour approfondir

- [Du relief à la pression : comprendre le calcul du contact rugueux par BEM](../fr/04-bem-contact-rugueux.md)

## Références

1. Edjeou, W., Moström, O., Asplund, M., Larsson-Kråik, P.-O., Pérez-Ràfols, F., Larsson, R. et Almqvist, A. (2025 ; mise en ligne en 2024). *Evaluating the impact of rail surface roughness post-grinding: An experimental and elastoplastic modelling approach*. Tribology International, 201, 110270. [Article et DOI](https://doi.org/10.1016/j.triboint.2024.110270).
2. Edjeou, W., Larsson, P.-O., Larsson, R. et Almqvist, A. (2026 ; mise en ligne en 2025). *Effect of the rail surface topography on wear and fatigue*. Wear, 586, 206218. [Article et DOI](https://doi.org/10.1016/j.wear.2025.206218).

*Cet article présente des travaux de recherche collectifs. Les résultats numériques cités ne constituent ni un critère d’acceptation d’un rail ni une procédure de maintenance.*
