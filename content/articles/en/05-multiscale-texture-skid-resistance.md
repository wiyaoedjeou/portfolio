# Pavement Texture: Why Scale Changes How We Understand Skid Resistance

Two surfaces may have comparable average roughness yet deform a tyre differently. Broad features, small asperities and more or less rounded summits are not interchangeable. Multiscale analysis describes these differences and helps explain what changes as a surface wears.

## An average does not describe how features are arranged

A height parameter describes the amplitude of surface irregularities. On its own, it does not tell us how they are distributed in space. A succession of small asperities and a few broad features can produce similar average values.

Rubber, however, does not respond to height alone. Summit slope, curvature and spacing influence contact and deformation. We therefore need to describe both amplitude and the characteristic sizes of surface features. This connection is central to the approach developed in my thesis. [1]

The aim is not to find a single all-purpose indicator, but to prevent an average from combining physically different changes into one number.

## Microtexture and macrotexture: useful categories, not separate worlds

In the classification recalled by the aggregate study, microtexture corresponds to horizontal feature sizes below approximately 0.5 mm, while macrotexture extends roughly from 0.5 to 50 mm. These categories help locate observed features within the range of surface scales. [2]

Macrotexture contributes to water movement and contact conditions. Finer irregularities participate in the local interaction between rubber and mineral surfaces. Their functions are not exclusive, however: assigning all water-related effects to one scale and all friction to another would be too simplistic.

Speed adds another important dimension. For an ideal feature of wavelength λ traversed at speed v, a characteristic loading frequency is of order v/λ. This kinematic relationship helps explain why the same texture may deform rubber differently as speed changes. It is not, by itself, a friction model. [1]

The material also matters. The viscoelastic response of rubber depends on loading rate and temperature. A geometric scale therefore does not have an effect that is independent of test conditions.

## Measuring a range of scales, not every scale at once

A measurement has both resolution and extent. A small field measured finely can resolve small asperities, but not necessarily the arrangement of much larger features. A wider measurement may miss fine detail.

The protocol should specify sampling spacing, map size, measured regions and processing. If two wear states are compared using different processing, an apparent change may come from the measurement chain rather than the surface.

In the aggregate studies, three-dimensional maps are acquired using a focus-variation optical instrument and then used to track texture during polishing. Friction and topography measurements are complementary: one describes the functional response, the other part of its geometric origin. [2]

## What wavelets add

Wavelet decomposition examines the same map at different characteristic sizes. Surface components associated with the analysed scales can be reconstructed and their parameters calculated. The studies discussed here use a continuous transform and the Mexican hat wavelet. [2, 3]

This does not physically create several different pavements. It produces different representations of one measurement. The method helps identify whether a change mainly affects small summits, broader features or several scale ranges at once.

The interpretation must remain tied to the limits of acquisition. A mathematical transformation cannot recreate detail the instrument did not measure. Results also depend on scale selection, reconstruction and boundary treatment.

## Which parameters should be tracked at each scale?

The studies combine several descriptions: Sq for height variation, Sdq for slopes, Ssc for summit curvature and Vmp for peak material volume. [2, 3]

These quantities provide complementary information. A reduction in height does not mean exactly the same thing as rounded summits or gentler slopes. Calculating them scale by scale helps locate the transformations summarised by their global values.

The result is a family of texture curves as a function of scale and wear state. These can then be compared with friction measurements. A correlation helps identify informative scales; it does not automatically demonstrate a single causal mechanism.

## What the aggregate case study shows

The publication in *Surface Topography: Metrology and Properties* investigates five types of aggregate surface with different mineralogical compositions and polishing resistance. This programme should not be confused with the seven asphalt mixtures investigated in the other publication. [2, 3]

The observations show friction decreasing during polishing. Texture evolution supports discussion of two mechanisms: general wear and, in polymineralic aggregates, differential wear associated with differences in resistance between minerals. The latter can maintain or regenerate some features while others become smoother. [2]

Global parameters do not always clearly separate these contributions. Multiscale analysis makes their differences easier to interpret. In this programme, correlations with friction loss are particularly informative for the measured scales up to approximately 1 mm. [2]

This does not mean that larger features are unimportant, or that every feature below 1 mm improves skid resistance. It identifies an informative range within a particular experiment, using specific materials and a defined protocol.

## Moving from geometry to a mechanism

To explain friction physically, texture must be connected to contact and rubber behaviour. A model can estimate which regions carry load and how asperities deform the material. Viscoelasticity then allows part of the dissipation associated with that deformation to be investigated. [1]

These stages are not interchangeable. A texture-friction correlation is not a contact calculation, and an elastic pressure map is not a complete friction coefficient. The BEM introduction explains the contact stage and its assumptions.

Asphalt mixtures add a further difficulty: their surface condition also depends on the binder and its removal. The article on new-pavement skid resistance therefore examines its initial increase and subsequent decrease separately. It applies the tools introduced here to a particular evolution of the surface. [1, 3]

## What changes when the road is wet?

Water does not disappear from the problem because texture has been characterised well. Its distribution, drainage paths and passing conditions alter contact. A mean texture depth does not replace a complete description of the water present.

Research into vibrations caused by water spray illustrates the point: texture also enters an on-board sensing problem. Estimating water depth nevertheless remains distinct from estimating friction. The water-spray case study develops this distinction. [4]

## The main takeaway

Multiscale analysis does not promise a universal pavement ranking from a surface map. It enables more precise questions: which feature sizes have changed, which mechanisms might explain those changes and what relationship is observed with the measured response?

It therefore provides a richer interpretation than a simple distinction between “rough” and “smooth”. Its value depends on consistency between measurement, processing, physical interpretation and experimental validation.

## Further reading

- [Why Can a New Pavement Gain Skid Resistance Before Losing It?](../en/03-new-pavement-skid-resistance.md)
- [What Water Spray Can Tell Us About a Wet Road](../en/01-road-wetness-from-water-spray.md)
- [From Surface Topography to Pressure: Understanding Rough-Contact BEM](../en/04-bem-rough-contact.md)

## References

1. Edjeou, W. (2021). *Analyse multiéchelle de la texture des chaussées - effet sur l’adhérence des revêtements routiers*. Doctoral thesis, École centrale de Nantes. [Manuscript on HAL](https://theses.hal.science/tel-03651239v1).
2. Edjeou, W., Cerezo, V., Zahouani, H. and Do, M.-T. (2023). *Contribution of multiscale analysis to the understanding of friction evolution of aggregates surfaces*. Surface Topography: Metrology and Properties, 11, 014006. [Article and DOI](https://doi.org/10.1088/2051-672X/acb95d).
3. Edjeou, W., Cerezo, V., Do, M.-T., Zahouani, H., Ropert, C. and Augris, P. (first published online in 2023). *Multiscale analyse of the relation between skid resistance and pavements surfaces texture evolution with polishing*. Road Materials and Pavement Design. [Article and DOI](https://doi.org/10.1080/14680629.2023.2191723).
4. Edjeou, W., Riahi, E., Gennesseaux, M., Cerezo, V. and Do, M.-T. (2024; first published online in December 2023). *Estimation of Road Wetness from a Passenger Car*. Lubricants, 12, 2. [Article and DOI](https://doi.org/10.3390/lubricants12010002).

*This introduction distinguishes experimental observations, analysis tools and mechanical interpretations. It is not a design rule or a universal skid-resistance threshold.*
