# Pourquoi Ra ne suffit pas pour caractériser une surface en contact

`Ra` est probablement le paramètre de rugosité le plus connu. Il tient en un nombre, se compare facilement et figure sur de nombreux plans, rapports de mesure et fiches techniques. Cette simplicité explique son succès. Elle crée aussi un risque : croire qu’une valeur moyenne suffit à décrire la manière dont deux surfaces vont se toucher, s’user ou produire du frottement.

La question utile n’est donc pas de savoir s’il faut abandonner `Ra`. Il faut plutôt comprendre ce qu’il mesure, ce qu’il efface et quels compléments deviennent nécessaires lorsque la fonction de la surface dépend de l’organisation de ses aspérités.

## Ce que Ra mesure réellement

`Ra` est un paramètre calculé sur un profil. Après avoir défini la ligne moyenne et les conditions de filtrage, il représente la moyenne arithmétique des écarts absolus du profil par rapport à cette ligne. Les reliefs situés au-dessus et au-dessous contribuent ainsi positivement à la valeur finale. [1, 2]

Cette définition répond à une question précise : quelle est l’amplitude moyenne des irrégularités le long du profil analysé ? Elle ne décrit pas directement leur ordre, leur espacement, leur pente ou leur forme.

Cette distinction permet d’éviter un premier malentendu. `Ra` n’est pas « la rugosité complète » d’une pièce. C’est un indicateur d’amplitude calculé sur une représentation donnée de la surface, après une chaîne de mesure et de traitement donnée.

Les normes actuelles distinguent par ailleurs les paramètres de profil, notamment `Ra` et `Rq`, des paramètres surfaciques tels que `Sa` et `Sq`. L’analyse développée dans ma thèse s’appuie principalement sur des cartes tridimensionnelles et sur des paramètres surfaciques. Parler de `Ra` dans le titre permet donc de partir du paramètre le plus familier, mais le raisonnement concerne plus largement les indicateurs moyens d’amplitude employés seuls. [1, 2, 3]

## Deux surfaces peuvent avoir le même Ra sans avoir la même géométrie

Imaginons deux profils possédant la même distribution de hauteurs, mais dans un ordre différent. Le premier alterne rapidement petits sommets et petites vallées. Le second regroupe ces mêmes hauteurs en ondulations plus espacées. Leur `Ra` peut être identique puisque les écarts absolus à la ligne moyenne n’ont pas changé.

Pourtant, ces profils n’imposent pas la même succession de sollicitations à un matériau qui les parcourt. Leurs pentes, leurs longueurs d’onde et la courbure de leurs sommets peuvent être très différentes.

Une autre ambiguïté apparaît lorsque des sommets étroits et des plateaux larges produisent une amplitude moyenne comparable. En contact, la forme des zones les plus hautes influence la façon dont la charge est initialement portée. Lorsque le matériau est déformable, la réponse dépend aussi de sa loi de comportement, de la pression nominale et des échelles effectivement présentes.

Le même `Ra` ne garantit donc ni la même aire réelle de contact, ni la même distribution de pression, ni le même frottement. Inversement, deux valeurs de `Ra` différentes ne suffisent pas à conclure qu’une surface sera fonctionnellement meilleure que l’autre.

## Une moyenne ne conserve pas l’information spatiale

Le calcul d’une moyenne transforme un ensemble de points en une seule valeur. C’est utile pour résumer et contrôler, mais l’opération supprime nécessairement de l’information.

Pour un problème de contact ou de frottement, plusieurs familles de caractéristiques peuvent compter :

- les hauteurs, qui indiquent l’amplitude du relief ;
- les pentes, qui décrivent la rapidité des variations ;
- la courbure des sommets, qui renseigne sur leur caractère aigu ou arrondi ;
- la densité et l’espacement des sommets ;
- le volume de matière situé dans la partie supérieure de la surface ;
- les tailles caractéristiques auxquelles ces propriétés apparaissent.

Ces informations ne sont pas interchangeables. Une diminution de hauteur peut accompagner un arrondi des sommets, mais ces évolutions ne sont ni mathématiquement identiques ni systématiquement proportionnelles.

Dans les travaux de ma thèse, plusieurs paramètres ont été examinés conjointement : `Sq` pour la hauteur quadratique moyenne, `Sdq` pour les gradients, `Ssc` pour la courbure moyenne des sommets, `Sds` pour leur densité et `Vmp` pour le volume de matière des sommets. Leur lecture combinée aide à relier une variation géométrique à un mécanisme d’usure, sans attribuer toute l’évolution fonctionnelle à un unique nombre. [1, 4, 5]

