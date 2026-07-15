import type { DeepDiveSlide } from "../types";

export const aldDeepDive: DeepDiveSlide[] = [
  {
    type: "content",
    title: "1. What Is Atomic Layer Deposition (ALD)?",
    subtitle: "Precision at the atomic scale",
    bullets: [
      {
        label: "Atomic Precision",
        text: "ALD is a thin-film coating technique used to deposit extremely thin, uniform, and precise layers of material on a surface, exactly one atomic layer at a time."
      },
      {
        label: "The Uniformity Problem",
        text: "Conventional methods (spraying or evaporating) produce uneven coverage: thicker in some regions, uncovered in others, especially on textured surfaces."
      },
      {
        label: "The Solution",
        text: "ALD solves this by using self-limiting chemical reactions, allowing near-atomic control over film thickness and uniformity regardless of the surface geometry."
      }
    ]
  },
  {
    type: "visual",
    title: "2. How ALD Works: The Cycle",
    subtitle: "TMA + H₂O Self-Limiting Reactions",
    visual: "aldCycle",
    caption: "Step 1: TMA attaches to surface sites until full. Step 2: Purge. Step 3: H₂O reacts with TMA to form one layer of Al₂O₃. Step 4: Purge. Repeat."
  },
  {
    type: "content",
    title: "3. The Magic of Self-Limiting Reactions",
    subtitle: "Why ALD is perfectly uniform",
    bullets: [
      {
        label: "Self-Limiting Behavior",
        text: "TMA molecules react only with available reactive sites (like hydroxyl groups) on the surface. Once every site is occupied, no further TMA can attach."
      },
      {
        label: "Independent of Precursor Amount",
        text: "Because it self-limits, the total film thickness depends primarily on the number of cycles, not on how much precursor gas is pumped in."
      },
      {
        label: "Cycle Calculation",
        text: "Each cycle deposits ~0.1 nm. To reach a target thickness of 10 nm, the process is simply repeated 100 times."
      }
    ]
  },
  {
    type: "content",
    title: "4. ALD on Textured Surfaces",
    subtitle: "Coating the pyramids",
    bullets: [
      {
        label: "The Challenge",
        text: "Crystalline silicon solar cells have microscopic pyramids to reduce reflection. Conventional methods leave thinner coatings in the valleys."
      },
      {
        label: "Excellent Conformality",
        text: "ALD coats the entire surface — including sides, deep valleys, and sharp corners — with an almost identical thickness."
      },
      {
        label: "Why It Matters",
        text: "Every exposed silicon atom is a potential defect. Perfect conformality means every dangling bond on the textured surface gets passivated."
      }
    ]
  },
  {
    type: "content",
    title: "5. Why Is ALD Used?",
    subtitle: "The problem of surface recombination",
    bullets: [
      {
        label: "Dangling Bonds",
        text: "Inside a crystal, silicon atoms bond to 4 neighbors. At the surface, atoms lose neighbors, leaving unfinished 'dangling bonds'."
      },
      {
        label: "Energy Traps",
        text: "Dangling bonds create allowed energy states inside the band gap, acting as traps for electrons and holes."
      },
      {
        label: "Surface Recombination",
        text: "When an electron and hole meet at a trap, they recombine and are lost as heat instead of becoming usable current. ALD stops this."
      }
    ]
  },
  {
    type: "content",
    title: "6. Mechanism 1: Chemical Passivation",
    subtitle: "Neutralizing the traps",
    bullets: [
      {
        label: "Bonding to the Surface",
        text: "The Al₂O₃ layer deposited by ALD bonds directly to the silicon surface, physically satisfying the dangling bonds."
      },
      {
        label: "Eliminating Traps",
        text: "Once a dangling bond is connected to oxygen or aluminum, the associated energy trap disappears from the band gap."
      },
      {
        label: "The Result",
        text: "Fewer carriers are lost to recombination at the surface, significantly improving the cell's voltage and current."
      }
    ]
  },
  {
    type: "visual",
    title: "7. Mechanism 2: Field-Effect Passivation",
    subtitle: "Repelling electrons electrostatically",
    visual: "aldFieldEffect",
    caption: "Al₂O₃ naturally contains a high density of negative fixed charges. These repel free electrons, keeping them away from the surface defects."
  },
  {
    type: "split",
    title: "8. What Happens If ALD Is Not Used?",
    subtitle: "The consequences of poor passivation",
    left: "No Passivation Layer At All:\nMany dangling bonds remain. High surface recombination occurs. Voltage and current drop. More energy is released as heat instead of electricity.",
    right: "Using an Alternative Method (like PECVD or Sputtering):\nOften cheaper and faster, but produces less uniform coverage on complex textures, higher defect density, and lower passivation quality for high-efficiency cells."
  },
  {
    type: "content",
    title: "9. Why Al₂O₃ Specifically?",
    subtitle: "The champion of p-type passivation",
    bullets: [
      {
        label: "Excellent Chemical Passivation",
        text: "It bonds incredibly well to the silicon surface, neutralizing a large portion of the physical defects."
      },
      {
        label: "Strong Field-Effect Passivation",
        text: "Unlike many other materials, Al₂O₃ has a large density of negative fixed charge, making it perfect for repelling electrons on p-type silicon."
      },
      {
        label: "It Doesn't Generate Electrons",
        text: "ALD does not create additional electrons; it simply prevents the carriers generated by sunlight from being lost before collection."
      }
    ]
  },
  {
    type: "split",
    title: "10. Comparing Passivation Materials",
    subtitle: "Why not use SiO₂ or TiO₂?",
    left: "Al₂O₃ (Aluminum Oxide):\nExcellent chemical passivation. Outstanding negative field-effect passivation. The industry standard for p-type rear surfaces.\n\nSiO₂ (Silicon Dioxide):\nExcellent chemical passivation, but weak field-effect passivation (fewer fixed charges).",
    right: "Si₃N₄ (Silicon Nitride):\nHas positive fixed charges, so it's great for n-type surfaces but poor for p-type.\n\nTiO₂ & HfO₂:\nTiO₂ has weaker passivation. HfO₂ is a high-k dielectric used in microchips, but it's too expensive and unnecessary for solar cells."
  },
  {
    type: "content",
    title: "11. Why Isn't ALD Used Everywhere?",
    subtitle: "The speed and cost trade-off",
    bullets: [
      {
        label: "ALD is Slow",
        text: "Because it deposits only one atomic layer per cycle (~0.1 nm), a 20 nm layer requires 200 full precursor-purge cycles."
      },
      {
        label: "Throughput Sensitivity",
        text: "A factory producing thousands of wafers per hour is highly sensitive to throughput. ALD equipment is expensive and can become a bottleneck."
      },
      {
        label: "The Industrial Compromise",
        text: "Manufacturers balance the efficiency gain from ALD against the equipment cost and production speed."
      }
    ]
  },
  {
    type: "content",
    title: "12. What the Solar Industry Typically Does",
    subtitle: "Layer Stacking",
    bullets: [
      {
        label: "The Stack Strategy",
        text: "Modern high-efficiency cells use a stack: Silicon → ALD Al₂O₃ → PECVD Si₃N₄."
      },
      {
        label: "Role of Al₂O₃",
        text: "The ultra-thin ALD layer provides the premium chemical and field-effect passivation."
      },
      {
        label: "Role of Si₃N₄",
        text: "The thicker PECVD layer protects the delicate Al₂O₃, supplies hydrogen to further improve passivation during firing, and provides optical benefits."
      }
    ]
  },
  {
    type: "content",
    title: "13. How Thick Should the Al₂O₃ Layer Be?",
    subtitle: "Optimizing the nanometers",
    bullets: [
      {
        label: "If Too Thin (1-3 nm)",
        text: "The coating may not fully cover the textured surface, leaving dangling bonds exposed. The negative fixed charge is also too weak."
      },
      {
        label: "If Too Thick (>30 nm)",
        text: "Once every bond is passivated, adding more Al₂O₃ provides zero extra electrical benefit."
      },
      {
        label: "The Drawbacks of Thick Layers",
        text: "Thick layers take too long to deposit (costly), consume more expensive precursors, introduce mechanical stress, and make contact formation (lasers) harder."
      }
    ]
  },
  {
    type: "content",
    title: "14. The 5-15nm Sweet Spot",
    subtitle: "Why 10nm is often ideal",
    bullets: [
      {
        label: "Rapid Improvement, Then Plateau",
        text: "Passivation jumps dramatically from 0nm to 5nm. By 10nm, passivation is excellent. By 20nm, performance is essentially unchanged."
      },
      {
        label: "Engineering Choice",
        text: "Engineers select a thickness near the point where performance has already saturated (8-12 nm) to minimize cost while maximizing output."
      },
      {
        label: "Why Not 1 Atomic Layer?",
        text: "A single layer (0.1 nm) cannot form a continuous film over a rough surface and doesn't hold enough charge for the field effect."
      }
    ]
  },
  {
    type: "stats",
    title: "15. Process Parameters & SPC",
    subtitle: "Industrial specs for ALD",
    stats: [
      { label: "Cycle Thickness", value: "~0.1 nm/cycle" },
      { label: "Target Thickness", value: "5-15 nm" },
      { label: "Precursor 1", value: "TMA (Aluminum)" },
      { label: "Precursor 2", value: "H₂O (Oxygen)" },
    ],
    callout: {
      label: "Cycle Control",
      text: "To hit a 10nm target, the tool simply repeats the [TMA → Purge → H₂O → Purge] sequence exactly 100 times."
    }
  },
  {
    type: "content",
    title: "TMA Fire Hazard",
    subtitle: "Handling the Pyrophoric Precursor",
    bullets: [
      {
        label: "TMA is Pyrophoric",
        text: "Trimethylaluminium (TMA, Al(CH₃)₃) ignites spontaneously on contact with air — no spark or ignition source is needed. Even a very small amount of TMA leaking into air will immediately catch fire. This makes TMA one of the most hazardous chemicals in the entire TOPCon manufacturing process."
      },
      {
        label: "Violent Reaction with Water — Never Use Water",
        text: "TMA reacts violently — even explosively — with water, generating methane gas and intense heat. Using water to fight a TMA fire causes an explosion that spreads the fire. Fire extinguishers near the ALD tool must use vermiculite (a dry mineral that smothers the flame by excluding oxygen) or approved dry chemical agents. Water extinguishers must not be present near the ALD tool."
      },
      {
        label: "Required Safety Measures",
        text: "Sealed, dedicated gas delivery with continuous TMA pressure monitoring and automatic shutoff on any deviation. Vermiculite absorber and approved extinguishers must be physically present at the ALD tool at all times. Only certified operators may work with TMA. On a gas-detector alarm, the area must be evacuated immediately — do not enter to investigate. TMA/H₂O pressure alarms are treated as emergency events."
      }
    ]
  },
  {
    type: "content",
    title: "The Blue Film Test & Graphite Frame Issues",
    subtitle: "Shift-by-Shift Quality Checks",
    bullets: [
      {
        label: "The Blue Film Test",
        text: "The thin Al₂O₃ film deposited by ALD shows a characteristic blue interference colour when viewed under normal light. Operators visually check this blue colour and its uniformity across the wafer at each shift. A uniform blue across the full wafer confirms a healthy, even deposition."
      },
      {
        label: "What Non-Uniform Blue Means",
        text: "A patchy, mismatched, or non-uniform blue colour immediately flags a problem in the ALD chamber — typically airflow irregularity, chamber pressure deviation, carrier plate issues, or a precursor delivery problem. This visual check is performed before releasing production wafers to the next step. Any abnormal blue film must be investigated and resolved before production resumes."
      },
      {
        label: "Graphite Frame Jamming",
        text: "Wafers travel through the ALD tool on graphite carrier frames. These frames deform over time from repeated thermal cycling; their guide rails wear down; mounting screws loosen; drive belts break. Any of these causes the frame to jam inside the chamber, breaking wafers and stopping the line. Al₂O₃ also builds up on the graphite frame surface with every production batch — scheduled frame cleaning is required to prevent this buildup from altering the frame geometry enough to cause jamming."
      }
    ]
  },
  {
    type: "table",
    title: "ALD Process Parameter Reference",
    subtitle: "Al₂O₃ Deposition Industrial Specifications",
    headers: ["Parameter", "Value / Range", "Why It Matters"],
    rows: [
      ["Precursor 1 (Al source)", "TMA — Trimethylaluminium Al(CH₃)₃", "Self-limiting: reacts with Si-OH groups; each dose covers exactly one monolayer"],
      ["Precursor 2 (O source)", "H₂O — Deionised water vapour", "Reacts with Al-CH₃ to form Al-OH; releases methane (CH₄) as byproduct"],
      ["Deposition temperature", "150–250 °C", "Too low → incomplete TMA reaction (poor film quality); too high → TMA decomposition (CVD-like growth, loses self-limiting)"],
      ["Growth rate per cycle", "~0.1 nm/cycle (0.96–1.0 Å)", "Fixed by self-limiting chemistry; independent of precursor dose above saturation"],
      ["Target thickness", "5–15 nm (typically 8–10 nm)", "< 5 nm → poor coverage in pyramid valleys; > 15 nm → no additional passivation gain"],
      ["Number of cycles (for 10 nm)", "~100 cycles", "Each cycle: TMA pulse → N₂ purge → H₂O pulse → N₂ purge"],
      ["Purge time (between pulses)", "Critical — must be complete", "Incomplete purge → TMA meets H₂O in gas phase → CVD-mode → non-uniform, rough film"],
      ["Fixed negative charge density", "~10¹² cm⁻²", "Provides field-effect passivation for p-type emitter; created during film formation"],
      ["Interface defect density (Dit)", "< 10¹¹ cm⁻²eV⁻¹", "After annealing; lower = better chemical passivation = lower surface recombination velocity"],
      ["Surface recombination velocity", "< 5–10 cm/s (passivated)", "Unpassivated Si: > 10,000 cm/s; ALD Al₂O₃ achieves near-theoretical minimum"],
      ["Graphite frame replacement", "Per buildup schedule", "Al₂O₃ accumulation changes frame geometry → wafer misalignment → jamming"],
      ["Visual check frequency", "Every shift", "Blue film colour and uniformity is rapid pass/fail indicator before releasing to PECVD"],
    ],
  },
  {
    type: "content",
    title: "Field-Effect Passivation — Atomic-Level Detail",
    subtitle: "Why Negative Charge Reduces Recombination",
    bullets: [
      {
        label: "Source of Negative Fixed Charge in Al₂O₃",
        text: "During ALD deposition, Al atoms are in 3+ oxidation state and oxygen atoms are in 2- state. At the Al₂O₃/silicon interface, there is a slight excess of oxygen atoms (O²⁻) relative to aluminium — this oxygen excess creates negative fixed charges (~ −10¹² cm⁻²). These charges are permanently fixed in the film (not mobile like trap states) and cannot be neutralised by applying voltage. Density can be controlled by ALD conditions: deposition at 150°C gives higher negative charge than at 250°C because lower temperature gives less crystalline, more oxygen-rich Al₂O₃."
      },
      {
        label: "How Negative Charge Passivates the Boron Emitter",
        text: "The boron emitter is p-type — its majority carriers are holes. The negative fixed charge in Al₂O₃ creates an electric field pointing away from the silicon (toward the Al₂O₃). This field repels electrons (minority carriers) away from the surface — exactly where the defect traps are. With fewer electrons near the surface, the probability of electron-hole recombination at surface traps drops dramatically. The concentration of minority carriers (electrons) near the surface is reduced by exp(qV_field/kT) — potentially by several orders of magnitude."
      },
      {
        label: "Why SiNx Cannot Replace Al₂O₃ on the p-Type Emitter",
        text: "SiNx (silicon nitride) deposited by PECVD contains positive fixed charges (+10¹²–10¹³ cm⁻²). These positive charges attract electrons to the surface — the opposite of what we need. Electrons accumulate at the Si-SiNx interface, increasing recombination. For n-type surfaces (like the rear of some PERC cells), positive charge from SiNx is beneficial — it repels holes. For p-type emitters (front of TOPCon), only negative-charge materials (Al₂O₃) provide field-effect passivation. This is the fundamental reason ALD Al₂O₃ is used on the front emitter while SiNx is reserved for n-type surfaces and for the ARC function."
      },
      {
        label: "Synergy: Chemical + Field-Effect Together",
        text: "World-record low surface recombination velocities (< 1 cm/s) require both mechanisms working together. Al₂O₃ provides excellent chemical passivation (bonding to dangling bonds: Al–O–Si bonds form with Dit < 10¹¹ cm⁻²eV⁻¹) AND strong field-effect passivation (−10¹² cm⁻² negative charge). PECVD SiNx on top provides: hydrogen to further improve interface quality during firing, mechanical protection for the Al₂O₃, and the ARC optical function. The stack exploits each material's unique strength. No single material can simultaneously achieve all four functions at current commercial cost and throughput."
      }
    ]
  },
  {
    type: "faq",
    title: "Frequently Asked Questions",
    subtitle: "Interview Preparation & Technical Deep Dive",
    questions: [
      {
        q: "What makes ALD unique compared to CVD or PVD for depositing Al₂O₃?",
        a: "CVD deposits films by continuously flowing reactive precursors simultaneously — growth rate depends on temperature, flow, and time; uniformity on complex surfaces is limited because local depletion of precursors occurs near the surface. PVD (sputtering/evaporation) deposits line-of-sight — pyramid valleys and overhangs receive thinner coatings. ALD uses sequential, self-limiting reactions: precursor A saturates all surface sites (then purge), then precursor B reacts only with the chemisorbed A (then purge). No simultaneous gas-phase reaction. Thickness is determined only by cycle count. Conformality is near-perfect (typically >99%) because each cycle reacts with the surface uniformly regardless of geometry. For 1–5 µm silicon pyramids with aspect ratios up to 1:1, ALD covers every atom including the deepest valleys."
      },
      {
        q: "How does the Al₂O₃ activation anneal work and why is it necessary?",
        a: "As-deposited ALD Al₂O₃ (without annealing) has relatively few activated negative fixed charges — the as-deposited film is somewhat hydrogen-rich and structurally amorphous with many OH groups that partially neutralise the negative charge. An anneal at 350–450°C (or the PECVD firing step at ~780°C) releases excess hydrogen from the film and from the Si/Al₂O₃ interface. This: (1) crystallises the amorphous Al₂O₃ partially, increasing charge density; (2) allows interstitial hydrogen from the SiNx overlayer to diffuse to the Si/Al₂O₃ interface and further passivate remaining dangling bonds; (3) densifies the film, improving its mechanical stability. Post-anneal, the fixed charge density doubles or triples compared to the as-deposited state and surface recombination velocity drops by up to 10×."
      },
      {
        q: "Why is TMA pyrophoric and how is it handled safely in the factory?",
        a: "TMA (Al(CH₃)₃) contains three Al–C bonds. When TMA contacts O₂ in air, rapid oxidation of both the aluminium center and the methyl groups occurs: 4 Al(CH₃)₃ + 18 O₂ → 2 Al₂O₃ + 12 CO₂ + 18 H₂O. This reaction is highly exothermic (ΔH ≈ −1100 kJ/mol) and proceeds without any initiation energy — hence pyrophoric. Even trace TMA in warm air ignites. Water makes it worse: TMA + 3H₂O → Al(OH)₃ + 3 CH₄; the CH₄ generated can then burn. Safety protocols: sealed stainless steel delivery lines (zero joints in occupied areas), continuous TMA gas detector with auto-shutoff at alarm, vermiculite (not water or CO₂) for fire suppression, only certified operators, evacuation on any gas alarm before investigation."
      },
      {
        q: "What determines the optimal Al₂O₃ thickness for TOPCon front passivation?",
        a: "Below 5 nm: (1) surface coverage on textured pyramids is incomplete — some Si dangling bonds are not covered; (2) the fixed charge layer is too thin to create adequate electric field; (3) the film has pinholes where two adjacent cycles don't fully merge. Above 15 nm: (1) passivation saturates — no measurable improvement above ~10 nm for both chemical and field-effect mechanisms; (2) deposition time increases (ALD is slow); (3) mechanical stress in the film increases, risking delamination during firing. The 8–10 nm sweet spot gives near-maximum passivation quality at minimum deposition time. Some leading-edge fabs use 7 nm to increase throughput, accepting marginally higher surface recombination velocity (< 3 cm/s vs < 1 cm/s at 12 nm)."
      },
      {
        q: "How does the 'blue film' colour confirm ALD quality and what does non-uniform colour indicate?",
        a: "The ~8–10 nm Al₂O₃ film creates a characteristic blue interference colour (same physics as a soap bubble or oil film). Blue is visible because: the Al₂O₃ thickness (n × d ≈ 1.66 × 9 nm ≈ 15 nm optical path) causes constructive interference at ~450 nm (blue) and destructive interference at other wavelengths. A uniform, consistent blue across the wafer confirms: (1) uniform thickness within ±1 nm; (2) uniform refractive index (correct film composition); (3) complete surface coverage. Non-uniform blue (patches, streaks, lighter/darker regions) means: thickness variation within the batch (different cycle counts in different positions → chamber non-uniformity), composition variation (TMA or H₂O delivery anomaly), or incomplete coverage (graphite frame shadowing wafer edges)."
      }
    ]
  }
];
