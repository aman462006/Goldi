import type { DeepDiveSlide } from "../types";

export const textureDeepDive: DeepDiveSlide[] = [
  {
    type: "hero",
    title: "Saw Damage & Texturing",
    subtitle: "Creating the Light Trap",
    tagline: "Before a wafer can capture sunlight, it must be healed from the trauma of slicing and carved into a microscopic light trap.",
    body: [
      "When a silicon ingot is sliced into thin wafers using a diamond wire saw, the violent mechanical process leaves the surface riddled with microcracks, stress, and contaminants. This \"saw damage\" acts as a massive recombination zone where electrons and holes would immediately recombine and disappear.",
      "Furthermore, bare flat silicon acts like a mirror, reflecting over 30% of incoming sunlight back into the sky.",
      "The texturing process solves both problems: first by chemically polishing away the damaged layer, and then by carving the surface into millions of microscopic pyramids that trap light."
    ],
    visual: "sawDamage",
    visualCaption: "Chemical etching removes the damaged layer from diamond wire sawing."
  },
  {
    type: "split",
    title: "Saw Damage Removal",
    subtitle: "Healing the Wafer",
    left: "To fix the mechanical damage, the wafer is submerged in a hot, concentrated alkaline bath (30-40% KOH or NaOH at 70-80°C). \n\nThis aggressive etch strips away a few micrometers from both sides of the wafer, taking the microcracks and contaminants with it.\n\nThe reaction: \nSi + 2OH⁻ + 2H₂O → SiO₂(OH)₂²⁻ + 2H₂↑\n\nWhile this creates a pristine, stress-free surface, it leaves the wafer completely flat and highly reflective—like a mirror. If we stopped here, 30% of the sun's energy would simply bounce off.",
    visual: "sawDamage",
    visualCaption: "High concentration alkaline etch leaves a flat, shiny surface."
  },
  {
    type: "split",
    title: "Alkaline Texturing",
    subtitle: "Anisotropic Etching",
    left: "To stop reflection, we must turn the mirror into a light trap. For monocrystalline silicon, we use a much weaker alkaline solution (1-2% KOH) mixed with an additive like isopropanol (IPA).\n\nUnlike the aggressive saw damage removal, this weak etch is 'anisotropic'—it attacks different crystal directions at different speeds. \n\nBecause of atomic packing densities, the (110) and (100) crystal planes etch up to 30 times faster than the dense (111) planes.",
    right: "Because the etch halts when it hits a (111) plane, the surface naturally resolves into millions of microscopic square-based pyramids, with the (111) planes forming the slanted faces.\n\nThese pyramids are usually 1 to 5 micrometers wide. \n\nThe additive (IPA or a proprietary organic) acts as a surfactant, lowering surface tension so the hydrogen gas bubbles created by the reaction don't stick to the surface and block the etching."
  },
  {
    type: "split",
    title: "The Light Trapping Effect",
    subtitle: "Bouncing Light",
    left: "When light hits a flat surface, it bounces once and escapes. \n\nWhen light hits a pyramid-textured surface, the slanted walls force the reflected light to hit an adjacent pyramid rather than escaping into the sky. \n\nThis gives the silicon a second or third chance to absorb the photon. \n\nThis simple geometric trick reduces the raw reflection of the silicon from ~30% down to ~11%. (Later, an anti-reflection coating will drop this to under 2%).",
    visual: "lightTrapping",
    visualCaption: "Multiple bounces increase the probability of photon absorption."
  },
  {
    type: "content",
    title: "Acid Texturing",
    subtitle: "For Multicrystalline Silicon",
    bullets: [
      {
        label: "The Multicrystalline Problem",
        text: "Alkaline texturing relies on a uniform crystal lattice to form uniform pyramids. Multicrystalline silicon wafers are made of thousands of random crystal grains facing different directions. An alkaline etch would create pyramids on some grains, but leave others completely flat."
      },
      {
        label: "The Acid Solution",
        text: "Instead of alkaline, multicrystalline wafers are textured using a mixture of Hydrofluoric (HF) and Nitric (HNO₃) acids. This is an 'isotropic' etch, meaning it eats the silicon at the same speed in every direction, regardless of the crystal orientation."
      },
      {
        label: "The Reaction",
        text: "HNO₃ oxidizes the silicon into SiO₂, and then HF immediately dissolves the SiO₂. This creates a surface covered in microscopic, rounded 'scallops' or 'wormholes' rather than sharp pyramids."
      },
      {
        label: "The Porous Silicon Risk",
        text: "Acid texturing can sometimes leave behind a spongy, porous silicon layer that is highly defective and difficult to passivate. A quick dip in 1% KOH is often used to strip this porous layer away."
      }
    ]
  },
  {
    type: "steps",
    title: "The Chemical Cleaning Sequence",
    subtitle: "The Factory Flow",
    steps: [
      {
        n: "1",
        title: "Pre-Polish (SDR)",
        text: "High concentration NaOH to remove the mechanical saw damage."
      },
      {
        n: "2",
        title: "Pre-Clean",
        text: "NaOH + H₂O₂ to oxidize organic matter and dissolve the oxidation products."
      },
      {
        n: "3",
        title: "Texturing",
        text: "Low concentration NaOH + additives to form the uniform pyramid structure."
      },
      {
        n: "4",
        title: "Acid Wash",
        text: "HF + HCl to neutralize residual alkali, remove metal ions, and strip the surface oxide layer."
      },
      {
        n: "5",
        title: "Drying",
        text: "Slow pull from hot water followed by negative pressure drying to prevent water spots."
      }
    ]
  },
  {
    type: "content",
    title: "SPC Monitoring",
    subtitle: "Controlling Pyramid Uniformity",
    bullets: [
      {
        label: "Weight Loss (Primary Control)",
        text: "Every wafer is weighed before and after texturing. The target removal is 0.33 ± 0.03 g per wafer (control range) and 0.33 ± 0.06 g (circulation limit). Excessive loss means over-etching — pyramids become too large, irregular, and begin merging. Insufficient loss means the saw-damage layer is incompletely removed."
      },
      {
        label: "Reflectivity Check",
        text: "An NXT reflectometer measures five points per wafer. The target is under 8% (circulation limit). Reflectivity is the direct optical readout of texture quality — a properly formed pyramid field should deflect reflected light inward, not outward."
      },
      {
        label: "KLA 3D Microscope",
        text: "Periodically, a 3D surface profiler counts the pyramid density (~200,000 pyramids/cm² is typical) and measures the uniformity of height and base width. This is a debug tool, not a routine check for every lot."
      },
      {
        label: "Bath Concentration Monitoring",
        text: "NaOH and additive concentrations are replenished on a fixed schedule and measured every shift. As batches are processed, the sodium silicate (Na₂SiO₃) byproduct accumulates and slows the etch rate, requiring bath replacement on a periodic cycle."
      }
    ]
  },
  {
    type: "content",
    title: "Common Abnormalities & Root Causes",
    subtitle: "FMEA in Practice",
    bullets: [
      {
        label: "Poor Pyramid Morphology",
        text: "Symptom: reflectivity above 8%, pyramids too small or merged under SEM. Root cause: NaOH concentration out-of-range, bath exhausted (high Na₂SiO₃), wrong additive dosage, or temperature deviation. Fix: Re-check recipe, measure bath concentration, replace if needed, and re-texture the affected lot."
      },
      {
        label: "Front-Surface Contamination",
        text: "Symptom: yellowish or brown stains after texturing. Root cause: H₂O₂ depletion in the pre-clean tank, or insufficient replenishment allowing organic residues to persist. Fix: Check and replenish H₂O₂, inspect H₂O₂ dosing pump alarms, and re-clean affected wafers."
      },
      {
        label: "Wet Wafers at Unloader",
        text: "Symptom: water spots or wet surface visible after WAD dryers. Root cause: air-knife power too low, dryer temperature set wrong, or wafers overlapping so the air film doesn't contact the surface. Fix: Check air-knife power supply and temperature setpoints; inspect for wafer-gap compliance."
      },
      {
        label: "Concentration Abnormality (Alarm)",
        text: "Symptom: SPC chart for weight loss drifts outside the control range. Root cause: wrong bath preparation or missed replenishment cycle. This is the most common line stoppage event in texturing. Fix: Immediately stop production, characterize the bath, re-prepare if out-of-spec, and run qualification wafers before resuming."
      }
    ]
  },
  {
    type: "content",
    title: "Chemical Safety in Texturing",
    subtitle: "Hazard Awareness",
    bullets: [
      {
        label: "HF (Hydrofluoric Acid)",
        text: "The most hazardous chemical in the process. HF penetrates skin painlessly due to its small molecular size, then reacts with calcium in bones and tissues (Ca²⁺ + 2F⁻ → CaF₂), causing deep systemic burns. Even small skin exposures can be life-threatening. Always wear dedicated HF gloves, face shield, and chemical-resistant apron. Apply calcium gluconate gel immediately to any skin contact and seek medical help."
      },
      {
        label: "NaOH (Sodium Hydroxide)",
        text: "Strong base that causes deep chemical burns. The viscous solutions used in texturing (30–40% for SDR, 1–2% for texturing) cling to skin. Flush immediately with large amounts of water for at least 15 minutes. Contact with eyes is especially dangerous — flush and seek emergency treatment."
      },
      {
        label: "H₂O₂ (Hydrogen Peroxide)",
        text: "Strong oxidizer; concentrated solutions (>30%) are corrosive and react violently with organic materials. Store away from heat and UV light. Decomposition releases oxygen rapidly — keep containers vented and never seal tightly."
      },
      {
        label: "Hydrogen Gas (H₂) Evolution",
        text: "The texturing reaction generates hydrogen gas (2 NaOH + Si + H₂O → Na₂SiO₃ + 2 H₂↑). The tool exhaust system must be functioning to prevent H₂ accumulation. Hydrogen is odorless and extremely flammable (LEL 4%). Never operate tanks with exhaust fans off."
      }
    ]
  }
];
