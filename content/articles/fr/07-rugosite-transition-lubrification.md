# De l’aspérité au film fluide : comment la rugosité déplace la transition de lubrification

Lorsqu’un contact rugueux est lubrifié, la charge n’est pas portée de la même manière à toutes les vitesses. À faible vitesse, elle passe principalement par les aspérités solides. Lorsque la vitesse augmente, la pression développée dans le fluide contribue progressivement à séparer les surfaces. Entre ces deux situations se trouve un régime mixte, souvent déterminant pour le frottement, l’usure et la sécurité.

La courbe de Stribeck résume classiquement cette évolution. Mais elle peut donner l’impression qu’un unique rapport entre l’épaisseur du film et la rugosité suffit à localiser les transitions. Un travail théorique récent de Vincent Bertin et Olivier Pouliquen propose une lecture plus riche : la vitesse, la charge et la rugosité forment trois commandes indépendantes, et la transition vers la lubrification hydrodynamique dépend à la fois de la topographie et de la charge appliquée. [1]

Cette idée rejoint directement une question laissée ouverte dans ma thèse : comment compléter un modèle de contact multi-aspérités par la pression hydrodynamique produite par l’eau ou par des contaminants ? [3] Le rapprochement est fécond, à condition de distinguer ce que le nouveau modèle démontre de ce qu’il reste à valider pour un contact pneu-chaussée réel.

## Pourquoi la courbe de Stribeck classique ne suffit pas toujours

La courbe de Stribeck relie généralement le coefficient de frottement à une variable combinant vitesse, viscosité et charge. Elle distingue trois grands domaines :

- le régime limite, où les surfaces restent largement en contact et où le frottement dépend fortement des interactions entre aspérités ;
- le régime mixte, où le contact solide et la pression du fluide portent simultanément la charge ;
- le régime hydrodynamique, où un film fluide sépare l’essentiel des surfaces et où les pertes visqueuses deviennent dominantes.

Cette représentation est très utile pour ordonner les phénomènes. Elle ne dit cependant pas, à elle seule, comment la géométrie d’une surface rugueuse modifie la répartition locale des pressions, la séparation moyenne ou la part de charge portée par le fluide.

Une pratique courante consiste à comparer une épaisseur de film à une amplitude de rugosité. Ce rapport fournit un indicateur pertinent, mais il comprime dans une seule valeur des surfaces qui peuvent différer par leurs pentes, leurs longueurs d’onde, la forme de leurs sommets et l’organisation de leurs vallées. Le même rapport ne garantit donc pas une morphologie de contact identique.

Le résultat important de Bertin et Pouliquen est précisément de ne pas réduire la transition à un rapport constant. Leur modèle minimal fait émerger une frontière qui dépend de la rugosité **et** de la charge. [1]

## Qui porte la charge : les aspérités ou le fluide ?

La question centrale n’est pas seulement de savoir si du fluide est présent. Il faut déterminer comment la charge normale totale se répartit entre deux réseaux de pression :

1. la pression de contact transmise aux endroits où les aspérités se touchent ;
2. la pression hydrodynamique produite par l’écoulement dans les espaces qui séparent les surfaces.

À faible vitesse, le fluide a davantage de temps pour s’échapper. Les aspérités portent alors une grande partie de la charge. Lorsque la vitesse augmente, l’écoulement génère une pression capable de reprendre une part croissante de cette charge. L’aire réelle de contact solide et les pressions aux sommets diminuent progressivement, sans nécessairement disparaître immédiatement.

Le régime mixte ne correspond donc pas à une simple moyenne entre un contact sec et un contact totalement séparé. C’est un état couplé : la déformation élastique modifie l’espace disponible pour le fluide, tandis que la pression du fluide modifie la déformation et le contact des aspérités.

Le modèle récent formalise ce couplage par une décomposition homogénéisée de la pression. À basse vitesse, la diminution du frottement est reliée au transfert progressif de la charge depuis les aspérités vers la pression hydrodynamique. À haute vitesse, le frottement conserve une contribution visqueuse et une contribution résiduelle du contact. [1]

## Trois commandes indépendantes : vitesse, charge et rugosité

L’analyse dimensionnelle du modèle identifie trois paramètres indépendants associés à la vitesse, à la charge normale et à la rugosité. Cette conclusion paraît simple, mais elle change l’interprétation de la transition.

Augmenter la vitesse favorise la construction d’une pression hydrodynamique. Modifier la charge change la déformation élastique, la séparation et la pression nécessaire pour porter le contact. Modifier la rugosité transforme les passages disponibles pour le fluide ainsi que la population d’aspérités susceptibles de transmettre la charge.

Ces effets ne sont pas interchangeables. Deux essais donnant le même coefficient de frottement à un instant donné peuvent se trouver dans des états de partage de charge différents. De même, une surface plus rugueuse n’entraîne pas systématiquement plus ou moins de frottement : l’effet dépend du régime, de la charge, de la vitesse et de la manière dont la rugosité est définie.

