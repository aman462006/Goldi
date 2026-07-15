import type { DeepDiveSlide } from "../types";

export const printDeepDive: DeepDiveSlide[] = [
  {
    type: "hero",
    title: "Screen Printing & Firing",
    subtitle: "Creating the Electrodes",
    tagline: "The wafer is fully functional, but trapped inside an insulating dielectric shell. We must print metal contacts and fire them completely through the insulation to extract the electricity.",
    body: [
      "Screen printing is how we create the silver fingers and busbars on the front and rear of the cell.",
      "The process forces a highly viscous silver paste through a patterned mesh stencil using a polyurethane squeegee.",
      "Because the silicon wafer is incredibly fragile (only ~150 μm thick), the printing process is designed so the squeegee never actually touches the wafer."
    ]
  },
  {
    type: "split",
    title: "Snap-Off Printing",
    subtitle: "Protecting the Wafer",
    left: "A small gap (usually 0.5 - 2 mm) is maintained between the screen and the wafer. This is the 'snap-off distance'.\n\nAs the squeegee moves across the screen, it pushes down just enough to force the screen to touch the wafer locally. \n\nAs soon as the squeegee passes, the tension in the screen causes it to instantly snap back up away from the wet paste.",
    right: "This snap-off behavior prevents the screen from sticking to the paste and smearing the printed lines. \n\nBecause only a tiny fraction of the screen touches the wafer at any given millisecond, the mechanical force on the fragile silicon is minimized, preventing wafer breakage.\n\nSqueegeee hardness (75 Shore A) and angle are critical: paste transfer is inversely proportional to squeegee angle — a larger angle transfers less paste, giving thinner fingers.",
    visual: "snapOff",
    visualCaption: "The squeegee never touches the wafer; the screen snaps back instantly."
  },
  {
    type: "content",
    title: "The Silver Paste",
    subtitle: "A Complex Chemical Cocktail",
    bullets: [
      {
        label: "Silver Particles (Primary Conductor)",
        text: "The core component (usually >99.9% pure spherical or flake Ag particles, 1–5 µm). Provides the extremely high electrical conductivity needed to carry current out of the cell without resistive losses. Particle shape, size distribution, and surface chemistry all affect sintering behavior and final contact resistivity."
      },
      {
        label: "Glass Frit (Contact Enabler)",
        text: "Microscopic lead-borosilicate or lead-telluride glass particles (3–10% by weight). During firing, the glass melts at ~600°C and acts as a corrosive flux, eating through the SiNx anti-reflection coating to let the silver touch the silicon. Without frit, the SiNx insulates the contact permanently. Too much frit → over-penetration destroys the junction (shunting). Too little → poor contact (high Rs)."
      },
      {
        label: "Organic Binder",
        text: "A temporary polymeric binder (ethyl cellulose or similar) that holds the silver and glass particles together so they form a solid, coherent line after printing. It burns away completely during the burnout phase of firing (150–400°C). Residual carbon from incomplete burnout increases contact resistance."
      },
      {
        label: "Solvent (Viscosity Control)",
        text: "Controls the rheology. The paste must be thin enough to flow through the microscopic screen mesh under squeegee pressure (thixotropic thinning), but thick enough to freeze instantly when pressure is removed so the fingers don't spread sideways (thixotropic recovery). The time constant of this recovery determines the achievable minimum finger width."
      }
    ]
  },
  {
    type: "content",
    title: "Squeegee Pressure Principles",
    subtitle: "Mechanics of Paste Transfer",
    bullets: [
      {
        label: "Pressure and Line Width",
        text: "Increasing squeegee pressure pushes more paste through the mesh and spreads it wider, increasing finger width. For fine-line printing (<30 µm), low pressure and precise gap control are critical. Too much pressure also accelerates screen wear and risks wafer breakage."
      },
      {
        label: "Squeegee Angle",
        text: "A smaller squeegee angle (more upright) creates a higher normal force on the paste, pushing more material through the mesh. A larger angle (tilted forward) creates a rolling action that 'hydraulically' lifts paste over the mesh wires rather than pushing it through, depositing less material. Typical angle: 60–75°."
      },
      {
        label: "Print Speed",
        text: "Higher print speed reduces the contact time between squeegee and mesh, limiting paste transfer. Very high speeds can cause incomplete fill of fine mesh openings. Very low speeds allow more paste to bleed outward (satellite droplets and line spreading). Optimal speed is a balance between throughput and print quality."
      },
      {
        label: "Snap-Off Distance",
        text: "A larger snap-off gap gives the screen more vertical travel, which creates a sharper 'release' of the paste from the mesh — cleaner edges, sharper fingers. Too large a gap requires more squeegee force to bring the screen down to the wafer, risking breakage. The snap-off is one of the most critical parameters for fine-line printing yield."
      }
    ]
  },
  {
    type: "split",
    title: "Firing the Cell",
    subtitle: "The Ag-Si Eutectic",
    left: "After printing, the paste is dried at 150-250°C to evaporate the solvent.\n\nThen, the cell enters a belt furnace where the temperature spikes to 750-850°C for just a few seconds (dwell time at peak: ~1–3 s).\n\nDuring this spike, the binder burns away (200–400°C), and the glass frit melts and chemically etches a microscopic channel through the underlying SiNx and Al₂O₃ layers.",
    right: "With the dielectric pierced, the silver contacts the bare silicon. \n\nWhile pure silver melts at 961°C, a silver-silicon alloy (a eutectic) melts between 600-800°C. This allows the silver and silicon to fuse together, creating a permanent, low-resistance ohmic contact.\n\nIf fired too hot (>820°C): silver spikes too deep and destroys the p-n junction (shunting → low Rsh). If fired too cold (<750°C): the glass doesn't fully penetrate the SiNx → high contact resistance → high Rs.",
    visual: "firingFrit",
    visualCaption: "Glass frit melts through the dielectric to allow an Ag-Si bond."
  },
  {
    type: "content",
    title: "The Firing Profile in Detail",
    subtitle: "Zone-by-Zone Temperature Journey",
    bullets: [
      {
        label: "Preheat Zone (160–300°C)",
        text: "The conveyor belt carries the cell through a series of preheat zones. The solvent evaporates and the organic binder begins to decompose. Ramping too fast traps organic gases under the paste, causing blistering and delamination."
      },
      {
        label: "Burnout Zone (300–500°C)",
        text: "All organic components (binder, residual solvent) are fully combusted. This must happen before the glass melts — if organics remain when the glass closes, the trapped carbon creates voids in the contact and raises resistance."
      },
      {
        label: "Peak Zone (~786°C for ≈1–3 s)",
        text: "The glass frit melts and wets the SiNx surface. The etching reaction between molten glass and SiNx is very fast. Ag particles begin to sinter together. Ag partially dissolves into the molten glass and re-precipitates on the silicon surface, forming the Ag crystallites that create the ohmic contact."
      },
      {
        label: "Cooling Zone (rapid)",
        text: "Fast cooling (> 50°C/s) is critical to prevent overgrowth of Ag crystallites at the Ag/Si interface, which can penetrate too deeply and shunt the junction. The belt speed controls total furnace residence time and thus cooling rate."
      }
    ]
  },
  {
    type: "content",
    title: "Common Printing Abnormalities",
    subtitle: "Defects and Their Root Causes",
    bullets: [
      {
        label: "Thick Fingers (Wide Line Width)",
        text: "Symptom: finger width significantly above spec; shadowing loss increases, reducing Isc. Root cause: excessive paste wet weight (over-deposition) from worn screen, incorrect snap-off distance, or high squeegee pressure. The paste spreads laterally before it freezes. Fix: Reduce print pressure; check screen mesh tension; verify snap-off gap."
      },
      {
        label: "Broken or Missing Fingers",
        text: "Symptom: AOI flags 0% local current-collecting area along a finger. Root cause: clogged mesh apertures (paste dried in the holes), insufficient paste viscosity (too thin), or local mesh damage. Fix: Clean the screen with solvent (below downtime threshold) or replace the screen."
      },
      {
        label: "Micro-cracks During Printing",
        text: "Symptom: EL imaging after firing shows dark discontinuous lines along fingers; pull test fails on busbars. Root cause: wafer breakage during the print stroke — either squeegee pressure too high, wafer not supported correctly on the stage, or wafer pre-cracked from handling. Fix: Inspect wafer stage flatness; reduce print pressure; check for pre-existing edge chips."
      },
      {
        label: "Shunting After Firing (Low Rsh)",
        text: "Symptom: I-V curve shows non-ideal dark current; EL reveals bright spots at contact lines. Root cause: firing peak temperature too high — glass etches completely through the SiNx and ALD Al₂O₃, and silver spikes penetrate into or through the p-n junction. Fix: Reduce peak firing temperature by 5–10°C; adjust belt speed."
      }
    ]
  },
  {
    type: "content",
    title: "Why the Front Busbar Doesn't Fire Through",
    subtitle: "Non-Penetrating Paste Protects Voc",
    bullets: [
      {
        label: "Fingers vs Busbars — Different Jobs",
        text: "The front grid consists of two types of metal lines: narrow fingers that collect current from the silicon surface, and wider busbars that gather current from all the fingers and connect to tabbing ribbons for module assembly. These two lines have fundamentally different electrical roles — and deliberately use different paste formulations."
      },
      {
        label: "Why Fingers Use Penetrating Paste",
        text: "Fingers must make direct electrical contact with the silicon emitter beneath the SiNx anti-reflection coating and Al₂O₃ passivation layer. Penetrating paste contains glass frit that melts during firing, etches through the SiNx, and allows silver to contact the silicon directly. Without this penetration, current cannot flow from the cell into the finger grid."
      },
      {
        label: "Why Busbars Use Non-Penetrating Paste",
        text: "Every spot where silver fires through the SiNx to touch silicon becomes a high-recombination point that lowers Voc. The front busbar only needs to electrically connect to the silver fingers — it does not need to reach the silicon at all. Non-penetrating busbar paste sits on top of the SiNx without damaging it, minimising the total area of metal-on-silicon contact. This deliberate choice protects Voc while still enabling full current collection through the fingers."
      }
    ]
  },
  {
    type: "comparison",
    title: "Statistical Process Control (SPC)",
    subtitle: "Monitoring the Print",
    comparison: [
      {
        name: "Target (Center Range)",
        color: "#3b8cff",
        badge: "Ideal",
        points: [
          "The nominal target for a given parameter (e.g., finger wet weight of 42.5 mg for station 4).",
          "All process adjustments aim to keep the measured value at this exact target for maximum efficiency."
        ]
      },
      {
        name: "Control Range",
        color: "#a3e635",
        badge: "Stable",
        points: [
          "A tight statistical band around the target (e.g., 42.5 ± 2 mg for control).",
          "If measurements stay here, the process is healthy. Drift outside this band is an early warning that equipment is wearing out — screen tension decreasing, squeegee blade deforming."
        ]
      },
      {
        name: "Circulation (Spec) Range",
        color: "#fb7185",
        badge: "Limit",
        points: [
          "The maximum allowable tolerance (e.g., 42.5 ± 3.5 mg for circulation).",
          "If measurements hit this limit, the product is non-conforming. Stop the machine immediately for screen replacement or parameter correction."
        ]
      }
    ]
  },
  {
    type: "table",
    title: "Screen Printing & Firing Parameter Reference",
    subtitle: "Industrial Metallisation Specifications",
    headers: ["Parameter", "Value / Range", "Effect of Deviation"],
    rows: [
      ["Front finger line width", "< 25–35 µm (high efficiency)", "Wider fingers → more shading loss (Isc drops); narrower → higher aspect ratio paste needed"],
      ["Snap-off distance", "0.5–2 mm", "Too small → poor snap, smeared lines; too large → more squeegee force needed → breakage"],
      ["Squeegee hardness", "~75 Shore A", "Harder → less deflection, more paste; softer → more deflection, spreading lines"],
      ["Squeegee angle", "60–75°", "Lower angle → more paste transfer; higher angle → less paste (rolling action)"],
      ["Print speed", "Optimised for paste viscosity", "Too fast → under-fill fine mesh; too slow → paste bleeds (line widening)"],
      ["Paste wet weight per wafer", "Target ± 2 mg (control)", "Directly sets finger cross-section and contact resistance; SPC parameter"],
      ["Peak firing temperature", "~780–800 °C", "< 750 °C → poor glass frit etching → high Rs contact; > 820 °C → Ag spikes through junction → shunting"],
      ["Peak zone dwell time", "1–3 seconds", "Too short → incomplete Ag crystallite formation; too long → excessive spiking"],
      ["Belt speed", "Controls total furnace time", "Faster → less total thermal budget; slower → more firing but risk of over-spiking"],
      ["Cooling rate", "> 50 °C/s", "Fast cooling prevents Ag crystallite overgrowth at Si interface → lower contact recombination"],
      ["Rear Ag finger (busbar) paste type", "Non-penetrating (no frit)", "Penetrating paste on busbars creates extra shunt sites → Voc reduction"],
      ["Screen mesh tension", "Calibrated N/cm", "Low tension → screen sags, snap-off changes → irregular paste deposition"],
    ],
  },
  {
    type: "faq",
    title: "Frequently Asked Questions",
    subtitle: "Interview Preparation & Technical Deep Dive",
    questions: [
      {
        q: "Why does the glass frit in silver paste 'fire through' the SiNx ARC? Isn't silicon nitride extremely hard?",
        a: "SiNx is mechanically hard (Mohs ~9) but it is NOT chemically inert to molten lead-borosilicate or lead-telluride glass. At 600–780°C, the glass frit melts into a highly reactive viscous liquid. Molten lead borosilicate is a powerful flux that chemically dissolves SiNx at contact points — the lead oxide component provides the oxidising driving force: PbO + SiNx → PbxSiy + NOx (simplified). Once the local SiNx is dissolved, the molten glass wets the silicon surface and silver atoms begin dissolving into the glass. On cooling, silver re-precipitates as Ag crystallites embedded in the silicon surface — these are the actual ohmic contact points. No frit = no SiNx penetration = no electrical contact = open circuit. Pure silver alone has negligible reactivity with SiNx at these temperatures."
      },
      {
        q: "What is the Ag-Si eutectic contact and how does it form during firing?",
        a: "Pure silver melts at 961°C and silicon at 1414°C — both well above the peak firing temperature of ~780°C. However, in the silver-silicon binary phase diagram, there is a eutectic point at ~3.5 wt% Si where the alloy melts at only ~835°C. During firing, once the glass frit dissolves the SiNx, Ag contacts silicon. At 780°C (below the eutectic), a small amount of silicon dissolves into the silver near the interface. On cooling below 780°C, this Ag-Si mixture becomes supersaturated and Ag crystallites re-precipitate directly into the silicon surface, forming a Ag-doped surface layer that makes intimate, low-resistance electrical contact. The eutectic chemistry allows silver and silicon to form a metallic bond at temperatures well below both melting points."
      },
      {
        q: "Why is the firing temperature window so narrow (±10°C)? What exactly goes wrong at each extreme?",
        a: "Below 750°C: the glass frit doesn't fully melt or reach sufficient fluidity to wet and dissolve the SiNx. The Ag crystallite formation is incomplete or absent. The contact is Ag-glass-SiNx-Si rather than Ag-Si — contact resistance is 10–100× higher. Series resistance (Rs) increases. Fill factor (FF) and Pmpp drop. Above 820°C: glass frit becomes too aggressive — it etches completely through the ~75 nm SiNx AND the ~10 nm Al₂O₃ AND through the boron emitter (~300 nm) into the n-type bulk. Ag crystallites now nucleate in the n-type base rather than the p-type emitter. This creates a metal contact shorting the junction — shunt resistance (Rsh) collapses and Voc drops catastrophically. The +/-10°C window literally separates 'no contact' from 'perfect contact' from 'shunt.' Belt speed and zone temperature calibration are critical."
      },
      {
        q: "How does screen wear affect print quality and how is it detected?",
        a: "A printing screen has a finite lifetime measured in thousands of print strokes. As the screen wears: (1) mesh wires deform, changing the aperture size and shape — print line width increases gradually (Cp/Cpk for line width drifts); (2) the emulsion layer (polymer blocking where no paste should print) degrades at edges, causing satellite dots or smearing; (3) mesh tension decreases — snap-off changes and paste deposition becomes non-uniform across the wafer. SPC monitoring of wet weight catches tension-related issues early (weight rising means snap-off geometry changed). Screen visual inspection (microscope) after every N strokes detects mesh and emulsion damage. Proactive screen replacement before the control limit is hit is best practice."
      },
      {
        q: "What is a 'selective emitter' in the context of screen printing?",
        a: "A selective emitter means the silicon doping under the metal contacts is much heavier (lower Rs, better ohmic contact) than the doping in the illuminated areas between contacts. In printing terms, this means the silver paste must land precisely on the pre-doped, heavily-doped stripes. Two methods achieve this: (1) Laser doping before printing — a laser heats and drives extra phosphorus from the PSG into precise lines where the fingers will land; then printing aligns fingers to these pre-doped lines using camera-based alignment; (2) Self-aligned selective emitter — the paste itself is printed first, then laser fired to locally dope through the paste footprint. The efficiency benefit: illuminated areas with lighter doping have lower Auger recombination and better blue response; contact areas with heavier doping have lower specific contact resistance. Net Voc improvement: 5–15 mV; Jsc improvement: 0.5–1 mA/cm²."
      },
      {
        q: "What is 'fill factor' and which printing defects degrade it most?",
        a: "Fill factor (FF) = Pmpp/(Voc × Isc). It measures how 'square' the IV curve is — how efficiently the cell delivers its maximum power. FF is degraded by both high series resistance (Rs) and low shunt resistance (Rsh). Rs increases from: broken/thin fingers (open-circuit sections forcing current to detour → higher resistance path), over-high contact resistance (from under-firing or contaminated silicon surface), and non-uniform paste deposition (thick sections create local current choking). Rsh decreases from: silver spiking through the junction (over-firing), incomplete edge isolation (residual n-type at edges from front etch failure — but not a printing issue per se), and micro-cracks under metal fingers from excessive squeegee pressure. FF losses are particularly expensive because they affect all cells in a string equally — a 1% FF loss translates directly to 1% lower panel power."
      }
    ]
  }
];
