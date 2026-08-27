# Why Do the First Wheel Passes After Rail Grinding Matter So Much?

Rail grinding is a maintenance operation: it removes material and corrects the surface condition. It also leaves machining marks. Their height may decrease rapidly under traffic, but the stresses they generate initially do not necessarily disappear from the material’s history when the marks fade. Understanding this phase requires looking at both the topography and what happens inside the material.

## Maintaining a surface also gives it a new starting condition

A rail surface evolves under repeated wheel contacts. Wear and rolling contact fatigue contribute to that evolution. Grinding removes a layer of material, corrects the profile and addresses certain surface defects. The research discussed here does not call its maintenance value into question.

The question is more specific: what happens to contact when the roughness actually produced by grinding is included?

A transverse profile describes the overall shape of the rail. At a finer scale, grinding marks introduce peaks, valleys and local changes in orientation. Two calculations using the same overall profile can therefore produce very different pressure distributions depending on whether these details are represented.

The study published in *Tribology International*, volume 201, combines field measurements with an elastoplastic contact model to examine this difference. It appeared online in 2024 in a volume dated 2025. [1]

## Taking an impression instead of moving the rail

The first challenge is experimental. It is not always possible to measure a railway surface directly in the field with the resolution and access available in a laboratory.

The selected method uses silicone replicas. A purpose-designed mould reproduces the transverse profile of the rail head. An optical profilometer then measures the replica surfaces. Geometric information is thus transferred from the track to the laboratory without removing a rail section. [1]

The campaigns took place on a straight section of track in Luleå, Sweden, after grinding and over the following weeks. The measurements capture the newly ground surface and its evolution under traffic. The loaded regions progressively become distinguishable from less affected areas.

The replica is not the end of the measurement chain, however. The acquired topography must be processed to address missing points and artefacts and to separate overall form from roughness. These operations are documented in the study. They matter as much as sensor selection because the small irregularities retained in the data will subsequently generate local loading in the model.

## What changes after the first passes?

Photographs show grinding marks becoming less pronounced and running bands appearing smoother. Topographic measurements quantify these changes beyond a visual impression.

The analysis uses the arithmetical mean height, Sa, together with parameters describing the peaks, core region and valleys. Their evolution indicates a substantial reduction in roughness early in the monitoring period. In this campaign, the measurement taken three days after grinding already shows a marked change. [1]

That interval is an observation specific to the site and traffic studied, not a universal stabilisation time. It should not be transferred to every railway line. Transported load, wheel profiles, contact conditions and the environment can all affect the evolution.

The observed flattening results from mechanisms that may act together: material removal and plastic deformation. A smoother surface alone cannot reveal how much each contributed. It shows the geometric outcome of their action, not the material’s complete mechanical history.

## Why a purely elastic model is not always sufficient

In elastic behaviour, a material returns to its original state when the load is removed. Plastic behaviour introduces a permanent component of deformation.

Beneath an asperity, the load may be transmitted through a very small region. Local loading may consequently require an elastoplastic description, even when a smoother representation of the contact appears less severe. Plasticity changes the geometry, redistributes pressure and leaves a residual state after unloading.

The model developed in this first study solves frictionless normal contact between the wheel and rail. It uses a boundary integral approach within the small-strain framework and the half-space approximation. The rail material follows an elastoplastic law with strain hardening, meaning that its resistance to further plastic deformation evolves. [1]

This formulation calculates interface pressures, displacements, and stress and strain fields within the rail. In this publication, it does not yet simulate the complete sequence of rolling contacts with tangential forces. That limitation defines precisely what the calculation can establish.

## Including measured roughness without claiming to retain every detail

The comparison starts with a reference contact without the fine roughness component, then adds that component to the rail profile. “Without roughness” therefore does not mean that all wheel and rail geometry has been removed. The overall contact geometry remains.

The measured topography is adapted to the computational domain. Because the measurement resolution is finer than the numerical grid, filtering precedes resampling. Wavelengths too short to be resolved adequately cannot simply be retained unchanged. [1]

This may sound like a purely numerical issue, but it is also a physical one. A poorly represented asperity can produce an unreliable local pressure. Computational resolution must therefore be consistent with the surface scales being investigated.

In the presented case, a normal load of 67 kN is applied, corresponding to the estimated mean load per wheel during the measurement period. The solver introduces this load progressively. The increments used to reach the prescribed load are not successive train passes. [1]

## What roughness changes in the calculation