## Ra, Rq, Sa et Sq : des proches qui ne disent pas exactement la même chose

Les notations sont faciles à confondre. `R` désigne ici des paramètres calculés sur un profil, tandis que `S` renvoie à une caractérisation surfacique. La lettre `a` correspond à une moyenne arithmétique des écarts absolus ; la lettre `q` à une moyenne quadratique.

| Paramètre | Domaine | Information principale | Limite lorsqu’il est utilisé seul |
| --- | --- | --- | --- |
| `Ra` | Profil | Amplitude arithmétique moyenne | Perd l’organisation spatiale et distingue peu les valeurs extrêmes |
| `Rq` | Profil | Amplitude quadratique moyenne | Plus sensible aux grands écarts, mais reste un résumé d’amplitude |
| `Sa` | Surface | Équivalent surfacique de l’amplitude arithmétique | Ne décrit pas à lui seul les pentes, les sommets ou les échelles |
| `Sq` | Surface | Dispersion quadratique des hauteurs | Ne suffit pas à identifier le mécanisme fonctionnel |

Le passage de `Ra` à `Rq` ne résout donc pas tout. `Rq` donne davantage de poids aux écarts élevés, mais deux profils réordonnés peuvent encore conserver la même valeur. De même, une carte surfacique apporte une information plus riche qu’une ligne, mais `Sa` ou `Sq` seuls résument toujours cette carte en un scalaire.

## La valeur dépend aussi de la mesure et du filtrage

Une surface ne possède pas une unique rugosité indépendante de la façon dont on l’observe. L’instrument a une résolution latérale et verticale, le champ mesuré possède une étendue, puis des opérations retirent la forme ou séparent différentes composantes de texture.

Une petite zone mesurée très finement peut révéler des détails qu’une acquisition plus grossière ne voit pas. Elle peut aussi manquer des ondulations plus larges. Le résultat dépend donc du compromis entre résolution et étendue, ainsi que des filtres et longueurs d’évaluation retenus.

Deux valeurs de `Ra` ne sont véritablement comparables que si la définition du profil, le filtrage, la longueur d’évaluation, la résolution et les conditions de mesure sont cohérents. Une valeur fournie sans ce contexte est moins informative qu’elle n’en a l’air.

Ce point devient essentiel pour les surfaces de chaussée, dont la texture couvre une large gamme d’échelles. Mesurer correctement les plus petites aspérités ne signifie pas que l’on décrit toute la structure utile au drainage, au contact du pneumatique ou à l’évolution sous polissage.

## Ce que l’analyse multiéchelle ajoute

L’analyse multiéchelle ne consiste pas à calculer toujours plus de paramètres sur la même carte brute. Elle cherche à déterminer à quelles tailles caractéristiques les transformations sont observées.

Dans la thèse et les publications associées, une décomposition par ondelettes est utilisée pour reconstruire des composantes de surface à différentes échelles. Les paramètres de hauteur, de pente, de courbure ou de volume peuvent alors être suivis en fonction de l’échelle et de l’état de polissage. [1, 4, 5]

Cette démarche permet de distinguer deux surfaces qui auraient une valeur globale proche, mais dont les petites aspérités ou les reliefs plus larges n’évoluent pas de la même manière. Elle permet aussi de rechercher les gammes d’échelles où la texture et le frottement présentent des évolutions corrélées.

Une corrélation ne prouve toutefois pas, à elle seule, un mécanisme causal. Elle indique une gamme informative dans un protocole donné. L’interprétation doit encore considérer le matériau, le contact, la vitesse, la présence d’eau et le type de sollicitation.

## Le cas du polissage des granulats

Lors du polissage, la surface des granulats peut perdre de la hauteur, voir ses sommets s’arrondir et ses pentes diminuer. Pour des granulats polyminéraux, l’usure différentielle entre constituants peut aussi maintenir ou recréer des reliefs locaux. [1, 4]

Dans ce cas, une évolution de `Sq` renseigne sur la dispersion des hauteurs, tandis que `Vmp`, `Sdq` et `Ssc` apportent des informations complémentaires sur le volume des sommets, les gradients et leur arrondi. Les résultats expérimentaux montrent que plusieurs de ces paramètres évoluent avec le frottement, particulièrement dans certaines gammes d’échelles mesurées. [4]

Réduire cette lecture à une valeur moyenne globale ferait perdre deux éléments importants : la nature de la transformation géométrique et l’échelle à laquelle elle intervient.

## Le cas des enrobés : une même métrique, deux phases physiques

