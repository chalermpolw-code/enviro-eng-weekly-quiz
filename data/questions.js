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
    /* ================= Week 1 · 22 Nov 2026 · Nitrogen Oxides (NOₓ) Formation and Control ================= */
    {
      id: "2026-11-22-easy",
      weekLabel: "Week 1",
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
      weekLabel: "Week 1",
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
      weekLabel: "Week 1",
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
    }
  ]
};