With the rough topography, load transfer becomes much less uniform. Pressure peaks appear near the most heavily loaded asperities, and plastic fields become more concentrated close to the surface.

Several values illustrate the size of the difference in the calculated configuration:

| Calculated maximum quantity | Contact without fine roughness | Contact with measured roughness |
| --- | ---: | ---: |
| Contact pressure | 1.00 GPa | 4.33 GPa |
| Residual equivalent plastic strain | 0.48% | 2.58% |
| Residual von Mises equivalent stress | 0.33 GPa | 1.64 GPa |

These values come from Figures 3-6, 3-7 and 3-9 of the study. They are local simulation maxima associated with the selected load, geometry, material and discretisation. They are neither mean pressures over the entire contact patch nor direct stress measurements in an in-service rail. [1]

The main point is not a universal multiplication factor. It is that neglecting roughness can conceal highly loaded regions. Overall profile shape and surface detail both contribute to the distribution of forces.

## A smoother surface can retain a mechanical history

After unloading, the elastic component of deformation is released, but a plastic component remains. The calculation therefore produces a residual state: the material is no longer exactly as it was before contact.

This explains why the final appearance of the surface does not necessarily tell its entire story. Asperities may be flattened or worn away after producing severe local loading. Their subsequent reduction does not mean that the loading never occurred.

In the study, roughness increases concentrations of residual strain and stress close to the surface. These findings motivate investigation of possible consequences for defect initiation and rolling contact fatigue. By themselves, they are not observations of cracking or complete service-life predictions. [1]

One shortcut is particularly important to avoid: a stress maximum is not a count of cycles to failure. Fatigue analysis requires the loading history, the relevant material properties and an appropriate damage model.

## The assumptions that frame the interpretation

The first study deliberately isolates part of the problem. Contact is normal and frictionless, small strains are assumed, and the geometry corresponds to a straight section of track. Its conclusions cannot automatically be transferred to every wheel-rail configuration.

Another limitation concerns the metallurgical state of the surface. Grinding can produce a surface layer with properties different from those of the underlying material. This hardened layer is not explicitly represented in the model. The paper notes that including it could change the calculated plastic strains. [1]

Finally, the roughness description depends on acquisition, processing and grid choices. These do not make the result uninformative; they define its domain of validity. For maintenance applications, an explanatory calculation is more useful when the situations it represents, and those it does not, are clearly identified.

## From initial contact to wear and fatigue

A subsequent study published in *Wear* extends this approach to rolling contact. It introduces tangential forces and stick and slip regions within the contact patch, then combines contact calculations with Archard-law wear analysis and a fatigue model. [2]

This development makes it possible to investigate accumulated mechanical effects over repeated cycles. It does not automatically turn simulations into field-validated service-life forecasts. The second publication explicitly states that the experimental data provide realistic geometry but do not directly validate the numerical wear and fatigue predictions. [2]

The scientific progression is significant: measure the surface, understand its effect on contact, then study the cumulative consequences. Each stage adds mechanisms, but also validation requirements.

## What this contributes to the discussion of grinding

The issue is not an abstract choice between a rough surface and a perfectly smooth one. Grinding serves maintenance objectives under specific material and operational constraints. These studies show why the surface condition left by the operation also deserves attention.

Initial contacts may change the topography rapidly while establishing a residual mechanical state that should be considered. Transient roughness should therefore not be treated as mechanically negligible simply because it diminishes.

The most useful contribution is the connection between field measurements and calculation: a real surface impression becomes a model input, and the model reveals loading that surface inspection alone cannot show. This provides a basis for better maintenance questions, not a universal grinding prescription.

## Further reading

- [From Surface Topography to Pressure: Understanding Rough-Contact BEM](../en/04-bem-rough-contact.md)

## References

1. Edjeou, W., Moström, O., Asplund, M., Larsson-Kråik, P.-O., Pérez-Ràfols, F., Larsson, R. and Almqvist, A. (2025; first published online in 2024). *Evaluating the impact of rail surface roughness post-grinding: An experimental and elastoplastic modelling approach*. Tribology International, 201, 110270. [Article and DOI](https://doi.org/10.1016/j.triboint.2024.110270).
2. Edjeou, W., Larsson, P.-O., Larsson, R. and Almqvist, A. (2026; first published online in 2025). *Effect of the rail surface topography on wear and fatigue*. Wear, 586, 206218. [Article and DOI](https://doi.org/10.1016/j.wear.2025.206218).

*This article presents collaborative research. The numerical results are neither rail acceptance criteria nor a maintenance procedure.*
