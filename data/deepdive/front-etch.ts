import type { DeepDiveSlide } from "../types";

export const frontEtchDeepDive: DeepDiveSlide[] = [
  {
    type: "hero",
    title: "Alkaline Front Etch",
    subtitle: "Cleaning the Emitter",
    tagline: "Just like the rear etch cleaned up the parasitic boron layers, the front etch is necessary to clean up the parasitic phosphorus layers.",
    body: [
      "When we deposited the polysilicon layer and diffused phosphorus into it on the rear of the cell, gases inevitably wrapped around the edges and deposited parasitic polysilicon and phosphorus onto the front of the cell.",
      "If we left this highly conductive n-type material sitting on top of our carefully crafted p-type front emitter, the p-n junction would be ruined, and the cell would short out.",
      "The front etch is a delicate chemical bath designed to strip away these parasitic layers without destroying the underlying texturing or the p-type emitter."
    ],
    visual: "chemicalEtch",
    visualCaption: "Chemical etching strips away the unwanted PSG and parasitic poly layers."
  },
  {
    type: "split",
    title: "Impact of PSG and BSG",
    subtitle: "Why They Must Be Removed",
    left: "PSG (phosphosilicate glass) formed during POCl₃ diffusion now covers the front of the cell with a glassy dead layer. BSG (borosilicate glass) residue may also remain from the boron step.\n\nIf left in place:\n• PSG/BSG absorb atmospheric moisture → current loss and power degradation over the module's lifetime.\n• The glass is an insulator that prevents ALD and PECVD films from bonding cleanly to silicon.\n• Color differences after PECVD SiNx coating become visible — causing cosmetic rejection and potential binning losses.",
    right: "The parasitic poly-Si on the front is a deeper problem:\n• It is n⁺-doped and sits directly on top of the p⁺ boron emitter.\n• This creates a local n⁺/p⁺ junction at the front that reduces the effective Voc and lowers shunt resistance.\n• At the edges, this wrap-around creates a direct short-circuit path between the front p-side and rear n-side, causing catastrophic current leakage.\n\nRemoving these layers restores the intended p-type front emitter for efficient hole collection."
  },
  {
    type: "content",
    title: "The Chain-Type PSG Removal Mechanism",
    subtitle: "Protecting the Rear While Etching the Front",
    bullets: [
      {
        label: "Water Film as a Shield",
        text: "Before the wafer enters the HF roller zone, it passes over a DI water flood. A thin, continuous water film forms on the rear (TOPCon) side by surface tension. This water film physically blocks HF from reaching the rear PSG and poly-Si stack. The additive in the bath enhances this protective layer."
      },
      {
        label: "Capillary Roller Etching",
        text: "The wafer rides on rollers wetted with dilute HF. As the roller contacts the front edge and surface, capillary action wicks HF into microscopic contact with the PSG. The reaction SiO₂ + 6HF → H₂SiF₆ + 2H₂O dissolves the PSG glass rapidly. Because HF attacks SiO₂ (glass) but barely touches bare silicon, this step is highly selective."
      },
      {
        label: "Selectivity: Glass vs. Silicon",
        text: "HF etches SiO₂ at ~1–3 nm/s but is nearly inert to Si (etch rate ~0.1 nm/min without oxidizer). This enormous selectivity (>1000:1) means HF can completely strip the PSG glass layer while leaving the silicon pyramid texture essentially untouched."
      },
      {
        label: "Alkaline Stage for Poly Removal",
        text: "HF cannot remove the parasitic poly-Si — it is elemental silicon, not an oxide. The alkaline tank (NaOH + additive) provides the OH⁻ ions that attack Si directly (Si + 2OH⁻ + H₂O → SiO₂(OH)₂²⁻ + 2H₂↑). The additive is a proprietary polymer that preferentially adsorbs on the rear poly surface, protecting it from OH⁻ attack while leaving the front poly exposed."
      }
    ]
  },
  {
    type: "content",
    title: "The Etching Sequence",
    subtitle: "A Precise Chemical Bath",
    bullets: [
      {
        label: "Water Film Protection",
        text: "Before etching the front, the cell floats on a thin film of Deionized (DI) water. The surface tension of this water protects the rear TOPCon structure from being attacked by the etching chemicals."
      },
      {
        label: "PSG Removal (Acid)",
        text: "The wafer passes over rollers coated in Hydrofluoric acid (HF). The HF strips away the Phosphorus Silicate Glass (PSG) on the front and edges.\nReaction: SiO₂ + 6HF → H₂[SiF₆] + 2H₂O"
      },
      {
        label: "Alkaline Polish (NaOH)",
        text: "With the glass gone, a sodium hydroxide (NaOH) bath attacks the underlying parasitic polysilicon and the very top of the p-n junction, dissolving them.\nReaction: Si + 2NaOH + H₂O → Na₂SiO₃ + 2H₂"
      },
      {
        label: "Final Acid Wash (HF)",
        text: "A final HF dip removes any remaining oxide, neutralizes the alkali, and terminates the silicon surface with hydrogen bonds (Si-H). This makes the surface hydrophobic (water-repellent) so it dries cleanly without water spots."
      }
    ]
  },
  {
    type: "content",
    title: "Common Abnormalities",
    subtitle: "Defect Signatures and Root Causes",
    bullets: [
      {
        label: "Roller Marks",
        text: "Symptom: parallel dark lines across the cell surface in EL imaging, spaced at the roller pitch. Root cause: the conveyor rollers are contaminated, damaged, or incompatible with the chemistry, leaving chemical residue or physical scratches as the wafer slides over them. Fix: Replace or clean conveyor rollers on a scheduled cycle; qualify roller material compatibility with the chemistry mix."
      },
      {
        label: "White Spots (After PECVD)",
        text: "Symptom: irregular white or light-colored patches on the dark blue cell surface after the SiNx coating step. Root cause: incomplete PSG/BSG removal in front etch leaves glass islands. When the ALD/PECVD films deposit over glass rather than silicon, the optical properties differ — these patches appear white. Fix: Verify HF concentration and roller wetting; check that the water film is continuous (no gaps) over the rear protection zone."
      },
      {
        label: "Edge Current Leakage (Low Rsh)",
        text: "Symptom: shunt resistance (Rsh) measured at test is abnormally low; EL imaging shows dark spots at cell edges. Root cause: incomplete removal of the edge PN junction — residual n-type poly bridges front and rear sides. Fix: Increase NaOH concentration or extend the alkaline polish time; verify that the cell edge contacts the alkaline bath fully on all four sides."
      },
      {
        label: "Over-Etching the Front Junction",
        text: "Symptom: front sheet resistance is abnormally high after front etch; cell efficiency drops. Root cause: alkaline temperature too high, concentration too strong, or time too long — the OH⁻ has etched into the p-type boron emitter itself, reducing its depth. Fix: Reduce temperature or NaOH concentration; measure weight loss after polishing (target >0.6 g total — over-etch shows excessive weight loss)."
      }
    ]
  },
  {
    type: "split",
    title: "Process Control (SPC)",
    subtitle: "Balancing the Etch",
    left: "This process requires extreme precision. \n\nIf the etch time is too short, or the NaOH concentration is too low, the parasitic layers are not fully removed. This results in edge current leakage, lowering the cell's fill factor and voltage.\n\nIf the etch time is too long, or the temperature is too high, the chemical bath will eat completely through the p-type emitter, destroying the p-n junction entirely.",
    right: "Operators monitor this process by checking:\n1. Weight Loss: Weighing wafers before and after to ensure exactly >0.6 grams of material was removed from the alkaline polish tank. Too low = incomplete poly removal; too high = over-etching.\n2. Hydrophobicity: Dropping water on the finished front surface. If the water beads up perfectly without spreading, the oxide is completely gone and the silicon is properly hydrogen-terminated (Si-H).\n3. Appearance: Random patrol checks to look for white spots, roller marks, and color uniformity."
  }
];
