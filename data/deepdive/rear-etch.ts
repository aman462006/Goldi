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
  }
];
