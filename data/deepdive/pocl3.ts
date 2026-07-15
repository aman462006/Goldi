import type { DeepDiveSlide } from "../types";

export const pocl3DeepDive: DeepDiveSlide[] = [
  {
    type: "hero",
    title: "Phosphorus Diffusion",
    subtitle: "Doping with POCl₃",
    tagline: "After depositing the polysilicon layer on the rear of a TOPCon cell, we must heavily dope it with phosphorus to make it n-type and highly conductive.",
    body: [
      "While boron is used for the front p-type emitter, phosphorus is the standard dopant for n-type layers.",
      "The most common method for phosphorus diffusion in the solar industry is using a liquid source: Phosphorus Oxychloride (POCl₃).",
      "On this TOPCon line, POCl₃ diffusion targets the rear poly-Si — converting it from undoped amorphous/polycrystalline silicon into a heavily n⁺-doped, highly conductive layer."
    ],
    visual: "phosphorusDiffusion",
    visualCaption: "POCl3 liquid is bubbled to carry vapor into the diffusion tube."
  },
  {
    type: "split",
    title: "The N–N⁺ High–Low Junction",
    subtitle: "Building a Back Surface Field",
    left: "The wafer bulk is n-type (lightly doped with P, ~10¹⁵ atoms/cm³). The rear poly-Si, after POCl₃ diffusion, is n⁺ (heavily doped, ~10²⁰ atoms/cm³).\n\nBecause N⁺ >> N, a built-in potential forms at the interface pointing from n⁺ toward n. This field pushes majority carrier electrons deeper into the n-type wafer and away from the rear surface.",
    right: "For minority carriers (holes), this field is a strong repulsive barrier. Holes generated in the bulk cannot drift toward the rear metal contact — they are swept toward the front junction instead.\n\nThis 'Back Surface Field' (BSF) effect significantly reduces rear surface recombination, raising both Voc and Isc. The n/n⁺ high-low junction is the back-side analog of the front p-n junction."
  },
  {
    type: "split",
    title: "The Chemistry of POCl₃",
    subtitle: "Liquid Source Diffusion",
    left: "Because POCl₃ is a liquid at room temperature, an inert carrier gas (usually nitrogen) is bubbled through a flask of liquid POCl₃. This carries POCl₃ vapor into the hot diffusion tube where the wafers sit.\n\nInside the tube, oxygen is added. Above 600°C, POCl₃ decomposes:\n5 POCl₃ → 3 PCl₅ + P₂O₅\n4 PCl₅ + 5 O₂ → 2 P₂O₅ + 10 Cl₂↑\n\nThe P₂O₅ condenses as a glass layer on the poly-Si surface and acts as the phosphorus dopant reservoir.",
    right: "The P₂O₅ glass acts as the dopant source. Because the furnace is at extremely high temperatures (800-900°C), the silicon reduces the oxide to release pure phosphorus atoms, which then diffuse into the crystal lattice:\n\n2P₂O₅ + 5Si → 5SiO₂ + 4P\n\nThis leaves behind a residue of Phosphorus Silicate Glass (PSG) on the surface. PSG must be removed in the front-etch step — if left in place it acts as a dead layer that blocks the ALD and PECVD steps."
  },
  {
    type: "split",
    title: "Deposition vs. Isothermal Drive-in",
    subtitle: "Two-Stage Recipe",
    left: "Stage 1 — Deposition (~790°C with POCl₃ flow):\nPOCl₃ vapor and O₂ enter the tube. P₂O₅ glass deposits onto the poly-Si surface. Phosphorus begins in-diffusing from the surface. This stage sets the surface concentration of phosphorus.",
    right: "Stage 2 — Isothermal drive-in (~860°C, N₂ only):\nPOCl₃ is cut off. Temperature rises. The phosphorus already deposited drives deeper into the poly-Si by thermal diffusion.\n\nThe higher temperature during drive-in accelerates grain-boundary diffusion in the polycrystalline silicon, ensuring uniform n⁺ doping throughout the 100–200 nm poly thickness — not just at the surface.\n\nTarget sheet resistance: 32–62 Ω/□ (n⁺ poly is much more conductive than the p⁺ emitter)."
  },
  {
    type: "content",
    title: "Gettering",
    subtitle: "Cleaning the Crystal",
    bullets: [
      {
        label: "The Problem of Impurities",
        text: "Silicon wafers are never 100% pure. They contain trace transition metals (like Fe, Cu, Ni) that act as 'traps' where electrons and holes recombine and disappear. These metallic impurities dramatically shorten minority-carrier lifetime and lower cell efficiency — even a few parts-per-billion of iron can degrade lifetime by orders of magnitude."
      },
      {
        label: "Internal Gettering",
        text: "During crystal growth (Czochralski process), oxygen naturally dissolves into the silicon (~10¹⁸ atoms/cm³). By carefully heating the wafer, these oxygen atoms form microscopic SiO₂ precipitates inside the bulk of the silicon. These precipitates create strain fields that act like black holes, trapping transition metal impurities away from the active p-n junction region."
      },
      {
        label: "External Gettering by POCl₃",
        text: "The heavy phosphorus diffusion process itself cleans the wafer! At high temperatures, the chemical potential of metal impurities is much lower in the heavily-doped n⁺ surface than in the lightly-doped bulk. Impurities migrate out of the bulk and become trapped in the PSG glass and the n⁺ poly layer. When the PSG is etched away in the front-etch step, the metal impurities go with it. This is called 'phosphorus gettering' and is one reason POCl₃ diffusion is done before passivation rather than after."
      },
      {
        label: "Chlorine Gettering",
        text: "The Cl₂ byproduct from POCl₃ decomposition also acts as a chemical getter — chlorine reacts with alkali metals (Na, K) and heavy metals at the furnace tube walls, immobilizing them and preventing contamination of future batches. This is why POCl₃ tubes require less frequent cleaning than BBr₃ tubes."
      }
    ]
  },
  {
    type: "content",
    title: "Common Abnormalities & Troubleshooting",
    subtitle: "What Can Go Wrong",
    bullets: [
      {
        label: "High Sheet Resistance",
        text: "Symptom: measured Rs above the upper control limit (>62 Ω/□). Root causes: missing diffusion dummy wafers (first/last boat positions get less dopant exposure without dummies), low POCl₃ source level (liquid nearly empty), wrong N₂ bubbler flow, or tube wall contamination depleting the source. Fix: Check source level and replenish; verify dummy wafer loading per SOP; re-qualify the tube."
      },
      {
        label: "Low Sheet Resistance (Over-doping)",
        text: "Symptom: Rs below the lower control limit (<32 Ω/□). Root causes: too-high POCl₃ flow, elevated temperature, or extended drive-in time. Severe over-doping causes Auger recombination in the poly-Si and can increase contact resistance. Fix: Reduce source flow or drive-in temperature; run qualification samples."
      },
      {
        label: "Wet or Contaminated Wafers in Furnace",
        text: "Symptom: visual haze or EL spots on affected wafers; possible damage to quartz tube. Root cause: wafers entering the furnace with residual moisture (inadequate air-knife drying after rear etch). Water reacts violently with BCl₃/POCl₃ at temperature, generating corrosive HCl fumes that etch the quartz tube interior and contaminate the load. Fix: Verify air-knife performance at unloader; inspect wafers for dryness before insertion."
      },
      {
        label: "Within-Boat Uniformity Failure",
        text: "Symptom: first and last wafers in the boat show different Rs from center wafers. Root cause: insufficient boat saturation (not enough dummy wafers at both ends), gas-inlet asymmetry, or leaking furnace flange. Fix: Check dummy-wafer count and placement; measure gas flow at the inlet; perform furnace leak-rate test (<1.5 Pa/min is acceptable)."
      }
    ]
  },
  {
    type: "content",
    title: "Selective Emitters",
    subtitle: "The Doping Paradox",
    bullets: [
      {
        label: "The Paradox",
        text: "Under the silver metal contacts, we need the silicon to be heavily doped (n⁺⁺). Heavy doping creates low electrical resistance so the current can flow easily into the wire. However, between the metal fingers (where the sunlight hits), heavy doping causes 'Auger recombination' — freshly generated electrons crash into dopant atoms and disappear before they can be collected."
      },
      {
        label: "The Solution: Selective Emitter",
        text: "We lightly dope the entire surface (n) so it absorbs sunlight perfectly without Auger losses. Then, a high-powered laser intensely heats and melts only the exact lines where the metal contacts will be printed. Extra dopant from the PSG glass is driven deep into those specific lines, creating heavily doped (n⁺⁺) regions exclusively under the metal."
      },
      {
        label: "Process Integration",
        text: "In TOPCon, the selective emitter concept applies to both the front boron emitter (where laser doping can create local p⁺⁺ regions under front contacts) and the rear poly-Si (where uniform heavy n⁺ doping is already achieved by POCl₃ because the entire rear is a contact surface, not just the fingers)."
      }
    ]
  },
  {
    type: "content",
    title: "Why the Phosphorus Target Differs from Boron",
    subtitle: "32–62 Ω/□ vs ~390 Ω/□ Explained",
    bullets: [
      {
        label: "Different Layers, Different Jobs",
        text: "The boron front emitter and the phosphorus rear poly-Si are doped to completely different sheet resistance targets because they serve entirely different electrical functions in the cell."
      },
      {
        label: "Boron Emitter (~390 Ω/□ — Lighter Doping)",
        text: "The front emitter is tuned to a higher sheet resistance because heavy doping here causes Auger recombination — freshly generated carriers in an over-doped surface recombine almost instantly, lowering both Voc and Isc. The ~390 Ω/□ target balances hole collection efficiency against recombination losses in the emitter region."
      },
      {
        label: "Phosphorus Rear Poly-Si (32–62 Ω/□ — Heavier Doping)",
        text: "The rear poly-Si must act as a low-resistance conductive contact layer — almost like a metal. It needs to carry current laterally from the entire rear surface to the metal fingers with minimal resistive losses. Heavy phosphorus doping achieves this. Recombination inside the poly-Si is tolerable because any carrier that has already tunnelled through the oxide has effectively been collected."
      }
    ]
  },
  {
    type: "content",
    title: "POCl₃ Hazard Profile",
    subtitle: "Chemical Safety",
    bullets: [
      {
        label: "Fuming and Moisture Reactivity",
        text: "POCl₃ (phosphoryl chloride) fumes strongly in moist air and is highly hygroscopic. On contact with water — including the humidity in ambient air — it reacts, releasing heat, hydrogen chloride (HCl) fumes, and phosphoric acid (H₃PO₄). Even a brief exposure to humid air causes visible fuming."
      },
      {
        label: "Toxicity Comparable to Phosgene",
        text: "The toxicity of POCl₃ is compared in the literature to phosgene (a chemical warfare agent). It severely irritates and chemically burns the eyes, skin, and respiratory tract on contact. Inhalation of fumes causes chemical burns to the airways and lungs. Even brief exposures require immediate medical attention and decontamination."
      },
      {
        label: "Required Precautions",
        text: "Full-face respirators and completely sealed protective clothing are mandatory when working near POCl₃. All gas lines and supply connections must be sealed and kept dry. Never allow contact with water — use only dry chemical extinguishers. In the event of a spill or leak, evacuate the area immediately and call emergency services; do not attempt to handle a large release without specialist training."
      }
    ]
  }
];
