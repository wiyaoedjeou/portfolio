# What Water Spray Can Tell Us About a Wet Road

Water spray behind a tyre is usually regarded as a nuisance. It can also become a source of information: the vibrations caused by droplets striking the wheel arch can help us investigate how much water is present on a road. Turning splashes into a measurement, however, takes considerably more than attaching a sensor.

## An everyday phenomenon, a measurement problem

After rainfall, a pavement can retain water without displaying large puddles. Knowing that it has rained is therefore not enough to understand the contact between a tyre and the surface. We also need to consider the water remaining locally, the pavement texture and the conditions under which the vehicle passes over it.

One question investigated in the studies discussed here is whether the effects of a tyre rolling through water can be used to estimate that water, rather than relying solely on a dedicated optical instrument.

The approach follows a physical chain that is straightforward to describe. The tyre encounters a wet surface, displaces water and produces spray. Some droplets strike the wheel arch and make it vibrate. An accelerometer records a mechanical response that may contain information about the road surface condition. The scientific challenge is to identify that information and establish when it remains useful. [1, 2]

## What does “water depth” mean on a rough surface?

On a perfectly flat plate, the concept seems obvious. On a pavement, water occupies depressions of different sizes and may leave some summits exposed. Two surfaces holding the same volume of water per unit area do not necessarily have the same film above their asperities.

We must distinguish a depth measured above the summits from a mean depth, defined as water volume divided by the wetted area. The passenger-car study uses the latter definition. This matters because a mean value does not, by itself, describe how water is distributed locally between peaks and valleys. [2]

Nor does the on-board sensor observe that geometry directly. It measures the consequences of tyre-water-pavement interaction. Its calibration must therefore connect the vibration signal to a reference measurement using a consistent definition of the quantity being estimated.

## Making the wheel arch a sensing surface

Not all droplets follow the same path. Some water is displaced forwards or sideways; some is carried by the tyre and then ejected behind it. The sensor position consequently determines which parts of the spray contribute most strongly to the signal.

In an initial study, a trailer fitted with a wheel provided better visual access to the phenomenon than a complete car. Four accelerometer positions were compared. Flow observations and signal analysis highlighted the usefulness of a location low on the wheel arch, close to the pavement. In that configuration, droplet impacts produced a stronger response. [1]

This does not establish a single ideal position for every vehicle. Wheel-arch geometry, its mechanical properties and droplet trajectories all contribute to the measurement. The sensor and the structure supporting it together form the sensing system.

That distinction is fundamental to an on-board application. Installing the same accelerometer elsewhere does not guarantee the same relationship between vibration and water depth.

## Separating droplets from other vibrations

A car also vibrates on a dry road. Vehicle dynamics and pavement irregularities contribute to the raw signal. A large recorded acceleration therefore cannot automatically be attributed to water.

Comparisons between dry and wet tests help identify frequencies at which the two conditions differ. The studies then use a Chebyshev filter retaining the band from 2 to 7 kHz. In the tested configurations, this processing reduces unwanted contributions and brings out the response associated with spray. [1, 2]

This is not a universal frequency signature of water. It is a choice established from the apparatus and the experiments. Its suitability would need to be checked for a different vehicle.

The filtered signal also needs to be summarised. The passenger-car study uses its root mean square, or RMS, value. This measure combines amplitudes over a measurement window without cancelling positive and negative oscillations as a simple signed average would. It provides a quantity that can be compared between runs. [2]

The resulting information is more robust than an isolated peak. Nevertheless, it still describes a vibration. The next step is to relate it to the water actually present on the road.

## From a trailer to a passenger car

The trailer study examines three surfaces at two speeds. It reveals a relationship between filtered signal amplitude and water depth, with a dependence on speed. Within this limited programme, the measurements allow a common curve to be fitted across the tested surfaces for each speed. This demonstrates feasibility; it is not yet validation across the road network. [1]

Moving to a passenger car adds another stage. Accelerometers are installed on the front wheel arch of a Clio 3, and experiments are conducted on three test-track pavements. The investigated conditions cover speeds from 25 to 70 km/h and water depths of approximately 0.1 to 0.8 mm. These ranges describe the experiments, not certified operating limits for a product. [2]

Two trends emerge: amplitude generally increases with both water depth and speed. A given amplitude therefore has no unique interpretation. Without knowing the driving conditions, we cannot simply read water depth from a curve that is independent of the vehicle and its speed.

This illustrates a familiar challenge in indirect measurement: different causes can produce similar responses. Estimation quality depends on our ability to distinguish them.

