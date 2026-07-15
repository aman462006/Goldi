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
  }
];
