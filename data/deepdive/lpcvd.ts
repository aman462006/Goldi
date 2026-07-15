import type { DeepDiveSlide } from "../types";

export const lpcvdDeepDive: DeepDiveSlide[] = [
  {
    type: "content",
    title: "1. What is LPCVD?",
    subtitle: "Low Pressure Chemical Vapor Deposition",
    bullets: [
      {
        label: "Low Pressure",
        text: "The process happens inside a vacuum chamber at a pressure well below atmospheric (~101,325 Pa). Lower pressure gives better gas distribution and fewer unwanted gas-phase reactions."
      },
      {
        label: "Chemical Vapor",
        text: "Gases carrying the required material (e.g., Silane SiH₄) are introduced into the chamber."
      },
      {
        label: "Deposition",
        text: "The gases react chemically on the wafer surface at 550-650°C to form an extremely thin, uniform solid layer (Poly-Si)."
      }
    ]
  },
  {
    type: "visual",
    title: "2. The LPCVD Furnace",
    subtitle: "How Poly-Si is grown step by step",
    visual: "furnace",
    caption: "Step 1: Load wafers in quartz boat. Step 2: Pump to low pressure. Step 3: Heat to ~600°C. Step 4: Flow SiH₄. Step 5: SiH₄ → Si + 2H₂. Step 6: Cool."
  },
  {
    type: "content",
    title: "3. Why Low Pressure & Why Poly-Si?",
    subtitle: "The benefits of LPCVD in TOPCon",
    bullets: [
      {
        label: "Why Low Pressure?",
        text: "It guarantees excellent thickness uniformity, high-quality films, and good conformal coating over textured pyramids."
      },
      {
        label: "Why Polycrystalline?",
        text: "TOPCon needs a highly doped, conductive layer above the tunnel oxide. Poly-Si conducts electrons efficiently, passivates the surface, and forms the carrier-selective contact."
      }
    ]
  },
  {
    type: "content",
    title: "4. Building the TOPCon Rear Structure",
    subtitle: "Layer by Layer Construction",
    bullets: [
      {
        label: "Step 1-3: Diffusion & Etch",
        text: "We start with an n-type wafer. Boron is diffused to make a P+ emitter on the front. The rear is etched clean."
      },
      {
        label: "Step 4: Tunnel Oxide",
        text: "An extremely thin oxide (~1.5nm) is thermally grown on the rear bare silicon."
      },
      {
        label: "Step 5-6: LPCVD & Doping",
        text: "LPCVD deposits Poly-Si on the oxide. POCl₃ diffusion then heavily dopes it with phosphorus (n⁺) to make it conductive."
      }
    ]
  },
  {
    type: "visual",
    title: "5. Layer Build Animation",
    subtitle: "Constructing the Rear Contact",
    visual: "layerBuild",
    caption: "We are not building a second wafer. The wafer is ~150µm thick, while the engineered Poly-Si layer is only ~150nm thick."
  },
  {
    type: "visual",
    title: "6. The Quantum Tunneling Barrier",
    subtitle: "Why doesn't the oxide block current?",
    visual: "tunneling",
    caption: "The oxide is 1.5nm thick (50,000x thinner than a hair). At this scale, electrons behave as waves and can quantum-tunnel through the barrier."
  },
  {
    type: "split",
    title: "7. Wafers: PERC vs TOPCon",
    subtitle: "Why start with an n-type wafer?",
    left: "PERC Cell:\nStarts with a p-type wafer. Phosphorus is diffused into the front to create the PN junction (n+ to p).\n\nTOPCon Cell:\nStarts with an n-type wafer (already doped throughout). Boron is diffused into the front to create the PN junction (p+ to n).",
    right: "The Key Insight:\nThe PN junction is already finished before LPCVD begins. Everything downstream (oxide, poly-Si, doping) is solely for building a better rear electrical contact, not another junction."
  },
  {
    type: "content",
    title: "8. Carrier-Selective Contacts",
    subtitle: "How are holes blocked?",
    bullets: [
      {
        label: "The Goal",
        text: "Sunlight creates an electron and a hole. The electric field pushes electrons rear, holes front. But some holes randomly diffuse to the rear anyway."
      },
      {
        label: "The Solution",
        text: "TOPCon stops holes using an energy barrier, not a physical wall. The combination of n-wafer + tunnel oxide + n⁺ poly creates an energy profile that favors electrons and disfavors holes."
      }
    ]
  },
  {
    type: "content",
    title: "9. What Do n and n⁺ Actually Mean?",
    subtitle: "Understanding heavy doping",
    bullets: [
      {
        label: "n-type vs n⁺",
        text: "Pure Si has 4 bonding electrons. Add a little phosphorus and it becomes n-type. Add much more and it becomes n⁺ (heavily doped). It does not mean positive charge."
      },
      {
        label: "Electrical Neutrality",
        text: "Every phosphorus atom donates one electron and becomes a fixed positive ion (P⁺). The region stays electrically neutral, so it doesn't repel incoming electrons."
      },
      {
        label: "Why not make the whole wafer n⁺?",
        text: "If the whole wafer were n⁺, recombination would skyrocket and sunlight-generated carriers wouldn't travel far. The wafer is kept n, and only the contact is n⁺."
      }
    ]
  },
  {
    type: "content",
    title: "10. The Hole Misconception",
    subtitle: "What is a hole, really?",
    bullets: [
      {
        label: "Not a positive particle",
        text: "A hole is not a positively charged particle floating through space. It is simply the absence of an electron in a silicon bond."
      },
      {
        label: "Apparent Motion",
        text: "When an electron from a neighboring bond moves into the empty spot, the electron moves one way, but it looks like the 'hole' moved the other way."
      },
      {
        label: "Why don't electrons instantly fill them?",
        text: "Electrons don't randomly rush toward holes. The energy bands must align properly for that transition to be permitted."
      }
    ]
  },
  {
    type: "content",
    title: "11. Band Alignment",
    subtitle: "Why can electrons tunnel but not holes?",
    bullets: [
      {
        label: "Different Mountains",
        text: "The oxide is an insulator. Electrons live in the conduction band (Ec); holes in the valence band (Ev). These bands don't line up perfectly across the oxide."
      },
      {
        label: "The Poly-Si Shift",
        text: "Heavy n⁺ doping in the poly-Si shifts the energy levels downward. This makes the electron barrier very small, while the hole barrier remains massive."
      }
    ]
  },
  {
    type: "visual",
    title: "12. The TOPCon Energy Band Diagram",
    subtitle: "Visualizing the barriers",
    visual: "bandDiagram",
    caption: "The Conduction Band (Ec) forms a small barrier that electrons easily cross. The Valence Band (Ev) forms a massive barrier that blocks holes."
  },
  {
    type: "content",
    title: "13. Why Not Skip the Tunnel Oxide?",
    subtitle: "The 'Passivated' in TOPCon",
    bullets: [
      {
        label: "Dangling Bonds",
        text: "Cutting a crystal into a wafer breaks bonds at the surface. These 'dangling bonds' act as defect traps where electrons and holes recombine."
      },
      {
        label: "Job 1: Passivation",
        text: "The ultra-thin SiO₂ chemically bonds with almost all dangling bonds, turning a broken Si bond into a Si-O bond. This drastically cuts recombination."
      },
      {
        label: "Job 2: Tunneling Barrier",
        text: "The oxide must remain incredibly thin (1.5nm) so electrons can still tunnel. This is why it's called a 'Tunnel Oxide Passivated Contact'."
      }
    ]
  },
  {
    type: "content",
    title: "14. Why is Poly-Si Needed?",
    subtitle: "Why not go Metal → Oxide → Silicon directly?",
    bullets: [
      {
        label: "Metal destroys passivation",
        text: "Metals contain enormous numbers of free electrons. Placed next to the ultra-thin oxide, electric fields become too strong and recombination spikes."
      },
      {
        label: "Poor chemical matching",
        text: "Metal isn't chemically matched to silicon. Inserting a silicon layer first ensures the transition is Silicon → Silicon (via Poly-Si)."
      }
    ]
  },
  {
    type: "content",
    title: "15. Where Recombination Hurts Most",
    subtitle: "Does recombination happen in Poly-Si too?",
    bullets: [
      {
        label: "Inside the Wafer",
        text: "Recombination here is extremely harmful — you lose current that was never collected."
      },
      {
        label: "Inside the Poly-Si",
        text: "Recombination here is much less harmful. The electron has effectively already been 'collected' once it crosses the tunnel oxide."
      },
      {
        label: "Silicon-to-Metal Contact",
        text: "Metal still touches silicon, but it's Poly-Si-to-Metal, not Crystalline-Si-to-Metal. We tolerate recombination in the heavily doped contact layer."
      }
    ]
  },
  {
    type: "visual",
    title: "16. Current Spreading",
    subtitle: "Funneling current to metal fingers",
    visual: "currentSpreading",
    caption: "Metal fingers have wide gaps. The Poly-Si forms a continuous conductive sheet, allowing electrons to travel sideways to reach the nearest metal contact."
  },
  {
    type: "split",
    title: "17. Tunnel Oxide Materials",
    subtitle: "Why SiO₂ is the perfect choice",
    left: "Why SiO₂ Specifically?\n1. Perfect Interface: It grows out of the silicon itself (Si + O₂ → SiO₂), leaving very few dangling bonds.\n2. Very Stable: Survives high temp (900°C+).\n3. Excellent Insulator: 9eV band gap blocks carriers well.",
    right: "Alternative Materials:\nAl₂O₃: Excellent passivation but poor tunneling probability.\nHfO₂: Poor interface, high recombination.\nTiO₂: Less stable, poorer interface.\nSiNx: Used as ARC, but terrible tunneling properties."
  },
  {
    type: "content",
    title: "18. Effect of Layer Thicknesses",
    subtitle: "Finding the Industrial Optimum",
    bullets: [
      {
        label: "Tunnel Oxide (~1.2-1.8 nm)",
        text: "Too thin: pinholes form, poor passivation. Too thick: electrons cannot tunnel, resistance spikes."
      },
      {
        label: "n⁺ Poly-Si (~100-200 nm)",
        text: "Too thin: high resistance, poor current spreading. Too thick: higher cost, more mechanical stress, longer deposition times."
      },
      {
        label: "Silicon Wafer (~120-170 µm)",
        text: "Too thin: fragile, lower infrared absorption. Too thick: expensive, more silicon waste."
      }
    ]
  },
  {
    type: "split",
    title: "19. Al₂O₃ vs SiO₂",
    subtitle: "Front vs Rear Passivation",
    left: "Rear (SiO₂ + n⁺ poly-Si)\nSolves the electrical contact problem. It creates a highly selective, low-recombination electrical contact that still allows current to flow.",
    right: "Front (Al₂O₃ + SiNx)\nSolves the surface passivation problem. It passivates the emitter surface (using chemical and field-effect passivation) while explicitly NOT acting as a current-carrying contact."
  },
  {
    type: "stats",
    title: "20. Process Parameters & SPC",
    subtitle: "Industrial specs for LPCVD",
    stats: [
      { label: "Temperature", value: "550-650°C" },
      { label: "Pressure", value: "200-300 mTorr" },
      { label: "Gases", value: "SiH₄, N₂" },
      { label: "Deposition Rate", value: "1-5 nm/min" },
    ],
    callout: {
      label: "Quality Control",
      text: "Defects like hazy wafers, boat marks, and non-uniformity are rigorously checked via SPC (Statistical Process Control)."
    }
  },
  {
    type: "comparison",
    title: "TOPCon vs PERC vs HJT",
    subtitle: "Three Generations of Solar Cell Technology",
    comparison: [
      {
        name: "TOPCon",
        color: "#3b8cff",
        badge: "Current Leader",
        points: [
          "~25% efficiency (commercial production), 27.79% certified world record.",
          "~10–12 manufacturing steps — upgrades ~8 existing PERC steps.",
          "Equipment cost ~200 million RMB/GW — leverages existing PERC lines.",
          "Near-zero light-induced degradation over 30 years.",
          "N-type silicon base: far less sensitive to iron and metal impurities than P-type."
        ]
      },
      {
        name: "PERC",
        color: "#fb7185",
        badge: "Previous Standard",
        points: [
          "~23.5% efficiency ceiling — approaching the theoretical limit for its structure.",
          "P-type silicon base: more sensitive to metallic impurities and suffers LID (light-induced degradation).",
          "Simpler process (~8 main steps) — TOPCon is largely an upgrade of this.",
          "Lower cost per GW but the efficiency gap with TOPCon grows each year.",
          "Being phased out of new capacity investment in favour of TOPCon."
        ]
      },
      {
        name: "HJT",
        color: "#a3e635",
        badge: "Future Challenger",
        points: [
          "~27%+ efficiency potential; only ~5 steps but requires entirely new equipment.",
          "Equipment cost 300–350 million RMB/GW — no PERC equipment reuse.",
          "Uses amorphous silicon (a-Si) layers deposited at low temperature (<200°C).",
          "Excellent bifaciality and low temperature coefficient.",
          "Higher upfront investment; supply chain still maturing relative to TOPCon."
        ]
      }
    ]
  },
  {
    type: "content",
    title: "Why N-type Silicon?",
    subtitle: "The Base Material Advantage",
    bullets: [
      {
        label: "Resistance to Metal Impurities",
        text: "N-type silicon (phosphorus-doped base) is far less sensitive to common metallic impurities like iron than P-type silicon. In P-type, even a few parts-per-billion of iron dramatically shortens minority-carrier lifetime. N-type is much more tolerant, making the cells more robust and consistent in production."
      },
      {
        label: "Immunity to Light-Induced Degradation (LID)",
        text: "P-type PERC cells suffer from LID — in the first hours of light exposure, boron-oxygen complexes form that act as recombination centres, reducing efficiency by 1–3% permanently. N-type silicon does not form boron-oxygen complexes, so TOPCon cells are essentially immune to this mechanism. Their efficiency on day 1 is their efficiency on day 10,000."
      },
      {
        label: "Better Long-Term Revenue",
        text: "Combined with the passivated contact structure, N-type TOPCon cells hold their rated efficiency far better over the 30-year field lifetime of a solar installation. This makes TOPCon more valuable not just at installation but over the full revenue life of a solar farm — a key reason for its rapid market adoption."
      }
    ]
  },
  {
    type: "content",
    title: "LPCVD Process Phases in Detail",
    subtitle: "What Happens Inside the Furnace Tube",
    bullets: [
      {
        label: "Phase 1: Ramp-Up and Stabilise",
        text: "The furnace temperature is raised to the oxidation setpoint (500–700°C) and held until it is stable across the entire tube length. Premature gas introduction before temperature is uniform causes non-uniform oxide thickness — the wafers at the hot and cold ends would receive different oxide."
      },
      {
        label: "Phase 2: Oxidation and Purge",
        text: "Oxygen flows into the tube, reacting with the rear silicon surface to grow the tunnel oxide (O₂ + Si → SiOₓ). After the target thickness of ~1.9–2.1 nm is reached, the tube is purged with inert nitrogen to remove all residual oxygen before switching gases."
      },
      {
        label: "Phase 3: Poly-Silicon Deposition",
        text: "Temperature is adjusted to 590–630°C and silane (SiH₄) is introduced at a low, controlled flow rate. SiH₄ thermally decomposes on the hot surface: SiH₄ → Si + 2H₂. Silicon deposits as amorphous/poly-Si on the tunnel oxide while hydrogen gas is pumped away continuously."
      },
      {
        label: "Phase 4: Final Purge",
        text: "Silane is shut off and the tube is purged with inert gas before the boat is withdrawn. This purge is safety-critical — residual SiH₄ in contact with air during unloading would ignite spontaneously (SiH₄ is pyrophoric, auto-igniting near 40°C)."
      }
    ]
  },
  {
    type: "content",
    title: "Film Colour → Thickness",
    subtitle: "Reading Poly-Si Thickness by Eye",
    bullets: [
      {
        label: "Why Colour Indicates Thickness",
        text: "Thin transparent films produce interference colours that shift predictably with thickness — the same effect as an oil sheen on water. The poly-Si film on the rear of each wafer shows a characteristic colour that operators use as a fast pass/fail indicator at the unloader."
      },
      {
        label: "The Colour Scale",
        text: "Jade-green appearance corresponds to approximately 80–85 nm — the low end, below specification. Pink corresponds to approximately 115–120 nm. Burgundy (dark red-brown) corresponds to approximately 130 nm and is the standard production target. Any other colour indicates a deviation from the intended thickness."
      },
      {
        label: "Precise Measurement: JA Ellipsometer",
        text: "Visual colour is a fast check but not a measurement. The precise tunnel oxide thickness (target 1.9–2.1 nm) is measured periodically with a JA ellipsometer — an optical instrument that determines film thickness from the angle of polarised reflected light. The ellipsometer is used for process setup and verification, not continuous monitoring."
      }
    ]
  },
  {
    type: "content",
    title: "Quartz Thermal Mismatch",
    subtitle: "Why Quartz Parts Keep Cracking",
    bullets: [
      {
        label: "The Root Cause",
        text: "Amorphous silicon (a-Si) and quartz (SiO₂) have very different thermal expansion coefficients. As the furnace heats and cools through hundreds of production cycles, the silicon film deposited on the quartz parts expands and contracts at a different rate than the underlying quartz tube and boat."
      },
      {
        label: "Cumulative Stress and Failure",
        text: "With each thermal cycle, the mismatch stress at the silicon-quartz interface accumulates. When the accumulated stress exceeds the fracture toughness of the quartz component, it cracks — sometimes catastrophically during a production run. This is a known, expected maintenance consumable on LPCVD equipment."
      },
      {
        label: "Mitigation Strategies",
        text: "Applying a transition buffer layer before the main film deposition can relieve interfacial stress. Using higher-purity synthetic quartz with greater strength extends component life. Regular measurement of silicon buildup thickness on quartz parts allows predictive replacement before cracking occurs."
      }
    ]
  },
  {
    type: "content",
    title: "Silane (SiH₄) Safety",
    subtitle: "Handling a Pyrophoric Gas",
    bullets: [
      {
        label: "What 'Pyrophoric' Means",
        text: "Silane ignites spontaneously on contact with air — no spark or ignition source is needed. Auto-ignition occurs at approximately 40°C, meaning even a tiny leak of SiH₄ into warm factory air can immediately cause a flash fire or explosion. This makes silane one of the most hazardous gases used in the entire TOPCon process."
      },
      {
        label: "Why It Is Especially Dangerous",
        text: "There is often no visible leak or detectable warning before ignition. The first sign of a SiH₄ leak can be a flash fire. Additionally, SiH₄ is toxic — the white amorphous silica smoke produced by combustion causes lung and kidney damage if inhaled. Even without fire, high concentrations are asphyxiating."
      },
      {
        label: "Required Safety Controls",
        text: "Fully sealed, dedicated gas delivery lines with no joints in confined spaces. Continuous gas leak detectors with automatic shutoff valves on alarm. Strict PPE including full-face respirators and chemical-resistant clothing. The final purge step before tube opening is a mandatory safety operation — it ensures no residual SiH₄ can contact air during wafer unloading."
      }
    ]
  }
];
