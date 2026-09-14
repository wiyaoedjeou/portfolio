# Why Ra Is Not Enough to Characterize a Contacting Surface

`Ra` is probably the best-known roughness parameter. It fits into one number, is easy to compare and appears on countless drawings, measurement reports and technical data sheets. That simplicity explains its success. It also creates a risk: assuming that an average value is sufficient to describe how two surfaces will touch, wear or generate friction.

The useful question is therefore not whether `Ra` should be abandoned. It is what the parameter measures, what it removes and which complementary descriptors become necessary when surface function depends on the organisation of asperities.

## What Ra actually measures

`Ra` is calculated from a profile. Once the mean line and filtering conditions have been defined, it represents the arithmetic mean of the absolute profile deviations from that line. Features above and below the line therefore make positive contributions to the final value. [1, 2]

This definition answers a precise question: what is the average amplitude of the irregularities along the analysed profile? It does not directly describe their order, spacing, slope or shape.

That distinction prevents a first misunderstanding. `Ra` is not the complete roughness of a component. It is an amplitude indicator calculated from a particular representation of the surface after a particular measurement and processing chain.

Current standards also distinguish profile parameters, including `Ra` and `Rq`, from areal parameters such as `Sa` and `Sq`. The analysis developed in my thesis mainly uses three-dimensional maps and areal parameters. Starting from `Ra` in the title makes the discussion accessible through the most familiar metric, but the reasoning applies more broadly to average amplitude indicators used on their own. [1, 2, 3]

## Two surfaces can share the same Ra without sharing the same geometry

Imagine two profiles with the same distribution of heights arranged in a different order. The first alternates rapidly between small peaks and valleys. The second groups the same heights into more widely spaced undulations. Their `Ra` can be identical because the absolute deviations from the mean line have not changed.

Yet the profiles do not impose the same sequence of excitations on a material moving over them. Their slopes, wavelengths and summit curvatures can differ considerably.

Another ambiguity appears when narrow peaks and broad plateaus produce a comparable average amplitude. In contact, the shape of the highest regions influences how the load is initially carried. When the material is deformable, the response also depends on its constitutive behaviour, nominal pressure and the scales actually present.

The same `Ra` therefore guarantees neither the same real contact area, nor the same pressure distribution, nor the same friction. Conversely, two different `Ra` values are not enough to conclude that one surface will function better than the other.

## An average does not preserve spatial information

Calculating an average converts a set of points into a single value. This is useful for summarising and controlling a process, but the operation necessarily discards information.

Several families of characteristics may matter in a contact or friction problem:

- heights, which indicate the amplitude of the relief;
- slopes, which describe how rapidly the heights change;
- summit curvature, which indicates whether asperities are sharp or rounded;
- summit density and spacing;
- the volume of material in the upper part of the surface;
- the characteristic sizes at which these properties occur.

These quantities are not interchangeable. A reduction in height may accompany summit rounding, but the two changes are neither mathematically identical nor systematically proportional.

In my thesis, several parameters were examined together: `Sq` for root mean square height, `Sdq` for gradients, `Ssc` for mean summit curvature, `Sds` for summit density and `Vmp` for peak material volume. Reading them together helps connect a geometrical change to a wear mechanism without attributing the entire functional evolution to one number. [1, 4, 5]

## Ra, Rq, Sa and Sq: related metrics that do not say the same thing

The notation is easy to confuse. Here, `R` denotes parameters calculated from a profile, whereas `S` refers to areal characterisation. The letter `a` indicates an arithmetic mean of absolute deviations; `q` indicates a root mean square value.

| Parameter | Domain | Main information | Limitation when used alone |
| --- | --- | --- | --- |
| `Ra` | Profile | Arithmetic average amplitude | Loses spatial organisation and gives limited emphasis to extremes |
| `Rq` | Profile | Root mean square amplitude | More sensitive to large deviations, but remains an amplitude summary |
| `Sa` | Surface | Areal equivalent of arithmetic average amplitude | Does not describe slopes, summits or scales on its own |
| `Sq` | Surface | Root mean square height variation | Is not sufficient to identify the functional mechanism |

Moving from `Ra` to `Rq` therefore does not solve the whole problem. `Rq` gives more weight to large deviations, but two reordered profiles can still retain the same value. Likewise, an areal map carries more information than a line, but `Sa` or `Sq` alone still reduces that map to a scalar.

## The value also depends on measurement and filtering

A surface does not possess one unique roughness value independent of how it is observed. An instrument has lateral and vertical resolution, the measured field has a finite extent, and processing operations remove form or separate texture components.

A small area measured at high resolution may reveal details missed by a coarser acquisition. It may also miss broader undulations. The result therefore depends on the balance between resolution and extent, as well as on the selected filters and evaluation lengths.

Two `Ra` values are genuinely comparable only when the profile definition, filtering, evaluation length, resolution and measurement conditions are consistent. A value reported without this context is less informative than it appears.

This point is essential for pavement surfaces, whose texture spans a broad range of scales. Measuring the smallest asperities correctly does not mean that the complete structure relevant to drainage, tyre contact or polishing evolution has been described.

