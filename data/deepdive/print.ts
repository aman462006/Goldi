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
  }
];