| Régime | Porteur principal de la charge | Contribution dominante au frottement | Information de surface particulièrement utile |
| --- | --- | --- | --- |
| Limite | Aspérités solides | Contact et cisaillement interfacial | Sommets, pentes, aire réelle de contact |
| Mixte | Aspérités et pression du fluide | Contact résiduel et dissipation visqueuse | Distribution des hauteurs, séparation et chemins d’écoulement |
| Hydrodynamique | Film fluide | Cisaillement visqueux | Géométrie du film, viscosité et vitesse |

Ce tableau reste une grille de lecture. Les frontières ne sont pas universelles : le nouveau diagramme de phase proposé par les auteurs montre justement qu’elles se déplacent dans un espace multidimensionnel. [1]

## La rugosité n’est pas seulement une épaisseur à franchir

Dans un contact lubrifié, la rugosité joue au moins deux rôles. Elle détermine les aspérités capables de porter localement la charge, mais elle structure aussi les volumes et les connexions par lesquels le fluide circule.

Une amplitude moyenne telle que `Ra` ou `Sq` ne suffit donc pas à décrire entièrement le problème. Deux surfaces de même amplitude peuvent présenter des pentes, des courbures et des espacements très différents. Leurs contacts réels et leurs chemins d’écoulement ne seront pas nécessairement équivalents.

C’est ici que la lecture multiéchelle devient essentielle. Une topographie contient des reliefs de tailles différentes : les grandes échelles contribuent à la géométrie globale et au drainage, tandis que des échelles plus fines contrôlent les sommets, les séparations locales et la rupture éventuelle d’un film résiduel. La théorie de contact de Persson, sur laquelle s’appuie le nouveau modèle, examine justement l’interface à plusieurs grossissements afin de relier la rugosité statistique au contact et à la séparation. [1, 2]

Cela ne signifie pas qu’une décomposition par ondelettes et une théorie moyenne de contact sont identiques. Elles offrent deux points de vue complémentaires : la première localise les transformations de la topographie selon l’échelle ; la seconde cherche à traduire un spectre de rugosité en grandeurs de contact et de séparation.

## Le prolongement naturel de mes travaux sur le contact

Dans ma thèse, les cartographies tridimensionnelles de chaussées et de mosaïques de granulats sont décomposées à plusieurs échelles. Un modèle de massif semi-infini est ensuite utilisé pour calculer, sur ces topographies, les pressions de contact, les déplacements de la gomme et l’aire réelle de contact. La viscoélasticité de la gomme permet d’estimer une composante de frottement liée à sa déformation. [3]

Ce cadre répond à la question : comment la texture, le polissage et les propriétés de la gomme modifient-ils le contact solide et la dissipation viscoélastique ? Il ne résout pas explicitement l’écoulement de l’eau dans l’interface. La thèse identifie d’ailleurs comme perspective l’ajout du cisaillement, de la pression hydrodynamique due à l’eau ou aux contaminants et de la température locale. [3]

Le travail de Bertin et Pouliquen apporte une brique théorique qui dialogue directement avec cette perspective. Il décrit la redistribution de charge entre un contact rugueux élastique et un fluide newtonien. Il ne remplace pas le modèle développé dans la thèse : il traite un couplage différent, avec d’autres hypothèses. Mais les deux approches partagent des variables structurantes : topographie, pression, séparation, aire de contact et charge.

Une piste de recherche cohérente serait donc de conserver la description multiéchelle des surfaces réelles, puis de calculer conjointement la réponse viscoélastique de la gomme et la pression du fluide. L’objectif ne serait plus seulement d’estimer le contact sec ou le drainage séparément, mais de suivre la part de charge portée par chacun au cours de la transition.

## Ce que l’on peut transposer à une chaussée mouillée — et ce que l’on ne peut pas

Le contact pneu-chaussée sous la pluie rend cette problématique immédiatement concrète. La macrotexture aide à évacuer l’eau, les sculptures du pneumatique la redistribuent et la microtexture contribue au contact dans les zones où subsiste un film discontinu. Une pression hydrodynamique peut localement soulever la gomme et réduire l’aire de contact solide. [3]

Le nouveau modèle soutient trois idées qualitatives pertinentes pour ce problème :

- le contact solide et le fluide peuvent porter simultanément la charge ;
- la transition dépend de la vitesse, de la charge et de la rugosité ;
- la séparation hydrodynamique n’est pas nécessairement définie par un rapport géométrique constant.

En revanche, il ne faut pas présenter son diagramme comme une loi déjà validée pour un pneumatique. Le modèle considère un fluide newtonien, un contact rugueux élastique et une description homogénéisée. Un pneu réel ajoute la viscoélasticité, les sculptures, une géométrie évolutive, des conditions transitoires d’entrée et de sortie, des épaisseurs d’eau non uniformes, la température, le glissement et parfois des contaminants.

La transposition est donc une hypothèse de travail, pas une conclusion expérimentale. Elle permet de mieux formuler les essais à réaliser, mais elle ne permet pas encore de prédire une distance de freinage ou une vitesse d’aquaplanage à partir de la seule topographie.

## Comment tester cette transition expérimentalement

