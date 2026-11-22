/**
 * Weekly Environmental Engineering Question Bank
 * ----------------------------------------------
 * Each entry in `sets` represents one weekly release for a category.
 * Every set contains 5 multiple-choice questions (`questions` array).
 *
 * Tip: You can use author.html ("Instructor Upload Tool") to create and
 * download an updated copy of this file every Sunday without editing code.
 */
window.ENV_ENG_QUESTIONS = {
  sets: [
    {
      id: "2026-11-15-easy",
      weekLabel: "Week 1",
      weekDate: "2026-11-22",
      category: "easy",
      title: "Core Environmental Parameters & Fundamentals",
      questions: [
        {
          id: "q1",
          topic: "Water Quality • BOD₅",
          prompt: "In standard wastewater characterization, what does five-day biochemical oxygen demand (BOD₅) primarily measure?",
          choices: [
            "Total mass of inorganic suspended solids in a water sample",
            "Dissolved oxygen consumed by microorganisms while oxidizing biodegradable organic matter over 5 days at 20 °C",
            "Total oxygen required to chemically oxidize both organic and inorganic matter using potassium dichromate",
            "Concentration of dissolved oxygen remaining in a stream after atmospheric reaeration"
          ],
          correctIndex: 1,
          instructorNote: "BOD₅ is incubated in the dark at 20 °C for 5 days to quantify oxygen demand from biodegradable organics (whereas dichromate oxidation measures COD)."
        },
        {
          id: "q2",
          topic: "Drinking Water • Disinfection",
          prompt: "Which of the following is the primary operational advantage of using chloramines (combined chlorine) instead of free chlorine as a secondary disinfectant in municipal water distribution systems?",
          choices: [
            "Chloramines inactivate Cryptosporidium oocysts much faster than free chlorine",
            "Chloramines maintain a longer-lasting residual in the distribution network and form fewer regulated trihalomethanes (THMs)",
            "Chloramines require zero contact time before water reaches consumer taps",
            "Chloramines eliminate the need for coagulation and granular media filtration"
          ],
          correctIndex: 1,
          instructorNote: "Chloramines are weaker primary disinfectants than free chlorine, so they are typically applied for secondary residual maintenance and DBP control."
        },
        {
          id: "q3",
          topic: "Air Quality • Particulate Matter",
          prompt: "Why is particulate matter regulated specifically under the PM₂.₅ designation?",
          choices: [
            "It refers exclusively to sulfur dioxide gas emitted by coal-fired boilers",
            "It comprises airborne particles with an aerodynamic diameter of 2.5 micrometers or smaller, which can penetrate deep into the alveolar region of the lungs",
            "It measures ground-level ozone formed during afternoon photochemical smog",
            "It represents volatile organic compounds with boiling points below 2.5 °C"
          ],
          correctIndex: 1,
          instructorNote: "Fine particles (≤ 2.5 µm) bypass upper respiratory defenses and deposit in the gas-exchange region of the lungs."
        },
        {
          id: "q4",
          topic: "Solid Waste • Management Hierarchy",
          prompt: "In the integrated solid waste management hierarchy, which strategy is assigned the highest priority?",
          choices: [
            "Sanitary landfilling with landfill gas recovery",
            "Waste-to-energy mass-burn incineration",
            "Source reduction and reuse",
            "Centralized municipal composting"
          ],
          correctIndex: 2,
          instructorNote: "Preventing waste generation at the source avoids collection, processing, and disposal impacts altogether."
        },
        {
          id: "q5",
          topic: "Environmental Chemistry • pH Scale",
          prompt: "If the pH of a natural water sample decreases from 8.0 to 6.0, how does the hydrogen ion concentration [H⁺] change?",
          choices: [
            "It increases by a factor of 2",
            "It increases by a factor of 20",
            "It increases by a factor of 100",
            "It decreases by a factor of 100"
          ],
          correctIndex: 2,
          instructorNote: "Because pH = −log₁₀[H⁺], each 1-unit decrease in pH corresponds to a 10-fold increase in [H⁺]; a 2-unit drop gives 10² = 100×."
        }
      ]
    },
    {
      id: "2026-11-15-intermediate",
      weekLabel: "Week 1",
      weekDate: "2026-11-22",
      category: "intermediate",
      title: "Process Calculations & Treatment Principles",
      questions: [
        {
          id: "q1",
          topic: "Wastewater • Activated Sludge SRT",
          prompt: "An aeration basin has a volume of 2,000 m³ and operates at a mixed liquor suspended solids (MLSS) concentration of 3,000 mg/L. Waste activated sludge (WAS) is wasted at 40 m³/day with a concentration of 10,000 mg/L. Neglecting effluent suspended solids, what is the solids retention time (SRT)?",
          choices: [
            "5.0 days",
            "10.0 days",
            "15.0 days",
            "20.0 days"
          ],
          correctIndex: 2,
          instructorNote: "SRT = (V × X) / (Qw × Xw) = (2,000 m³ × 3 kg/m³) / (40 m³/d × 10 kg/m³) = 6,000 kg / 400 kg/d = 15.0 days."
        },
        {
          id: "q2",
          topic: "Water Treatment • Coagulation Chemistry",
          prompt: "Why does adding alum [Al₂(SO₄)₃·14H₂O] for coagulation consume natural alkalinity in raw surface water?",
          choices: [
            "Aluminum ions hydrolyze in water to form Al(OH)₃ precipitate and release H⁺ ions, which are neutralized by bicarbonate alkalinity",
            "Sulfate ions directly precipitate dissolved calcium carbonate as CaCO₃(s)",
            "Alum raises the raw water pH above 11, stripping bicarbonate out as CO₂ gas",
            "Aluminum complexes with dissolved nitrogen gas to generate nitric acid"
          ],
          correctIndex: 0,
          instructorNote: "Each mole of Al³⁺ forms Al(OH)₃(s) + 3 H⁺, consuming 3 equivalents of HCO₃⁻ alkalinity unless supplemental alkalinity is added."
        },
        {
          id: "q3",
          topic: "Surface Water • Streeter-Phelps Model",
          prompt: "In the classic Streeter-Phelps dissolved oxygen sag curve for a river receiving a steady point-source biodegradable discharge, what condition holds exactly at the critical point (maximum oxygen deficit)?",
          choices: [
            "The rate of biochemical deoxygenation becomes zero",
            "The rate of atmospheric reaeration equals the rate of biochemical deoxygenation",
            "Dissolved oxygen reaches 100% saturation",
            "The reaeration rate constant k₂ becomes numerically equal to the BOD decay constant k₁"
          ],
          correctIndex: 1,
          instructorNote: "At the minimum DO (maximum deficit D_c), dD/dt = k₁L − k₂D = 0, meaning reaeration (k₂D) balances deoxygenation (k₁L)."
        },
        {
          id: "q4",
          topic: "Unit Operations • Ideal Sedimentation",
          prompt: "According to Type I (discrete particle) ideal settling theory in a horizontal-flow rectangular clarifier, what happens to the surface overflow rate (v₀ = Q / A_surface) if the basin depth is doubled while flow rate Q and surface area A_surface remain constant?",
          choices: [
            "The overflow rate doubles, reducing particle removal efficiency",
            "The overflow rate halves, improving particle removal efficiency",
            "The overflow rate remains unchanged, so theoretical discrete-settling removal efficiency is unaffected",
            "The overflow rate decreases by a factor of four"
          ],
          correctIndex: 2,
          instructorNote: "In ideal Type I settling, both detention time and vertical settling distance double when depth doubles, so critical settling velocity v₀ = Q / A_surface is independent of depth."
        },
        {
          id: "q5",
          topic: "Air Dispersion • Gaussian Plume",
          prompt: "In a Gaussian plume model for an elevated continuous point source under neutral stability, approximately how does doubling the effective stack height H (holding emission rate and wind speed constant) affect the maximum ground-level centerline concentration?",
          choices: [
            "It decreases the maximum ground-level concentration by a factor of 2",
            "It decreases the maximum ground-level concentration by a factor of 4",
            "It increases the maximum ground-level concentration by a factor of 2",
            "It has no effect because ground-level concentration depends solely on wind speed"
          ],
          correctIndex: 1,
          instructorNote: "Maximum ground-level concentration scales inversely with H² (C_max ∝ Q / (u·H²)), so doubling H lowers C_max to roughly one-fourth."
        }
      ]
    },
    {
      id: "2026-11-15-hard",
      weekLabel: "Week 1",
      weekDate: "2026-11-22",
      category: "hard",
      title: "Systems Trade-Offs & Operational Troubleshooting",
      questions: [
        {
          id: "q1",
          topic: "Biological Nutrient Removal • MLE Process",
          prompt: "A municipal wastewater plant operating a Modified Ludzack-Ettinger (MLE) configuration achieves complete nitrification in the aerobic zone, yet effluent nitrate (NO₃⁻-N) remains high despite adequate internal mixed liquor recycle. Which operational limitation is the most plausible root cause?",
          choices: [
            "Insufficient dissolved oxygen in the aerobic zone prevents complete conversion of nitrite to nitrate",
            "Insufficient readily biodegradable organic carbon (rbCOD) or excessive dissolved oxygen carry-over into the anoxic zone is limiting denitrification",
            "The solids retention time (SRT) is too long, allowing heterotrophic denitrifiers to outcompete autotrophic nitrifiers",
            "Elevated effluent alkalinity is chemically inhibiting heterotrophic denitrification"
          ],
          correctIndex: 1,
          instructorNote: "Denitrifiers require anoxic conditions (minimal DO) and an electron donor (rbCOD). High DO in the internal recycle or low influent rbCOD stalls nitrate reduction."
        },
        {
          id: "q2",
          topic: "Water Treatment • Disinfection Byproducts",
          prompt: "A conventional surface water plant relocates chlorine dosing from the rapid-mix influent (pre-chlorination) to downstream of the granular media filters, while maintaining the same final chlorine dose. Why does regulated trihalomethane (THM) formation typically drop substantially?",
          choices: [
            "Granular filtration removes dissolved chloride ions that catalyze THM reactions",
            "Relocating chlorination lowers water temperature inside the clearwell",
            "Coagulation, flocculation, and filtration remove natural organic matter (NOM) precursors before chlorine contacts the water",
            "Post-filtration water has zero alkalinity, preventing haloacetic acid and THM formation"
          ],
          correctIndex: 2,
          instructorNote: "Removing humic and fulvic NOM precursors via enhanced coagulation and filtration before adding free chlorine prevents precursor–chlorine reaction."
        },
        {
          id: "q3",
          topic: "Groundwater Remediation • Sorption & Tailing",
          prompt: "During pump-and-treat remediation of an aquifer contaminated with a hydrophobic organic solvent (high octanol-water partition coefficient, K_ow), effluent concentrations fall rapidly at first but then plateau into a persistent 'tailing' curve above cleanup targets for years. What mechanism primarily drives this behavior?",
          choices: [
            "Rate-limited desorption and slow back-diffusion from organic-rich soil micropores and low-permeability clay lenses into mobile groundwater",
            "Spontaneous radioactive decay of the organic solvent into more soluble daughter compounds",
            "Rapid aerobic mineralization that permanently doubles aquifer hydraulic conductivity",
            "Complete volatilization of the contaminant below the water table"
          ],
          correctIndex: 0,
          instructorNote: "Strong hydrophobic sorption and diffusion into immobile zones mean clean flushed porewater rebounds as trapped mass slowly diffuses back out."
        },
        {
          id: "q4",
          topic: "Anaerobic Digestion • Toxicity & Equilibrium",
          prompt: "An anaerobic digester treating high-protein industrial waste experiences a rise in pH from 7.2 to 8.1 accompanied by a sharp drop in methane production and rising volatile fatty acid (VFA) concentrations. Which inhibition mechanism best explains this behavior?",
          choices: [
            "Elevated pH shifts the NH₄⁺ / NH₃ equilibrium toward unionized free ammonia (NH₃), which diffuses across cell membranes and inhibits methanogens",
            "Hydrogenotrophic methanogens consume excess CO₂, causing immediate irreversible acidification",
            "Sulfate-reducing bacteria oxidize all dissolved methane directly into hydrogen sulfide gas",
            "High pH selectively kills hydrolytic bacteria while leaving acetoclastic methanogens unaffected"
          ],
          correctIndex: 0,
          instructorNote: "Protein degradation releases ammonia; as pH rises toward pKa (~9.25), the unionized NH₃ fraction increases sharply and suppresses methanogenesis before VFAs can neutralize pH."
        },
        {
          id: "q5",
          topic: "Solid Waste • Bioreactor Landfills",
          prompt: "Why must leachate recirculation in an anaerobic bioreactor landfill be carefully engineered and throttled rather than maximized unconditionally?",
          choices: [
            "Excess moisture lowers internal waste temperatures below freezing",
            "Over-saturation can generate perched leachate tables, reduce shear strength (slope instability), increase hydraulic head on the bottom liner, and flood gas collection wells",
            "Recirculation permanently converts the entire landfill interior to aerobic decomposition",
            "Recirculating leachate eliminates all biodegradable organic carbon within 24 hours"
          ],
          correctIndex: 1,
          instructorNote: "Geotechnical stability, liner head limits (typically ≤ 30 cm), and maintaining open gas extraction pathways constrain safe moisture addition rates."
        }
      ]
    }
  ]
};
