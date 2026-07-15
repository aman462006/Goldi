import type { DeepDiveSlide } from "../types";

export const rearEtchDeepDive: DeepDiveSlide[] = [
  {
    type: "hero",
    title: "Alkaline Rear Etch & Edge Isolation",
    subtitle: "Cleaning up the edges",
    tagline: "Tube diffusion is a messy process. Gases don't just coat the front of the wafer; they wrap around the edges and the back, creating parasitic junctions that would short-circuit the entire solar cell.",
    body: [
      "When we diffused boron into the front of the wafer to create our p-n junction, the boron gas also coated the edges and the rear surface.",
      "This means the p-type layer connects the front and the back of the cell. If we were to put metal contacts on this right now, electricity would just flow around the edges of the cell, completely bypassing the external circuit.",
      "We must physically break this connection. This is called 'Edge Isolation'."
    ]
  },
  {
    type: "split",
    title: "Edge Isolation",
    subtitle: "Breaking the Short Circuit",
    left: "There are three primary ways to achieve edge isolation in modern manufacturing:\n\n1. Wet Chemical Etching: Wafers float on a shallow chemical bath of HF and HNO₃. The liquid touches only the bottom and the edges, etching them away while leaving the top surface dry.\n\n2. Plasma Etching: Wafers are stacked like coins in a vacuum chamber. A plasma gas (like CF₄ + O₂) is introduced. Because they are stacked tight, the gas can only attack and etch the exposed outer edges.",
    right: "3. Laser Edge Isolation: A high-powered laser is used to physically cut a microscopic trench around the entire perimeter of the cell, severing the electrical connection between the front and the back.\n\nMost high-volume lines rely on wet chemical etching as part of a continuous inline process.",
    visual: "edgeIsolation"
  },
  {
    type: "split",
    title: "Inline Acid vs. Bath Alkaline",
    subtitle: "Two-Stage Process Design",
    left: "This step is split into two fundamentally different tools working in sequence:\n\n1. Chain-type inline acid (Kzone): Wafers travel on a roller conveyor over an HF bath. The HF contacts only the rear and edges — removing BSG and surface oxide — while a water film protects the front texture. This is a fast, continuous process.",
    right: "2. Bath-type alkaline polish (NaOH + ADD): Wafers are dipped in batches. This slower, more controllable process does the heavy work: flattening the rear pyramidal texture and removing the edge p-n junction.\n\nWhy split into two steps? Acid effectively dissolves glass (BSG/SiO₂) but barely touches silicon. Alkali effectively etches silicon but doesn't dissolve glass. Using them sequentially maximizes selectivity."
  },
  {
    type: "content",
    title: "Why Alkaline Polishing for TOPCon?",
    subtitle: "Advantages over Acid Polishing",
    bullets: [
      {
        label: "Superior Rear Reflectance",
        text: "Alkaline (NaOH/KOH) polishing produces a microscopically smooth, specular rear surface. This smooth mirror-like finish reflects long-wavelength photons (>900 nm) that have passed through the cell back for a second absorption pass, raising Isc. Target rear reflectance: > 37.9% (typically 38–42%). Acid polishing leaves a rougher, more pitted surface that scatters rather than specularly reflects."
      },
      {
        label: "Hydrophobic Surface for LPCVD",
        text: "After alkaline polish and the final HF acid wash, the silicon surface is hydrogen-terminated and hydrophobic. Water beads off instantly. This hydrophobic surface minimizes native oxide regrowth before the LPCVD step, ensuring the tunnel oxide thickness is precisely controlled from bare silicon rather than from an uncontrolled pre-existing oxide."
      },
      {
        label: "Smaller Surface Area",
        text: "A polished rear has significantly less surface area than a textured rear. Less area means fewer surface defects and dangling bonds, which means lower surface recombination velocity — better passivation by the subsequently grown tunnel oxide."
      },
      {
        label: "Chemical Selectivity",
        text: "SiO₂ is essentially inert to OH⁻ ions, but elemental silicon etches readily (2 NaOH + Si + H₂O → Na₂SiO₃ + 2 H₂↑). This selectivity means BSG must be removed by HF first before alkaline polish can attack the underlying silicon efficiently."
      }
    ]
  },
  {
    type: "content",
    title: "Rear Etch / Polishing",
    subtitle: "Preparing for TOPCon",
    bullets: [
      {
        label: "Removing Parasitic Layers",
        text: "The rear surface of the wafer is currently covered in unwanted Boron Silicate Glass (BSG) and a heavily doped p-type silicon layer. This must be completely stripped away."
      },
      {
        label: "Alkaline Polishing",
        text: "Using a strong alkaline solution (NaOH or KOH + additive), the rear surface is etched heavily. Not only does this remove the unwanted doping, but it also polishes the back surface flat. Target weight loss: 0.21 ± 0.03 g — a very precise material removal budget."
      },
      {
        label: "Why Polish the Back?",
        text: "While we wanted pyramids on the front to trap light, we want the back of a TOPCon cell to be as flat as possible. A flat surface allows us to deposit an ultra-thin (1-2 nm) and perfectly uniform tunnel oxide layer in the next step. If the back was textured, the oxide layer would be uneven and the quantum tunneling effect would fail."
      }
    ]
  },
  {
    type: "content",
    title: "SPC & Common Abnormalities",
    subtitle: "What Goes Wrong and Why",
    bullets: [
      {
        label: "Over-Polishing the Front",
        text: "Symptom: front reflectance increases; weight loss exceeds spec. Root cause: HF acid wicks up the wafer edge via capillary action ('R-angle wicking'), dissolving front surface oxide and exposing the pyramid texture to the alkaline bath. Fix: Increase water-film volume on the inline acid conveyor and reduce conveyor speed to improve the water curtain barrier."
      },
      {
        label: "Spots on Polished Rear",
        text: "Symptom: circular or irregular matte spots on the otherwise mirror-like rear surface. Root cause: local areas where the NaOH additive concentration was too low (inadequate polishing) or where contaminants blocked the etchant. Fix: Optimize chemical concentration ratio and ensure thorough pre-cleaning of the bath."
      },
      {
        label: "EL Black Spots After Process",
        text: "Symptom: electroluminescence imaging after firing shows localized dark spots not present before rear etch. Root cause: wafers not fully dried at the unloader — residual water droplets dry on the surface and leave ion-rich stains that become recombination centers. Fix: Check air-knife power and ensure dryer temperature setpoints are met; increase inspection frequency at the unloader."
      },
      {
        label: "Hydrophobicity Failure (BSG Residue)",
        text: "Symptom: water spreads on the rear instead of beading. Root cause: HF concentration in the inline acid tank is depleted, or the exposure time is too short — BSG is only partially removed. This is critical: residual BSG creates a non-uniform interface for tunnel oxide growth. Fix: Check HF concentration immediately; if out-of-spec, replace the bath and re-process the affected wafers."
      }
    ]
  },
  {
    type: "content",
    title: "Protective Groups & Polishing Groups",
    subtitle: "Selective Chemistry in One Bath",
    bullets: [
      {
        label: "The Challenge",
        text: "The alkaline polishing step must aggressively flatten the rear surface while leaving the front pyramidal texture completely untouched — in the same chemical bath. This requires chemical selectivity achieved through additive molecules."
      },
      {
        label: "Protective Groups",
        text: "These additive molecules selectively adsorb onto the front oxide surface, forming a physical barrier that shields it from the OH⁻ ions in the alkaline solution. As long as the front surface oxide is intact (maintained by the preceding BSG-removal HF step leaving a thin protective SiO₂), these molecules keep the alkaline bath from attacking the front silicon pyramids."
      },
      {
        label: "Polishing Groups",
        text: "These additives play the opposite role — they accelerate OH⁻ etching of the rear silicon surface. By concentrating the alkaline attack on the rear, they allow fast, uniform polishing of the back. Together, protective groups and polishing groups enable a single bath to simultaneously polish the rear and protect the front — without any physical masking."
      }
    ]
  },
  {
    type: "content",
    title: "Why BSG Must Be Completely Removed",
    subtitle: "The Consequences of Incomplete Etching",
    bullets: [
      {
        label: "Moisture Absorption and Power Degradation",
        text: "Borosilicate glass (BSG) is hygroscopic — it continuously absorbs moisture from the surrounding air. This moisture gradually degrades the cell by reducing short-circuit current (Isc) and causing power output to fall over the module's lifetime. Incomplete BSG removal is therefore a long-term reliability risk, not just an immediate defect."
      },
      {
        label: "Dead Layer Effect on Carriers",
        text: "BSG creates a 'dead layer' at the rear surface where minority-carrier lifetime is dramatically shortened. Carriers generated in or near this region recombine almost instantly rather than being collected — directly reducing both Voc and Isc."
      },
      {
        label: "PECVD Colour Differences",
        text: "If BSG residue remains on the surface when the PECVD silicon nitride coating is applied later, the optical film properties differ over glass patches vs. bare silicon. This shows up as visible colour differences on the finished cell — a cosmetic defect that causes rejections in customer appearance sorting even if electrical performance is not severely impacted."
      }
    ]
  },
  {
    type: "content",
    title: "The Slow-Pull Station",
    subtitle: "Precision Drying for Tunnel Oxide Control",
    bullets: [
      {
        label: "What It Does",
        text: "After the final cool DI-water rinse, wafers are drawn slowly and smoothly out of the tank (the 'slow lift' or 'slow pull' station) rather than being quickly withdrawn. The controlled withdrawal allows contaminants, residual chemicals, and loosened particles to drain cleanly from the surface rather than being dragged along with the wafer."
      },
      {
        label: "Why It Matters for the Tunnel Oxide",
        text: "Even brief air exposure on a wet silicon surface allows a thin native oxide to grow. The thickness of this native oxide directly affects the tunnel oxide grown in the subsequent LPCVD step. By controlling exactly how the wafer exits the final rinse — slowly and uniformly — the slow-pull station gives precise control over the surface state and starting oxide thickness. This ensures the LPCVD tunnel oxide grows to exactly its specified 1.9–2.1 nm target."
      },
      {
        label: "The Resulting Surface",
        text: "The output is a hydrophobic, hydrogen-terminated silicon surface with minimal and well-controlled native oxide. Any non-uniformity introduced here would propagate directly into the tunnel oxide quality and degrade the TOPCon passivated contact — making the slow-pull station a precision quality step despite looking like a simple rinse."
      }
    ]
  }
];