Les enrobés bitumineux illustrent une autre limite des interprétations automatiques. Au début du polissage, le décapage du film de liant peut mettre progressivement les granulats à nu et augmenter l’adhérence. Plus tard, l’usure et le polissage des granulats tendent à la réduire. [1, 5]

Une variation d’un paramètre de texture ne porte donc pas toujours la même signification selon la phase de vie de la surface. Il faut savoir quel constituant évolue et quel mécanisme domine.

C’est pourquoi la caractérisation géométrique doit être reliée à une mesure fonctionnelle et à l’observation du matériau. `Ra`, `Sq` ou tout autre paramètre ne devient pas un modèle physique simplement parce qu’il est corrélé à un coefficient de frottement.

## Choisir les paramètres à partir de la fonction

Il n’existe pas de liste universelle de paramètres suffisante pour tous les contacts. Le bon ensemble dépend de la question posée.

Pour suivre un procédé industriel stable, `Ra` peut être un excellent indicateur de contrôle si son lien avec les défauts pertinents a été validé. Pour étudier un joint, un revêtement, un contact lubrifié, une surface polie ou une chaussée mouillée, d’autres informations peuvent devenir déterminantes.

Une démarche robuste consiste à :

1. définir la fonction étudiée et la grandeur à expliquer ;
2. choisir une résolution et une étendue compatibles avec les échelles physiques attendues ;
3. documenter le prétraitement, les filtres et les longueurs d’évaluation ;
4. associer aux hauteurs des paramètres de pente, de forme, de densité ou de volume lorsque le mécanisme l’exige ;
5. examiner leur évolution à plusieurs échelles plutôt que seulement leur valeur globale ;
6. confronter la géométrie à une mesure fonctionnelle et à un modèle physique adapté.

Cette démarche ne remplace pas `Ra` par un nouveau chiffre magique. Elle transforme une valeur de rugosité en une caractérisation construite pour une décision précise.

## Ce qu’il faut retenir

`Ra` reste utile parce qu’il est simple, reproductible lorsque le protocole est maîtrisé et efficace pour de nombreuses comparaisons de production. Il devient insuffisant lorsqu’on lui demande de prédire, à lui seul, une fonction qui dépend des pentes, des sommets, de leur organisation et des échelles de texture.

La bonne question n’est donc pas « quelle surface a le plus grand `Ra` ? », mais « quelles caractéristiques géométriques gouvernent le phénomène étudié, à quelles échelles et dans quelles conditions ? ».

C’est à ce passage, d’un nombre moyen à une description physique de la topographie, que l’analyse multiéchelle apporte sa valeur.

## Pour approfondir

- [Texture des chaussées : pourquoi l’échelle change notre lecture de l’adhérence](../fr/05-texture-multiechelle-adherence.md)
- [De la topographie à la pression : comprendre le contact rugueux par BEM](../fr/04-bem-contact-rugueux.md)
- [Pourquoi une chaussée neuve peut-elle gagner en adhérence avant d’en perdre ?](../fr/03-adherence-chaussee-neuve.md)

## Références

1. Edjeou, W. (2021). *Analyse multiéchelle de la texture des chaussées - effet sur l’adhérence des revêtements routiers*. Thèse, École centrale de Nantes. [Manuscrit sur HAL](https://theses.hal.science/tel-03651239v1).
2. ISO 21920-2:2021. *Spécification géométrique des produits - État de surface : méthode du profil - Partie 2 : termes, définitions et paramètres d’état de surface*. [Fiche ISO](https://www.iso.org/standard/72226.html).
3. ISO 25178-2:2021. *Spécification géométrique des produits - État de surface : surfacique - Partie 2 : termes, définitions et paramètres d’état de surface*. [Fiche ISO](https://www.iso.org/standard/74591.html).
4. Edjeou, W., Cerezo, V., Zahouani, H. et Do, M.-T. (2023). *Contribution of multiscale analysis to the understanding of friction evolution of aggregates surfaces*. Surface Topography: Metrology and Properties, 11, 014006. [Article et DOI](https://doi.org/10.1088/2051-672X/acb95d).
5. Edjeou, W., Cerezo, V., Do, M.-T., Zahouani, H., Ropert, C. et Augris, P. (mise en ligne en 2023). *Multiscale analyse of the relation between skid resistance and pavements surfaces texture evolution with polishing*. Road Materials and Pavement Design. [Article et DOI](https://doi.org/10.1080/14680629.2023.2191723).

*Cet article propose une méthode d’interprétation, pas un critère universel de conformité. Le choix des paramètres et des seuils doit être validé pour le matériau, l’instrument et la fonction étudiés.*