Pour confronter ce cadre théorique à des surfaces de chaussée, il faudrait faire varier les trois commandes sans perdre l’information de surface.

Un protocole pertinent pourrait combiner :

1. des cartographies 3D mesurées avant et après polissage, avec une résolution et une étendue documentées ;
2. une description multiéchelle des hauteurs, pentes, courbures, volumes de sommets et chemins de drainage ;
3. plusieurs charges normales et vitesses de glissement ;
4. une épaisseur d’eau, une viscosité et une température contrôlées ;
5. une mesure simultanée du frottement et, si possible, d’un indicateur de séparation ou d’aire réelle de contact ;
6. une comparaison entre surfaces dont l’amplitude moyenne est proche mais dont l’organisation spatiale diffère.

Le point décisif serait d’identifier non seulement une baisse du coefficient de frottement, mais aussi le mécanisme associé : réduction de l’aire solide, augmentation de la pression du fluide, modification de la dissipation viscoélastique ou combinaison de ces effets.

Cette stratégie éviterait de confondre deux surfaces simplement parce qu’elles ont le même `Ra`, ou deux régimes simplement parce qu’ils produisent momentanément le même frottement.

## Vers une carte de fonctionnement plutôt qu’un seuil unique

Pour l’ingénierie, l’intérêt d’un diagramme de phase est de remplacer une frontière unique par une carte de fonctionnement. Une surface pourrait être positionnée selon sa texture, la charge, la vitesse et les propriétés du fluide, puis suivie lorsque le polissage modifie progressivement ses aspérités.

Cette représentation serait utile pour comparer des matériaux, concevoir un plan d’essais ou repérer les conditions où un modèle sec cesse d’être suffisant. Elle pourrait aussi relier plusieurs articles déjà présentés ici : caractérisation multiéchelle, mécanique du contact, limites de `Ra` et détection de chaussée mouillée.

La prochaine étape n’est donc pas de chercher un nouvel indicateur universel. Elle consiste à construire un modèle vérifiable où la topographie, le solide et le fluide restent identifiables, puis à déterminer les échelles réellement actives dans chaque régime.

## Ce qu’il faut retenir

La transition de lubrification n’est pas seulement pilotée par la vitesse. Elle résulte d’un partage de charge entre aspérités et fluide, lui-même influencé par la charge et la rugosité.

Le nouveau modèle de Bertin et Pouliquen généralise la lecture classique de Stribeck en proposant un espace de régimes gouverné par trois paramètres indépendants. Il offre un cadre prometteur pour penser les contacts rugueux lubrifiés et éclaire directement une perspective formulée dans ma thèse.

Pour les chaussées mouillées, le rapprochement est scientifiquement pertinent mais reste à démontrer expérimentalement. La valeur ajoutée d’une approche multiéchelle sera de déterminer quelles composantes de la texture portent le contact, organisent l’écoulement et déplacent les transitions.

## Pour approfondir

- [Pourquoi Ra ne suffit pas pour caractériser une surface en contact](06-pourquoi-ra-ne-suffit-pas.md)
- [De la topographie à la pression : comprendre le contact rugueux par BEM](04-bem-contact-rugueux.md)
- [Texture des chaussées : pourquoi l’échelle change notre lecture de l’adhérence](05-texture-multiechelle-adherence.md)
- [Ce que les éclaboussures révèlent sur une chaussée mouillée](01-eclaboussures-route-mouillee.md)

## Références

1. Bertin, V. et Pouliquen, O. (2026). *Transition from contact to hydrodynamic lubrication over rough surfaces*. Physical Review Fluids, article accepté le 18 septembre 2026. [Article accepté et DOI](https://doi.org/10.1103/hz6h-vtcp).
2. Persson, B. N. J. et Scaraggi, M. (2009). *On the transition from boundary lubrication to hydrodynamic lubrication in soft contacts*. Journal of Physics: Condensed Matter, 21, 185002. [Article et DOI](https://doi.org/10.1088/0953-8984/21/18/185002).
3. Edjeou, W. (2021). *Analyse multiéchelle de la texture des chaussées - effet sur l’adhérence des revêtements routiers*. Thèse, École centrale de Nantes. [Manuscrit sur HAL](https://theses.hal.science/tel-03651239v1).
4. Edjeou, W., Cerezo, V., Zahouani, H. et Do, M.-T. (2023). *Contribution of multiscale analysis to the understanding of friction evolution of aggregates surfaces*. Surface Topography: Metrology and Properties, 11, 014006. [Article et DOI](https://doi.org/10.1088/2051-672X/acb95d).
5. Scaraggi, M. et Persson, B. N. J. (2015). *General contact mechanics theory for randomly rough surfaces with application to rubber friction*. The Journal of Chemical Physics, 143, 224111. [Article et DOI](https://doi.org/10.1063/1.4936558).

*Cet article présente un rapprochement raisonné entre un modèle théorique récent et la problématique du contact pneu-chaussée. Il ne constitue pas une validation du modèle pour la sécurité routière ni un critère de dimensionnement.*
