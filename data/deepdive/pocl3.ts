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
  },
  {
    type: "table",
    title: "POCl₃ Diffusion Parameter Reference",
    subtitle: "n⁺ Poly-Si Doping Industrial Specifications",
    headers: ["Parameter", "Value / Range", "Effect of Deviation"],
    rows: [
      ["Deposition temperature", "~790 °C", "Higher → more surface phosphorus, lower Rs; lower → insufficient P₂O₅ formation"],
      ["Drive-in temperature", "~860 °C", "Drives phosphorus deeper into poly-Si; main lever for uniformity through film thickness"],
      ["Sheet resistance target (n⁺ poly)", "32–62 Ω/□", "Low Rs → good lateral current transport; too low → Auger recombination risk"],
      ["PSG removal (HF)", "After front etch step", "Residual PSG blocks ALD/PECVD adhesion; trapped metals reduce minority carrier lifetime"],
      ["POCl₃ source level", "Maintained > minimum threshold", "Low source → insufficient P vapour → high Rs; low level alarm is critical"],
      ["N₂ bubbler flow", "Calibrated sccm", "Sets POCl₃ carrier concentration; flow meter drift = direct Rs drift"],
      ["Drive-in O₂ flow", "Minimal / zero", "Post-deposition oxidation forms PSG cap; too much O₂ → excess PSG hard to remove"],
      ["Dummy wafer count", "Per SOP at both ends of boat", "Without dummies: end wafers see different gas flow → higher Rs at ends (classic failure mode)"],
      ["Furnace leak rate", "< 1.5 Pa/min", "Air ingress → O₂ dilutes N₂, changes oxidation rate → Rs non-uniformity"],
      ["Tube saturation runs", "Required after cleaning", "Fresh tube wall absorbs dopant → insufficient phosphorus to wafers → high Rs"],
      ["Boat cleaning frequency", "Fixed schedule", "PSG buildup on boat creates parasitic dopant source → within-boat Rs non-uniformity"],
    ],
  },
  {
    type: "faq",
    title: "Frequently Asked Questions",
    subtitle: "Interview Preparation & Technical Deep Dive",
    questions: [
      {
        q: "Why is the n⁺ poly-Si sheet resistance target (32–62 Ω/□) so much lower than the boron emitter target (~390 Ω/□)?",
        a: "They serve completely different roles. The boron emitter must balance between light doping (low Auger recombination, good Voc) and heavy doping (low contact resistance, efficient hole collection). The constraints are tight and the optimum is around 390 Ω/□. The n⁺ poly-Si has no such Voc constraint — any carrier recombining inside the poly-Si has already been 'collected' by crossing the tunnel oxide. The poly-Si is essentially a lateral current conductor (analogous to a metal bus): it must carry current from the entire rear surface area to the metal finger contacts with minimal resistive loss. For this job, the lower Rs the better — practical limits are set by Auger recombination in the poly and cost/time of heavier doping. 32–62 Ω/□ is a commercially practical minimum that keeps finger-to-finger resistance losses to <0.1% of Vmpp."
      },
      {
        q: "What is 'gettering' and why is POCl₃ diffusion one of the best gettering steps in the solar process?",
        a: "Gettering is the redistribution of metallic impurities (Fe, Cu, Ni, Cr) from the active cell region (p-n junction) to a region where they do less harm. During POCl₃ diffusion at 800–900°C, three mechanisms work simultaneously: (1) Phosphorus gettering — heavy n⁺ doping creates a thermodynamic 'sink' where metals prefer to segregate (lower chemical potential in heavily doped Si); (2) PSG glass gettering — metals dissolved in the P₂O₅/SiO₂ glass on the surface are physically removed with the PSG in the front-etch step; (3) Cl₂ chemical gettering — chlorine reacts with metal chlorides that volatilize and are swept out. The combination can reduce bulk iron concentration by 1–2 orders of magnitude, raising minority carrier lifetime by 10–100×."
      },
      {
        q: "What happens during the 'drive-in' step at 860°C and why is temperature raised for this stage?",
        a: "During deposition at 790°C, phosphorus enters the near-surface of the poly-Si from the P₂O₅ glass. The concentration gradient is steep — very high at the surface, zero through most of the 130-nm poly-Si film. To make the poly-Si uniformly conducting (as needed for good lateral current transport), the phosphorus must diffuse throughout the full film thickness. Phosphorus diffusivity in poly-Si scales as Dp ∝ exp(−Ea/kT). Raising to 860°C accelerates diffusivity enough that phosphorus reaches the poly-Si bottom (tunnel oxide interface) in the available time (~hundreds of seconds). If the drive-in is skipped, the poly-Si bottom half remains undoped — high resistance layer in series with the tunneling contact."
      },
      {
        q: "Why must dummy wafers be placed at both ends of the quartz boat?",
        a: "Gas flowing along the length of the LPCVD/diffusion tube is consumed as it reacts with wafer surfaces. By the time the gas reaches the far end of the boat, its composition has changed — less POCl₃ remains. The first and last positions in the boat thus see different dopant concentrations than the middle positions — a systematic 'boat position effect.' Dummy wafers in these positions absorb the non-uniform gas flow without sacrificing production wafers. Additionally, the end wafers shield production wafers from end-effect temperature non-uniformities in the furnace tube. Without dummies, the first and last 5–10 production wafers in every boat show systematically higher Rs — a classic systematic defect that is easily prevented."
      },
      {
        q: "What is the 'within-boat uniformity' specification and what causes it to fail?",
        a: "Within-boat uniformity (Rs non-uniformity across all positions in the boat) is typically specified as ≤10% standard deviation for a properly functioning tube. It fails due to: (1) Boat saturation effect — freshly cleaned quartz surfaces absorb more dopant, robbing it from production wafers (run qualification wafers first after cleaning); (2) Gas flow asymmetry — if the gas inlet or outlet is blocked or partially obstructed, flow is non-uniform along the tube axis; (3) Temperature zoning — if one heating zone is miscalibrated, wafers in that zone receive different drive-in; (4) Quartz contamination — old deposits on tube walls act as parasitic dopant sources. Each cause has a distinct spatial signature: inlet/outlet problems show an axial gradient, temperature issues show a positional cluster, and boat effects show end-to-middle differences."
      },
      {
        q: "Why is POCl₃ especially dangerous to work with compared to SiH₄ or BCl₃?",
        a: "POCl₃ combines multiple hazards: (1) Extreme moisture reactivity — in humid air, it immediately hydrolyses, fuming and releasing HCl and H₃PO₄. These fumes are acutely toxic. (2) High toxicity — similar to phosgene in mechanism; inhaled POCl₃ fumes cause deep lung damage with delayed pulmonary oedema that may not manifest for hours after exposure. (3) Liquid phase at room temperature — spills create extended exposure surfaces unlike gases that disperse. (4) No good antidote — HCl burns to the airways are treated symptomatically; there is no neutralising agent for POCl₃-induced phosphate burns. Industrial control: fully sealed gas delivery, no water near equipment (dry chemical extinguishers only), full-face respiratory protection mandatory during any line work, and strict no-single-person rule for maintenance."
      }
    ]
  }
];
