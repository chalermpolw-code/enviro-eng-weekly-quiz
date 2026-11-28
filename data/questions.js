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
    /* ================= Week 01 · 22 Nov 2026 · Nitrogen Oxides (NOₓ) Formation and Control ================= */
    {
      id: "2026-11-22-easy",
      weekLabel: "Week 01",
      weekDate: "2026-11-22",
      category: "easy",
      title: "Nitrogen Oxides (NOₓ): Formation Basics",
      questions: [
        {
          id: "q1",
          topic: "Air Pollution • NOₓ Basics",
          prompt: "Nitrogen oxides (NOₓ) are a major group of air pollutants released by power plants, factories, and vehicles. Which pair of gases makes up NOₓ, and what are two major environmental problems they help cause?",
          choices: [
            "Nitrous oxide (N₂O) and ammonia (NH₃); ozone-layer thickening and soil salinization",
            "Nitric oxide (NO) and nitrogen dioxide (NO₂); acid rain and ground-level ozone (smog)",
            "Nitrogen gas (N₂) and carbon monoxide (CO); ocean acidification and deforestation",
            "Ammonia (NH₃) and sulfur dioxide (SO₂); thermal pollution and water eutrophication"
          ],
          correctIndex: 1,
          instructorNote: "NOₓ is the collective term for nitric oxide (NO) and nitrogen dioxide (NO₂). In the atmosphere, NOₓ reacts with sunlight and volatile organic compounds (VOCs) to form ground-level ozone (photochemical smog), and reacts with moisture to form nitric acid, a major contributor to acid rain."
        },
        {
          id: "q2",
          topic: "Combustion • Thermal NOₓ",
          prompt: "Even when a factory burns a very clean fuel that contains almost no nitrogen—such as natural gas—NOₓ is still formed in the exhaust. Where does the nitrogen in this \"thermal NOₓ\" come from?",
          choices: [
            "From the steel walls of the furnace",
            "From the combustion air, because normal air is mostly nitrogen gas (N₂)",
            "From water vapor used to cool the steam pipes",
            "From carbon dioxide breaking apart inside the smokestack"
          ],
          correctIndex: 1,
          instructorNote: "Ambient air is roughly 78% nitrogen gas (N₂) and 21% oxygen gas (O₂). At very high flame temperatures, N₂ and O₂ from the combustion air break apart and combine to form thermal NOₓ, even when the fuel itself contains no nitrogen."
        },
        {
          id: "q3",
          topic: "Combustion • Flame Temperature",
          prompt: "How does increasing the peak flame temperature inside a boiler or furnace affect the amount of thermal NOₓ produced?",
          choices: [
            "Higher flame temperatures produce significantly more thermal NOₓ.",
            "Higher flame temperatures produce less thermal NOₓ.",
            "Flame temperature has no effect on thermal NOₓ.",
            "Thermal NOₓ only forms after the furnace is shut down and cooled."
          ],
          correctIndex: 0,
          instructorNote: "Thermal NOₓ formation is strongly driven by heat—once flame temperatures climb above roughly 1,400 °C (2,600 °F), thermal NOₓ increases exponentially. Lowering peak flame temperature is therefore one of the most effective ways to curb thermal NOₓ."
        },
        {
          id: "q4",
          topic: "Control Technology • SCR Catalyst",
          prompt: "Selective Catalytic Reduction (SCR) is a common air-pollution control system that injects ammonia (NH₃) into exhaust gas to convert harmful NOₓ into harmless nitrogen gas (N₂) and water vapor (H₂O). What is the main purpose of the catalyst inside an SCR unit?",
          choices: [
            "It traps solid ash particles like a mechanical filter.",
            "It allows the chemical reaction to happen efficiently at much lower exhaust temperatures without being consumed itself.",
            "It burns extra fuel to heat the exhaust gas above 1,000 °C.",
            "It turns nitrogen gas into liquid fertilizer inside the chimney."
          ],
          correctIndex: 1,
          instructorNote: "A catalyst lowers the activation energy needed for a chemical reaction without being consumed. In SCR, the catalyst allows NH₃ to convert NOₓ into N₂ and H₂O at moderate exhaust temperatures (around 250–400 °C), rather than the 930–1,090 °C required without a catalyst."
        },
        {
          id: "q5",
          topic: "Combustion • Fuel NOₓ",
          prompt: "Coal and heavy fuel oil naturally contain nitrogen chemically bound inside the fuel, whereas natural gas contains almost none. If a power plant switches from burning heavy fuel oil to burning natural gas, what happens to its fuel NOₓ emissions?",
          choices: [
            "They stay the same because all fossil fuels contain equal amounts of nitrogen.",
            "They increase sharply because natural gas burns faster.",
            "They drop dramatically because far less nitrogen enters the furnace with the fuel.",
            "They double because natural gas reacts with carbon dioxide."
          ],
          correctIndex: 2,
          instructorNote: "Fuel NOₓ forms when nitrogen chemically bound inside the fuel oxidizes during combustion. Switching from a high-nitrogen fuel (like heavy fuel oil or coal) to a virtually nitrogen-free fuel (like natural gas) eliminates most fuel NOₓ at the source."
        }
      ]
    },
    {
      id: "2026-11-22-intermediate",
      weekLabel: "Week 01",
      weekDate: "2026-11-22",
      category: "intermediate",
      title: "Nitrogen Oxides (NOₓ): Control Calculations",
      questions: [
        {
          id: "q1",
          topic: "Control Calculation • Low-NOₓ Burners",
          prompt: "An industrial boiler emits 200 ppm of NOₓ before any pollution control is installed. After retrofitting the boiler with Low-NOₓ Burners that achieve a 45% reduction in NOₓ, what is the new NOₓ emission level?",
          choices: [
            "90 ppm",
            "110 ppm",
            "155 ppm",
            "180 ppm"
          ],
          correctIndex: 1,
          instructorNote: "A 45% reduction means 100% − 45% = 55% of the original NOₓ remains:\nNew NOₓ = 200 ppm × (1 − 0.45) = 200 × 0.55 = 110 ppm\n(Note: 90 ppm is the amount removed, not the amount remaining.)"
        },
        {
          id: "q2",
          topic: "Stoichiometry • SCR Ammonia Demand",
          prompt: "In a Selective Catalytic Reduction (SCR) reactor, nitric oxide (NO) reacts with ammonia (NH₃) according to the balanced chemical equation:\n4NO + 4NH₃ + O₂ → 4N₂ + 6H₂O\nIf an exhaust stream contains 80 mol/h of NO that must be removed, how many moles per hour of NH₃ are required for an exact stoichiometric reaction?",
          choices: [
            "20 mol/h",
            "40 mol/h",
            "80 mol/h",
            "120 mol/h"
          ],
          correctIndex: 2,
          instructorNote: "From the balanced equation 4NO + 4NH₃ + O₂ → 4N₂ + 6H₂O, the molar ratio of NH₃ to NO is 4:4, or 1:1. Therefore, removing 80 mol/h of NO requires 80 mol/h of NH₃."
        },
        {
          id: "q3",
          topic: "Control Calculation • Controls in Series",
          prompt: "A natural-gas boiler has an uncontrolled NOₓ emission level of 100 ppm. First, Low-NOₓ Burners reduce the emissions by 40%. Next, Flue Gas Recirculation (FGR) reduces the remaining NOₓ by 50%. What is the final NOₓ concentration?",
          choices: [
            "10 ppm",
            "30 ppm",
            "45 ppm",
            "50 ppm"
          ],
          correctIndex: 1,
          instructorNote: "Apply each reduction step sequentially to what remains:\n• After Low-NOₓ Burners (40% reduction): 100 × (1 − 0.40) = 60 ppm\n• After FGR (50% reduction of the remaining 60 ppm): 60 × (1 − 0.50) = 30 ppm\n(Simply adding 40% + 50% = 90% is incorrect because the second control only acts on the NOₓ left after the first control.)"
        },
        {
          id: "q4",
          topic: "SCR Operation • Ammonia Slip",
          prompt: "An SCR system receives exhaust gas containing 100 ppm of NO. Because gas mixing is never completely uniform, operators inject 85 ppm of NH₃ in order to remove 80 ppm of NO (reacting in a 1:1 ratio). Assuming no other side reactions occur, how much unreacted ammonia (ammonia slip) leaves the reactor?",
          choices: [
            "5 ppm",
            "15 ppm",
            "20 ppm",
            "85 ppm"
          ],
          correctIndex: 0,
          instructorNote: "Since NH₃ and NO react in a 1:1 ratio, removing 80 ppm of NO consumes 80 ppm of NH₃. The leftover ammonia escaping the reactor is:\nAmmonia slip = 85 ppm injected − 80 ppm consumed = 5 ppm"
        },
        {
          id: "q5",
          topic: "Energy Trade-off • Air Preheat",
          prompt: "Preheating combustion air saves fuel, but it also raises flame temperature and increases thermal NOₓ. As a practical engineering rule of thumb, lowering the combustion-air preheat temperature by 40 °F reduces boiler thermal efficiency by about 1%. If a plant lowers its air preheat temperature by 120 °F to curb NOₓ emissions, what is the expected drop in boiler efficiency?",
          choices: [
            "1.5%",
            "3%",
            "4%",
            "12%"
          ],
          correctIndex: 1,
          instructorNote: "Using the rule of thumb of 1% efficiency loss per 40 °F drop in air preheat temperature:\nEfficiency loss = (120 °F ÷ 40 °F) × 1% = 3%"
        }
      ]
    },
    {
      id: "2026-11-22-hard",
      weekLabel: "Week 01",
      weekDate: "2026-11-22",
      category: "hard",
      title: "Nitrogen Oxides (NOₓ): Real-World Applications",
      questions: [
        {
          id: "q1",
          topic: "Combustion Tuning • Excess Air",
          prompt: "A plant engineer wants to cut NOₓ emissions from an industrial boiler without purchasing new equipment, so they gradually reduce the excess combustion air supplied to the burners. At first, fuel efficiency improves and NOₓ drops. However, if the engineer reduces the air supply too far, what real-world problem will force them to stop?",
          choices: [
            "The boiler will begin producing large amounts of sulfur dioxide (SO₂) from the air.",
            "Incomplete combustion will cause carbon monoxide (CO) emissions to spike and make the flame unstable or overly long.",
            "The flame will become so hot that it immediately melts the smokestack.",
            "The exhaust gas will become too cold for nitrogen gas (N₂) to remain a gas."
          ],
          correctIndex: 1,
          instructorNote: "Lowering excess air restricts oxygen in the flame zone, which reduces NOₓ and cuts heat lost up the stack. However, pushing excess air too low starves the flame of oxygen (fuel-rich operation), causing incomplete combustion—resulting in high carbon monoxide (CO), unburned fuel, long smoky flames, and flame instability."
        },
        {
          id: "q2",
          topic: "Control Selection • Flue Gas Recirculation",
          prompt: "Flue Gas Recirculation (FGR)—which routes cooled exhaust gas back into the burner to lower flame temperature—can cut NOₓ by 50–70% in a natural-gas boiler, yet it is far less effective on a coal-fired boiler. Why does FGR work so much better on natural gas than on coal?",
          choices: [
            "Natural gas produces mainly thermal NOₓ (which drops sharply when flame temperature is lowered), whereas coal produces substantial fuel NOₓ from nitrogen bound in the coal (which is much less sensitive to flame temperature).",
            "Coal exhaust contains no carbon dioxide, so it cannot dilute or cool the flame.",
            "Natural gas burns at a much lower temperature than coal, so FGR freezes the coal flame.",
            "FGR increases the oxygen concentration inside a coal burner, creating additional NOₓ."
          ],
          correctIndex: 0,
          instructorNote: "FGR works primarily as a thermal diluent that lowers peak flame temperature—making it ideal for curbing thermal NOₓ in natural-gas boilers. In coal-fired boilers, however, a large share of NOₓ comes from organically bound nitrogen in the coal (fuel NOₓ). Because carbon–nitrogen bonds in coal break much more easily than atmospheric N₂ bonds, fuel NOₓ depends mostly on local air–fuel mixing (stoichiometry) rather than flame temperature."
        },
        {
          id: "q3",
          topic: "Retrofit Design • Flame Length",
          prompt: "A refinery upgrades an older fired heater by installing Low-NOₓ Burners (LNBs), which intentionally slow down air–fuel mixing to keep peak flame temperatures lower. During startup, operators observe that the flames are 50–100% longer than before. What is the main real-world risk of these longer flames inside an existing heater?",
          choices: [
            "The longer flames will pull nitrogen out of the steel furnace walls and increase fuel NOₓ.",
            "The flames may directly touch (\"impinge on\") the process tubes inside the heater, causing localized overheating and tube damage.",
            "The heater will no longer release enough total heat to warm the process fluid.",
            "The longer flames will convert all NOₓ into ammonia inside the firebox."
          ],
          correctIndex: 1,
          instructorNote: "Because Low-NOₓ Burners delay air–fuel mixing to avoid hot spots, they naturally produce cooler, longer flames (50–100% longer than conventional burners). In an existing fired heater with fixed dimensions, engineers must check burner-to-tube clearances carefully; if the flame touches the tubes (flame impingement), it can cause severe localized overheating, internal fouling, or tube rupture."
        },
        {
          id: "q4",
          topic: "Safety • Ammonia Reagent Storage",
          prompt: "SCR systems require ammonia (NH₃) to reduce NOₓ. Many modern industrial facilities choose aqueous ammonia (a liquid solution of about 27% NH₃ in water) instead of pure anhydrous ammonia, even though aqueous ammonia requires extra energy to vaporize the water. What is the primary real-world reason for choosing aqueous ammonia?",
          choices: [
            "Aqueous ammonia removes twice as much NOₓ per mole of NH₃ as anhydrous ammonia.",
            "Pure anhydrous ammonia is toxic and must be stored under high pressure, whereas aqueous ammonia has a much lower vapor pressure and is significantly safer to transport and store near populated areas.",
            "Anhydrous ammonia cannot react with NO in the presence of a catalyst.",
            "Adding water vapor to the exhaust gas permanently doubles the lifespan of the SCR catalyst."
          ],
          correctIndex: 1,
          instructorNote: "Pure anhydrous ammonia is a toxic gas at ambient conditions and must be stored and transported under high pressure in thick-walled tanks, posing significant community and worker safety hazards if a leak occurs. Aqueous ammonia (~27% NH₃ in water) has a near-atmospheric vapor pressure at room temperature, making storage and handling far safer—a real-world safety benefit that usually outweighs the modest energy cost of vaporizing the water."
        },
        {
          id: "q5",
          topic: "SCR Operation • Ammonium Bisulfate",
          prompt: "In a power plant burning sulfur-containing coal, the SCR reactor is carefully operated above roughly 320 °C, and ammonia slip is kept very low (below 5 ppm). What practical problem occurs if the exhaust gas cools below this temperature while excess ammonia and sulfur trioxide (SO₃) are both present?",
          choices: [
            "Excess ammonia freezes into solid ice crystals that block the smokestack.",
            "Excess ammonia reacts with SO₃ and water vapor to form sticky ammonium bisulfate (NH₄HSO₄), which coats and clogs the catalyst and downstream heat-exchange equipment.",
            "The catalyst melts and releases sulfur dioxide back into the furnace.",
            "NOₓ converts into liquid nitric acid and explodes inside the boiler."
          ],
          correctIndex: 1,
          instructorNote: "Burning sulfur-bearing coal produces SO₂ and small amounts of SO₃ (and the SCR catalyst itself oxidizes some SO₂ to SO₃). If flue-gas temperatures fall below about 320 °C, SO₃ reacts with excess NH₃ and water vapor to form sticky ammonium bisulfate (NH₄HSO₄):\nSO₃ + NH₃ + H₂O → NH₄HSO₄\nThis sticky compound coats the catalyst pores and downstream air preheaters, causing fouling, pressure-drop buildup, and equipment plugging."
        }
      ]
    },
    /* ================= Week 02 · 29 Nov 2026 · Activated Carbon Adsorption in Air and Water Pollution Control ================= */
    {
      id: "2026-11-29-easy",
      weekLabel: "Week 02",
      weekDate: "2026-11-29",
      category: "easy",
      title: "Activated Carbon Adsorption: Fundamentals",
      questions: [
        {
          id: "q1",
          topic: "Adsorption • Terminology",
          prompt: "In air and water pollution control using activated carbon, pollutants adhere as an extremely thin layer onto the surface of the porous solid rather than dissolving uniformly throughout its interior bulk. What is this surface-adhesion process called, and what term describes the pollutant molecules being captured?",
          choices: [
            "Absorption; adsorbent",
            "Adsorption; adsorbate",
            "Adsorption; adsorbent",
            "Desorption; adsorbate"
          ],
          correctIndex: 1,
          instructorNote: "Adsorption is a surface phenomenon in which molecules from a gas or liquid adhere to the surface of a solid (in contrast to absorption, where a substance penetrates into the bulk volume of another phase). The solid providing the surface (e.g., activated carbon) is the adsorbent, and the pollutant molecule being attached to the surface is the adsorbate."
        },
        {
          id: "q2",
          topic: "Activated Carbon • Surface Area",
          prompt: "What physical property of activated carbon enables a relatively small mass of it to capture large quantities of pollutants from air or water streams?",
          choices: [
            "Its high electrical conductivity attracts neutral pollutant molecules.",
            "Its highly porous internal structure provides an enormous surface area per unit mass (typically around 1,000 m²/g).",
            "It dissolves slowly into water to chemically neutralize dissolved contaminants.",
            "Its smooth, nonporous outer surface prevents pollutants from bouncing off."
          ],
          correctIndex: 1,
          instructorNote: "Because adsorption occurs at surfaces, capacity is closely tied to available surface area. Thermal or chemical activation creates a vast network of microscopic internal pores in carbon, yielding surface areas on the order of 500–1,500 m²/g (commonly ~1,000 m²/g)."
        },
        {
          id: "q3",
          topic: "Adsorption • Physisorption vs. Chemisorption",
          prompt: "How does physical adsorption differ from chemisorption?",
          choices: [
            "Physical adsorption relies on weak intermolecular (van der Waals) forces and is generally reversible, whereas chemisorption involves stronger chemical bonding with surface atoms and is typically irreversible.",
            "Physical adsorption occurs only in liquid streams, whereas chemisorption occurs only in gas streams.",
            "Physical adsorption permanently destroys the pollutant molecule, whereas chemisorption leaves it unchanged.",
            "Physical adsorption requires extremely high temperatures to occur, whereas chemisorption occurs only below freezing."
          ],
          correctIndex: 0,
          instructorNote: "Physical adsorption (physisorption) is driven by weak van der Waals forces, allowing adsorbed species to be released (desorbed) relatively easily by raising temperature or lowering pressure. Chemisorption involves chemical reaction and electron sharing/transfer with surface sites, making it much stronger and generally irreversible."
        },
        {
          id: "q4",
          topic: "Water Treatment • Target Contaminants",
          prompt: "Because a pure activated carbon surface is predominantly nonpolar, which type of contaminant is activated carbon generally most effective at removing from water?",
          choices: [
            "Dissolved inorganic salts such as sodium chloride (NaCl)",
            "Nonpolar organic compounds such as industrial solvents, pesticides, and odor-causing organics",
            "Pure water molecules",
            "Positively charged metal ions such as sodium (Na⁺)"
          ],
          correctIndex: 1,
          instructorNote: "Adsorption follows the general principle of \"like adsorbs like.\" Because activated carbon has a largely nonpolar surface, it has a strong affinity for nonpolar and weakly polar organic molecules, whereas it is a poor adsorbent for highly polar inorganic electrolytes such as NaCl or simple metal ions like Na⁺."
        },
        {
          id: "q5",
          topic: "Operation • Regeneration",
          prompt: "Once an activated carbon bed becomes saturated with captured pollutants, what is the process of releasing the adsorbed molecules from the carbon surface so the carbon can be reused called?",
          choices: [
            "Coagulation",
            "Sedimentation",
            "Desorption (regeneration)",
            "Filtration"
          ],
          correctIndex: 2,
          instructorNote: "Desorption is the reverse of adsorption—removing adsorbed molecules from the adsorbent surface (for example, via steam stripping, solvent extraction, or thermal treatment) to regenerate the carbon's adsorptive capacity."
        }
      ]
    },
    {
      id: "2026-11-29-intermediate",
      weekLabel: "Week 02",
      weekDate: "2026-11-29",
      category: "intermediate",
      title: "Activated Carbon Adsorption: Design Calculations",
      questions: [
        {
          id: "q1",
          topic: "Air Pollution Control • Carbon Mass",
          prompt: "An industrial drying unit emits 4.5 kg/hr of an organic solvent vapor into an exhaust air stream. A granular activated carbon (GAC) adsorber treats this stream continuously for an 8-hour work shift before being taken offline for regeneration. If the carbon has an effective working adsorption capacity of 15% by weight (0.15 kg of solvent per 1 kg of carbon), what is the minimum mass of activated carbon required in the bed for one 8-hour shift?",
          choices: [
            "5.4 kg",
            "30 kg",
            "240 kg",
            "540 kg"
          ],
          correctIndex: 2,
          instructorNote: "1. Total solvent emitted over the 8-hour shift:\nTotal solvent mass = 4.5 kg/hr × 8 hr = 36 kg\n2. Divide by the working adsorption capacity (0.15 kg solvent / kg carbon):\nRequired carbon mass = 36 kg ÷ 0.15 = 240 kg\n(Common pitfalls: forgetting to multiply by the 8-hour shift gives 30 kg; multiplying instead of dividing by 0.15 gives 5.4 kg.)"
        },
        {
          id: "q2",
          topic: "Water Treatment • GAC Bed Depth",
          prompt: "A fixed-bed GAC column for wastewater treatment requires 2,400 kg of carbon with a bulk (bed) density of 480 kg/m³. The column must treat a steady wastewater flow rate of 24 m³/hr at a design superficial linear velocity (hydraulic loading) of 0.20 m/min. What is the required depth (height) of the carbon bed?",
          choices: [
            "0.042 m",
            "2.5 m",
            "5.0 m",
            "10.0 m"
          ],
          correctIndex: 1,
          instructorNote: "1. Carbon bed volume: V = Mass ÷ Bulk density = 2,400 kg ÷ 480 kg/m³ = 5.0 m³\n2. Convert flow rate to match the velocity units: Q = 24 m³/hr ÷ 60 min/hr = 0.40 m³/min\n3. Bed cross-sectional area: A = Q ÷ vₛ = 0.40 m³/min ÷ 0.20 m/min = 2.0 m²\n4. Bed depth: H = V ÷ A = 5.0 m³ ÷ 2.0 m² = 2.5 m\n(Common pitfall: failing to convert hours to minutes gives an area of 120 m² and an unrealistically shallow bed depth of 0.042 m.)"
        },
        {
          id: "q3",
          topic: "Water Treatment • Residence Time",
          prompt: "A GAC column has an empty-bed volume of 12 m³ and treats wastewater at a steady flow rate of 0.40 m³/min. If the void space between the carbon granules (packed-bed porosity) accounts for 40% of the total bed volume, what is the actual hydraulic residence time of the liquid passing through the carbon bed?",
          choices: [
            "12 minutes",
            "18 minutes",
            "30 minutes",
            "75 minutes"
          ],
          correctIndex: 0,
          instructorNote: "• Empty-Bed Contact Time (EBCT) uses the total empty volume of the bed:\nEBCT = V_bed ÷ Q = 12 m³ ÷ 0.40 m³/min = 30 min\n• The actual hydraulic residence time (τ) depends on the volume actually occupied by liquid (void space, ε = 0.40):\nV_liquid = ε × V_bed = 0.40 × 12 m³ = 4.8 m³\nτ = V_liquid ÷ Q = 4.8 m³ ÷ 0.40 m³/min = 12 min\n(Equivalently, τ = EBCT × ε = 30 × 0.40 = 12 min.)\n(Common pitfalls: reporting the EBCT of 30 min instead of the actual residence time, or multiplying by the solid fraction 1 − 0.40 = 0.60, giving 18 min.)"
        },
        {
          id: "q4",
          topic: "Operation • Makeup Carbon",
          prompt: "A wastewater treatment facility maintains a constant operating inventory of 20,000 kg of granular activated carbon. The entire inventory undergoes thermal regeneration once per month (12 cycles per year), with a 6% carbon loss per cycle due to burn-off and mechanical attrition. Fresh makeup carbon is added after each cycle to restore the bed to its full 20,000 kg inventory. How much total makeup carbon must be purchased per year?",
          choices: [
            "1,200 kg",
            "10,480 kg",
            "14,400 kg",
            "20,000 kg"
          ],
          correctIndex: 2,
          instructorNote: "Because fresh makeup carbon is added after every cycle to maintain a constant 20,000 kg inventory, each monthly cycle loses 6% of 20,000 kg:\nLoss per cycle = 20,000 kg × 0.06 = 1,200 kg/cycle\nOver 12 monthly cycles:\nAnnual makeup carbon = 1,200 kg/cycle × 12 cycles/yr = 14,400 kg/yr\n(Common pitfalls: calculating only one cycle's loss gives 1,200 kg; applying exponential decay, 20,000 × (1 − 0.94¹²) ≈ 10,480 kg, would only apply if the inventory were allowed to shrink without replenishment.)"
        },
        {
          id: "q5",
          topic: "Carbon Selection • Characterization",
          prompt: "An environmental engineer is selecting an activated carbon specifically to decolorize textile-dyeing wastewater containing large, high-molecular-weight organic dye molecules. Which standard carbon characterization parameter is the most appropriate primary indicator of a carbon's capacity for these large molecules?",
          choices: [
            "Iodine number, because it specifically measures the volume of large pores available for high-molecular-weight compounds.",
            "Molasses number (or molasses decolorizing index), because it correlates with the larger pore structure required to adsorb high-molecular-weight substances.",
            "Abrasion number, because it measures the chemical attraction between organic dyes and the carbon surface.",
            "Apparent density, because denser carbon grades always possess larger pores for dye removal."
          ],
          correctIndex: 1,
          instructorNote: "Different characterization indices probe different pore-size regimes. The iodine number uses small iodine molecules and correlates with microporosity and the capacity to adsorb low-molecular-weight organics. By contrast, the molasses number (or molasses decolorizing index) uses larger color bodies and correlates with the larger pores (mesopores/macropores) needed to accommodate high-molecular-weight molecules such as textile dyes. The abrasion number measures mechanical durability against attrition, not chemical affinity."
        }
      ]
    },
    {
      id: "2026-11-29-hard",
      weekLabel: "Week 02",
      weekDate: "2026-11-29",
      category: "hard",
      title: "Activated Carbon Adsorption: Real-World Applications",
      questions: [
        {
          id: "q1",
          topic: "Thermodynamics • Inlet Gas Cooling",
          prompt: "A manufacturing facility plans to route a hot drying-oven exhaust stream (85 °C) containing volatile organic solvent vapors directly into a fixed-bed GAC adsorber. Why is it critical to cool the exhaust gas (typically below ~40 °C) before it enters the carbon bed?",
          choices: [
            "Physical adsorption is endothermic, so cooler gas supplies the thermal energy required for solvent molecules to attach to the carbon.",
            "Physical adsorption is exothermic; elevated inlet temperatures reduce equilibrium adsorption capacity, and the heat of adsorption released inside the bed can further raise bed temperatures—degrading capture efficiency and creating potential hot-spot or fire hazards.",
            "Above 40 °C, activated carbon immediately undergoes complete thermal gasification into carbon dioxide.",
            "Cooling the gas increases its volumetric flow rate, which lowers pressure drop across the packed bed."
          ],
          correctIndex: 1,
          instructorNote: "Physical adsorption releases heat (\"heat of adsorption,\" similar in magnitude to heat of condensation/liquefaction). By thermodynamic equilibrium (Le Chatelier's principle), increasing temperature shifts equilibrium toward desorption, sharply reducing adsorption capacity. In addition, if an already hot gas stream enters a bed adsorbing oxidizable organic vapors, the added heat of adsorption can cause localized overheating (\"hot spots\") or bed fires."
        },
        {
          id: "q2",
          topic: "Process Design • Countercurrent / Lead-Lag",
          prompt: "In continuous industrial wastewater treatment, why do engineers frequently operate granular activated carbon in a countercurrent (moving/pulsed bed) or lead-lag series column configuration rather than relying on a single fixed-bed column?",
          choices: [
            "To ensure that the highest-concentration influent contacts the nearly exhausted carbon (maximizing its saturation loading), while the lowest-concentration effluent contacts fresh virgin carbon just before discharge.",
            "To eliminate the need for backwashing whenever suspended solids are present in the influent stream.",
            "To prevent a mass transfer zone (wave front) from forming inside the carbon bed.",
            "To convert physical adsorption into irreversible chemisorption so that carbon regeneration is no longer required."
          ],
          correctIndex: 0,
          instructorNote: "In a single fixed bed, the column must be taken offline as soon as the mass transfer zone (wave front) reaches the outlet and effluent concentration exceeds the limit, leaving the carbon inside the wave front only partially utilized. Countercurrent (moving/pulsed) beds and lead-lag series columns overcome this by exposing nearly spent carbon to the strongest influent (pushing it to full equilibrium capacity) while using fresh carbon as a polishing zone to achieve very low effluent concentrations."
        },
        {
          id: "q3",
          topic: "Solvent Recovery • Downstream Separation",
          prompt: "In a dual-bed vapor-phase solvent recovery system, low-pressure steam is passed through a saturated carbon bed to desorb the captured organic solvent, and the resulting steam–solvent vapor mixture is cooled in a condenser. How does the chemical nature of the solvent determine the separation equipment needed downstream of the condenser?",
          choices: [
            "Water-insoluble solvents separate into a distinct liquid layer and can be recovered by simple gravity decantation, whereas water-miscible solvents form a single homogeneous aqueous solution and require distillation.",
            "Water-miscible solvents separate automatically by gravity in a decanter, whereas water-insoluble solvents require multi-stage distillation.",
            "Both water-miscible and water-insoluble solvents are separated identically using a rapid sand filter downstream of the condenser.",
            "Steam desorption cannot be used for water-insoluble solvents because steam only desorbs polar molecules."
          ],
          correctIndex: 0,
          instructorNote: "Condensing the steam–solvent vapor mixture produces both liquid water and liquid solvent. If the solvent is immiscible with water (e.g., perchloroethylene or toluene), it forms two distinct liquid phases that separate easily by density in a decanter. If the solvent is water-miscible (e.g., acetone or methanol), it dissolves into the steam condensate, requiring distillation (with higher capital and energy costs) to recover pure solvent."
        },
        {
          id: "q4",
          topic: "Thermal Reactivation • Furnace Control",
          prompt: "When spent GAC from a wastewater treatment plant is thermally reactivated at 800–900 °C in a rotary kiln or multiple-hearth furnace, why is the free oxygen concentration inside the furnace tightly restricted (typically below 1%) and an afterburner or air scrubber installed on the furnace exhaust?",
          choices: [
            "Low oxygen prevents excessive oxidation (\"overburning\") of the carbon skeleton itself while enabling selective volatilization and removal of adsorbed organics; the afterburner/scrubber destroys volatilized contaminants so water pollution is not simply transferred into air pollution.",
            "Low oxygen cools the furnace to keep the carbon granules from melting, while the scrubber recovers liquid wastewater for direct reuse.",
            "Restricting oxygen converts the carbon surface into polar silica gel, while the afterburner cools the exhaust gas before venting.",
            "High oxygen levels cause adsorbed organic pollutants to bond permanently to the carbon surface via chemisorption."
          ],
          correctIndex: 0,
          instructorNote: "At reactivation temperatures (800–900 °C), excess free oxygen would aggressively burn away the activated carbon itself (\"overburning\"), causing severe carbon losses. Maintaining a low-oxygen atmosphere (typically <1% O₂, using steam and/or CO₂) selectively volatilizes and gasifies the adsorbed organics while preserving most of the carbon structure (limiting loss to ~5–10% per cycle). Because thermal reactivation drives hazardous organics into the gas phase, an afterburner and/or scrubber is essential to prevent cross-media pollution transfer from water to air."
        },
        {
          id: "q5",
          topic: "Drinking Water • PAC vs. GAC",
          prompt: "A municipal drinking water plant normally experiences low raw-water organic levels year-round, except during brief 3-week summer algae blooms that cause severe taste-and-odor problems. Why is dosing Powdered Activated Carbon (PAC) ahead of filtration typically favored over installing a permanent Granular Activated Carbon (GAC) post-filtration contactor with on-site thermal regeneration, and what key operational constraint must engineers manage when feeding PAC upstream of a filter?",
          choices: [
            "PAC requires much lower capital investment and provides operational flexibility for intermittent, once-through use, but excessive PAC dosages can cause rapid filter head-loss buildup or breakthrough of fine carbon particles into the finished water.",
            "PAC is easier to thermally regenerate on-site than GAC, but it cannot remove taste-and-odor compounds without high-pressure steam.",
            "PAC provides longer contact time than a dedicated GAC column, but it raises the water's pH to corrosive levels.",
            "GAC is incapable of adsorbing seasonal organic compounds, whereas PAC must be heated above 80 °C to remain suspended in water."
          ],
          correctIndex: 0,
          instructorNote: "GAC contactors with on-site thermal regeneration involve high capital costs and are typically economical only for continuous, high-usage applications. For brief, seasonal taste-and-odor episodes, PAC can be dosed intermittently on a once-through basis with minimal capital expenditure. However, when PAC is applied ahead of rapid sand or mixed-media filters, operators must carefully limit dosage (and often use a small polyelectrolyte dose with mixed-media filtration) to prevent excessive head-loss buildup and avoid carbon-fines breakthrough into the distribution system."
        }
      ]
    }
  ]
};
