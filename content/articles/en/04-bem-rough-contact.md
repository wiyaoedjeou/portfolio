# From Surface Topography to Pressure: Understanding Rough-Contact BEM

A surface map shows peaks and valleys. It does not yet tell us which peaks will carry the load, what pressures they will experience or how the material will deform. That is the role of a contact model. The Boundary Element Method, or BEM, offers a way to connect geometry to mechanical loading, provided the assumptions of the chosen formulation are respected.

## The problem: finding where the surfaces touch

At the macroscopic scale, we can draw a contact patch between a wheel and a rail, or between rubber and a pavement. At a finer scale, the load is not necessarily distributed over the whole patch. Some asperities touch while others remain separated.

The difficulty is that the actual contact region is not known in advance. It depends on initial geometry, loading and material deformation. Deformation, in turn, depends on the pressure being sought. The pressure distribution and the separation between the surfaces must therefore be determined together. [1, 2]

A contact model does not simply colour the highest points on a map: it accounts for mechanical interaction between points.

## Why a surface formulation can be useful

For a homogeneous elastic half-space, the material’s response to an elementary force is known. These responses can be combined to calculate the displacement caused by a pressure distribution. Green’s functions, and their influence coefficients after discretisation, provide this connection. [1]

The elastic calculation can consequently be formulated on a surface grid without constructing the complete volume mesh normally used in a three-dimensional finite element model. This is particularly useful when interface geometry is the central information in the problem.

The advantage depends on assumptions. The size of the region being studied must be compatible with the half-space approximation, and material behaviour, geometry and boundary conditions must match the mechanical kernel used. A thin coating on a substrate, a body of limited thickness or a strongly heterogeneous material is not automatically represented by the same model.

Nor should all BEM approaches be equated with this particular formulation, or the simplicity of the elastic case extended to every nonlinear problem.

## Four physical conditions to satisfy

For the non-adhesive normal contact considered here, let p denote compressive pressure and g the gap between the surfaces. The solution must satisfy four conditions:

- p ≥ 0: the surfaces may push against each other, but not pull on each other in this formulation.
- g ≥ 0: they must not interpenetrate.
- p × g = 0: a separated point carries no pressure; a loaded point is in contact.
- The sum of cell pressures multiplied by cell areas must equal the prescribed normal load.

These conditions, detailed in the thesis and the railway study, guide the search for a solution. The algorithm updates pressure and the set of contacting points until the constraints and convergence criteria are satisfied. [1, 2]

The third condition matters: requiring only non-negative pressures and gaps is insufficient. An open cell must also be prevented from transmitting contact load.

## What the FFT actually accelerates

Each loaded cell contributes to displacement elsewhere. Directly calculating all these interactions becomes expensive as the grid is refined.

For the half-space kernel used here, pressure and displacement are related through a convolution. Fast Fourier transforms, or FFTs, accelerate this operation. With N cells, the cost of this evaluation can be reduced from order N² to order N log N. [1]

That does not mean that a complete problem is always solved in seconds. Iteration count, tolerances, memory, hardware and additional physical mechanisms affect total runtime. Accelerating a convolution is not a performance benchmark for the entire solver.

FFT calculations also require correct boundary treatment. An incorrectly applied circular convolution may introduce artificial interactions between copies of the domain. The thesis describes zero-padding and an appropriate arrangement of influence coefficients to calculate the intended convolution. Using an FFT does not, by itself, require the physical problem to be periodic. [1]

## Calculation quality begins with the topography

A measured map is a useful input, but not a numerical ground truth ready for immediate use. Its units, spatial sampling, missing points and previous processing need to be known.

Overall form and roughness must be handled according to the problem. Removing an unwanted tilt is not the same as removing curvature that defines the contact. Likewise, resampling requires filtering consistent with the new resolution: an asperity that is too fine cannot be faithfully represented by only a few cells. [2]

Domain size matters as much as grid spacing. A small, highly detailed region may not represent the diversity of the surface. A large but coarse region may miss the asperities that concentrate pressure.

The compromise must therefore be checked against the quantities of interest: contact area, pressure distribution, displacements or subsurface fields. A visually convincing pressure map is not sufficient evidence of convergence.

## What pressure helps explain, and what it cannot predict alone

Normal elastic contact provides pressure, separation and real contact area, among other outputs. It is a stage in a modelling chain, not a universal model of friction, wear and fatigue.

For rubber, dissipation depends on viscoelasticity and the rate of loading. The thesis develops a viscoelastic extension to investigate this connection. An elastic pressure map alone does not directly provide tyre-pavement friction. [1]

For a rail, high local loading may require plasticity to be represented. The railway model therefore couples the contact solution to calculations of plastic strain and internal stress. It includes subsurface discretisation: the statement “only the surface is discretised” cannot be transferred without qualification to this elastoplastic extension. [2]

Wear and fatigue analysis introduces further laws and a loading history. The study published in *Wear* explores this extension while explicitly noting that its numerical predictions are not directly validated by the topographic measurements. [3]

## Before interpreting a pressure map

A useful verification starts with a reference case whose response is known, such as a smooth elastic contact compatible with the model assumptions. It continues with checks on load balance, contact constraints and sensitivity to grid resolution.

The selected material behaviour must then be checked against the calculated loading. A very high peak may identify an important physical mechanism, but it may also reflect inadequate resolution, a measurement artefact or the need to include plasticity that is absent from the model.

The question is therefore not just “does the solver converge?”, but “which representation of the problem does it converge to?”.

## A method serving a physical question

BEM is valuable because it connects detailed geometry to a mechanical response under explicit assumptions. Its usefulness should be judged against the problem being addressed, rather than a claim of general superiority over another method.

This introduction explains the tools. The case study on the first wheel passes after grinding shows what they reveal for measured rail topography; the multiscale texture article explains how relevant surface scales can be selected and interpreted.

## Further reading

- [Why Do the First Wheel Passes After Rail Grinding Matter So Much?](../en/02-rail-first-passes-after-grinding.md)
- [Pavement Texture: Why Scale Changes How We Understand Skid Resistance](../en/05-multiscale-texture-skid-resistance.md)

## References

1. Edjeou, W. (2021). *Analyse multiéchelle de la texture des chaussées - effet sur l’adhérence des revêtements routiers*. Doctoral thesis, École centrale de Nantes, Chapter 5, particularly Sections 5.1 and 5.2. [Manuscript on HAL](https://theses.hal.science/tel-03651239v1).
2. Edjeou, W., Moström, O., Asplund, M., Larsson-Kråik, P.-O., Pérez-Ràfols, F., Larsson, R. and Almqvist, A. (2025; first published online in 2024). *Evaluating the impact of rail surface roughness post-grinding: An experimental and elastoplastic modelling approach*. Tribology International, 201, 110270. [Article and DOI](https://doi.org/10.1016/j.triboint.2024.110270).
3. Edjeou, W., Larsson, P.-O., Larsson, R. and Almqvist, A. (2026; first published online in 2025). *Effect of the rail surface topography on wear and fatigue*. Wear, 586, 206218. [Article and DOI](https://doi.org/10.1016/j.wear.2025.206218).

*This introduction describes a modelling approach. It is neither a software benchmark nor validation for a particular industrial application.*