## What multiscale analysis adds

Multiscale analysis is not simply a matter of calculating more parameters from the same unprocessed map. It asks at which characteristic sizes the transformations occur.

In the thesis and related papers, a wavelet decomposition is used to reconstruct surface components at different scales. Height, slope, curvature and volume parameters can then be followed as functions of both scale and polishing state. [1, 4, 5]

This approach can distinguish surfaces with similar global values whose small asperities or broader features do not evolve in the same way. It can also identify scale ranges in which texture and friction display correlated changes.

A correlation alone does not prove a causal mechanism. It identifies an informative range within a particular protocol. Interpretation must still account for the material, contact conditions, speed, water and loading mode.

## The aggregate-polishing case

During polishing, aggregate surfaces may lose height while their summits become rounder and their slopes decrease. In polymineralic aggregates, differential wear between constituents may also preserve or regenerate local relief. [1, 4]

In this case, a change in `Sq` describes height variation, while `Vmp`, `Sdq` and `Ssc` add information about peak volume, gradients and rounding. Experimental results show several of these parameters evolving with friction, particularly within certain measured scale ranges. [4]

Reducing this interpretation to one global average would remove two important elements: the nature of the geometrical transformation and the scale at which it occurs.

## The asphalt case: one metric, two physical stages

Asphalt mixtures illustrate another limitation of automatic interpretations. Early in polishing, removal of the binder film can progressively expose the aggregates and increase skid resistance. Later, aggregate wear and polishing tend to reduce it. [1, 5]

A change in one texture parameter does not therefore carry the same meaning at every stage of the surface life. The analyst must identify which constituent is changing and which mechanism dominates.

This is why geometrical characterisation must be connected to a functional measurement and observations of the material. `Ra`, `Sq` or any other parameter does not become a physical model merely because it correlates with a friction coefficient.

## Select parameters from the function

There is no universal list of parameters sufficient for every contact. The right set depends on the question being asked.

For monitoring a stable industrial process, `Ra` can be an excellent control indicator if its relationship with the relevant defects has been validated. For a seal, coating, lubricated contact, polished surface or wet pavement, other information may become decisive.

A robust workflow is to:

1. define the function of interest and the quantity to be explained;
2. select a resolution and extent consistent with the expected physical scales;
3. document preprocessing, filters and evaluation lengths;
4. complement heights with slope, shape, density or volume parameters where the mechanism requires them;
5. examine their evolution across scales rather than only their global values;
6. compare geometry with a functional measurement and a suitable physical model.

This workflow does not replace `Ra` with a new magic number. It turns a roughness value into a characterisation designed for a specific decision.

## The main takeaway

`Ra` remains useful because it is simple, reproducible when the protocol is controlled and effective for many production comparisons. It becomes insufficient when it is expected to predict a function that depends on slopes, summits, spatial organisation and texture scales.

The right question is therefore not “which surface has the highest `Ra`?” but “which geometrical characteristics govern the phenomenon, at which scales and under which conditions?”.

That move from an average number to a physical description of topography is where multiscale analysis provides its value.

## Further reading

- [Pavement Texture: Why Scale Changes How We Understand Skid Resistance](../en/05-multiscale-texture-skid-resistance.md)
- [From Surface Topography to Pressure: Understanding Rough-Contact BEM](../en/04-bem-rough-contact.md)
- [Why Can a New Pavement Gain Skid Resistance Before Losing It?](../en/03-new-pavement-skid-resistance.md)

## References

1. Edjeou, W. (2021). *Analyse multiéchelle de la texture des chaussées - effet sur l’adhérence des revêtements routiers*. Doctoral thesis, École centrale de Nantes. [Manuscript on HAL](https://theses.hal.science/tel-03651239v1).
2. ISO 21920-2:2021. *Geometrical product specifications - Surface texture: Profile - Part 2: Terms, definitions and surface texture parameters*. [ISO record](https://www.iso.org/standard/72226.html).
3. ISO 25178-2:2021. *Geometrical product specifications - Surface texture: Areal - Part 2: Terms, definitions and surface texture parameters*. [ISO record](https://www.iso.org/standard/74591.html).
4. Edjeou, W., Cerezo, V., Zahouani, H. and Do, M.-T. (2023). *Contribution of multiscale analysis to the understanding of friction evolution of aggregates surfaces*. Surface Topography: Metrology and Properties, 11, 014006. [Article and DOI](https://doi.org/10.1088/2051-672X/acb95d).
5. Edjeou, W., Cerezo, V., Do, M.-T., Zahouani, H., Ropert, C. and Augris, P. (first published online in 2023). *Multiscale analyse of the relation between skid resistance and pavements surfaces texture evolution with polishing*. Road Materials and Pavement Design. [Article and DOI](https://doi.org/10.1080/14680629.2023.2191723).

*This article proposes an interpretation method, not a universal compliance criterion. Parameter selection and thresholds must be validated for the material, instrument and function under study.*