## A response with a threshold and saturation

The observed relationship is not simply proportional. In the passenger-car study, an exponential model describes the increase in amplitude and its tendency to level off. A modified version also introduces an offset that depends on surface and speed. [2]

This offset represents a response threshold: on some surfaces, a small amount of water does not yet produce enough detectable spray. The absence of a clear response therefore does not prove that the pavement is dry. Water may be present below the detection threshold of the particular configuration.

At the other end of the response, saturation has a different implication. When the curve becomes almost horizontal, a change in water depth produces only a small change in measured amplitude. We can infer that estimating depth by inverting this relationship becomes more sensitive to signal uncertainty. This implication follows from the shape of the model; it is not an additional experimental result.

Threshold and saturation remind us that a sensor is not equally sensitive in every situation. A model that fits the data well does not remove the need to assess how much confidence can be placed in each estimate.

## Texture is more than a mean depth

The pavement affects how water is stored, drained and projected. It might therefore seem reasonable to expect a mean macrotexture indicator to explain differences between surfaces.

The results are more nuanced. In the passenger-car study, mean texture depth and mean profile depth do not fully explain the ranking of the responses observed across the three surfaces. The authors propose further investigation of spray mechanisms using three-dimensional topographic maps. [2]

This connects directly with my work on pavement texture: an average can conceal the geometric arrangements that influence a function. In my thesis, multiscale decomposition helps interpret changes in friction. Here, the question concerns how water is distributed and projected. [3]

This does not mean that the skid-resistance results can be transferred directly to the sensor. The two problems share a need for geometric description, but they do not involve exactly the same mechanisms. Connecting them is a research direction, not an equivalence that has already been demonstrated.

## Estimating water is not the same as measuring friction

This distinction is essential. The system discussed here seeks to estimate water depth from vibrations. It does not directly measure the tyre-pavement friction coefficient, nor does it provide a braking distance on its own.

Moving from water to friction also requires consideration of speed, texture, the tyre and the contact conditions. Two situations with the same mean water depth may therefore behave differently. The passenger-car study identifies the development of a friction estimator as a subsequent step. [2]

The experiments themselves have limitations. A test track enables surface comparisons and control over some operating conditions. An in-service road may have deformations, irregularities and a more heterogeneous distribution of water. Transfer to those conditions must be evaluated, not assumed.

Because the same tyres are used throughout the passenger-car campaign, their influence cannot be isolated from these experiments either. Tyre geometry, wheel-arch geometry and changes in the sensor support are among the factors that would be worth examining to develop a more general system. These are validation needs, not capabilities that have already been established.

## What this research contributes

The main contribution is to turn a usually unwanted phenomenon into measurable information, then show how that information depends on identifiable physical conditions. The work goes beyond detecting a difference between dry and wet surfaces: it seeks a quantitative relationship with the water present on the pavement.

The method advances through several stages: observing the spray, selecting sensor positions, filtering the signals, comparing them with a reference and investigating the limits of the estimate. This chain gives the result its value.

Possible applications to driver assistance remain an important motivation. Their development will require characterisation of uncertainty, non-detection conditions and robustness across other configurations. The scientific proposition is precise: water spray can tell us something about the road. To establish how much, we must keep connecting the signal to the physics that produces it.

## Further reading

- [Pavement Texture: Why Scale Changes How We Understand Skid Resistance](../en/05-multiscale-texture-skid-resistance.md)
- [Why Can a New Pavement Gain Skid Resistance Before Losing It?](../en/03-new-pavement-skid-resistance.md)

## References

1. Riahi, E., Edjeou, W., Buisson, S., Gennesseaux, M. and Do, M.-T. (2022). *Estimation of Water Depth on Road Surfaces Using Accelerometric Signals*. Sensors, 22, 8940. [Article and DOI](https://doi.org/10.3390/s22228940).
2. Edjeou, W., Riahi, E., Gennesseaux, M., Cerezo, V. and Do, M.-T. (2024; first published online in December 2023). *Estimation of Road Wetness from a Passenger Car*. Lubricants, 12, 2. [Article and DOI](https://doi.org/10.3390/lubricants12010002).
3. Edjeou, W. (2021). *Analyse multiéchelle de la texture des chaussées - effet sur l’adhérence des revêtements routiers*. Doctoral thesis, École centrale de Nantes. [Manuscript on HAL](https://theses.hal.science/tel-03651239v1).

*This explanatory article draws on collaborative research. It does not validate a commercial system or provide driving advice.*
