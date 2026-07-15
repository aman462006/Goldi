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
  },
  {
    type: "content",
    title: "PFMEA & Quality Tools",
    subtitle: "Structured Risk Management",
    bullets: [
      {
        label: "What is PFMEA?",
        text: "Process Failure Mode and Effects Analysis — a structured table that lists everything that could go wrong in a process step, its cause, its consequence, and the controls in place to prevent or detect it. Every process step in the TOPCon line has its own PFMEA review."
      },
      {
        label: "What is RPN?",
        text: "Risk Priority Number — a score calculated as Severity × Occurrence × Detection. It ranks how urgent each identified risk is. Higher RPN items are prioritised for corrective action first. For texturing, the highest-RPN risks are machine drive-system failure and poor workshop air cleanliness (both RPN 120)."
      },
      {
        label: "What is SPC?",
        text: "Statistical Process Control — regularly sampling measurements (weight loss, reflectivity) and plotting them on control charts against defined limits. The purpose is to catch a process drift early, before it produces scrap, rather than discovering problems only at final test. The philosophy: catch problems at the source."
      }
    ]
  },
  {
    type: "content",
    title: "AGV, Boats & AOI",
    subtitle: "Automation and Inspection",
    bullets: [
      {
        label: "What is an AGV?",
        text: "An Automated Guided Vehicle — a self-driving cart that transports wafer cassettes between machines along predetermined paths on the factory floor. AGVs carry 450 wafers per cassette at the texturing station, eliminating manual handling between process tools."
      },
      {
        label: "What is a Boat?",
        text: "A carrier that holds many wafers standing parallel so chemicals or gas can reach every wafer surface simultaneously. In texturing, qualified wafers are inserted into boats at 120 wafers per boat; every 6 boats form one batch processed through the machine's 3 texturing tanks at once."
      },
      {
        label: "What is AOI at Load/Unload?",
        text: "Automated Optical Inspection — a camera system at the loader and unloader that photographs each wafer and uses software to automatically detect defects such as missing pieces, chipped corners, and cracked edges. Defective wafers are rejected before they waste further processing resources. Post-texture AOI checks every wafer in the boat at unloading."
      }
    ]
  },
  {
    type: "content",
    title: "Why the Additive Matters",
    subtitle: "Surface Tension and Pyramid Uniformity",
    bullets: [
      {
        label: "What the Additive Controls",
        text: "The additive raises the solution's viscosity and lowers surface tension so the etching reaction proceeds evenly rather than randomly across the wafer surface. Without it, pyramid size and distribution varies dramatically from wafer to wafer and even within a single wafer."
      },
      {
        label: "Hydrogen Bubble Management",
        text: "Hydrogen gas is a byproduct of the texturing reaction. If bubbles cling to the surface, they mask that spot from the etchant — leaving islands with no pyramids. The additive helps hydrogen bubbles detach cleanly and quickly, keeping the reaction uniform. Bubble density, size, and residence time on the surface are the key variables the additive controls."
      },
      {
        label: "Wafer-to-Wafer Consistency",
        text: "By controlling reaction rate and surface tension simultaneously, the additive keeps pyramid morphology consistent across all wafers in a batch. Additive concentration is one of the SPC-monitored parameters — even small drifts in concentration shift pyramid shape and reflectivity outside the target range."
      }
    ]
  },
  {
    type: "table",
    title: "Complete Process Parameters",
    subtitle: "Industrial Reference Values",
    note: "All values reflect typical high-volume TOPCon manufacturing practice. Exact setpoints vary by equipment supplier and cell architecture.",
    headers: ["Parameter", "Value / Range", "Why It Matters"],
    rows: [
      ["SDR KOH concentration", "30–40 wt%", "Aggressive enough to remove saw damage quickly; higher than texturing to avoid anisotropic etch"],
      ["SDR temperature", "70–80 °C", "Drives rapid reaction; lower temperature would require longer immersion with same chemical exposure"],
      ["Texture KOH concentration", "1–2 wt%", "Low enough for anisotropic (crystal-plane-selective) etching to form pyramids"],
      ["Texture temperature", "70–80 °C", "Optimal for etch rate ratio (100) vs (111) > 25:1"],
      ["Additive concentration", "Proprietary (typically 0.1–0.5 vol%)", "Controls bubble detachment and surface tension; directly affects pyramid uniformity"],
      ["Pyramid height / base", "1–5 µm base, similar height", "Too large: peaks merge, reflectance rises; too small: fewer multiple bounces"],
      ["Target reflectance", "< 8% (circulation limit)", "Direct optical quality indicator; upper limit triggers process stop"],
      ["Weight loss (control)", "0.33 ± 0.03 g/wafer", "Tight control band — drift indicates bath exhaustion or recipe deviation"],
      ["Weight loss (spec limit)", "0.33 ± 0.06 g/wafer", "Wider allowed band; exceeding triggers immediate bath review"],
      ["HF post-clean concentration", "0.5–1 wt%", "Removes metal ions and neutralises alkali residue; leaves hydrogen-terminated surface"],
      ["DI water resistivity", "> 15 MΩ·cm", "High resistivity confirms absence of ionic contamination in rinse water"],
      ["Dryer temperature", "40–60 °C air", "Hot air prevents water spots; must be matched to conveyor speed"],
    ],
  },
  {
    type: "content",
    title: "Atomic-Level Mechanism of Anisotropic Etching",
    subtitle: "What Happens to Silicon Bonds at the Crystal Surface",
    bullets: [
      {
        label: "Silicon Crystal Structure",
        text: "Crystalline silicon adopts a diamond cubic structure. Each silicon atom forms four tetrahedral covalent bonds with neighbors. When you cut the crystal to form a wafer, you break these bonds at the surface. The orientation (100) means the cut is perpendicular to the [100] crystallographic direction — exposing a surface where atoms have 2 dangling bonds each."
      },
      {
        label: "Why (100) Etches Fast",
        text: "In the (100) plane, each surface silicon atom has two dangling bonds and only two bonds holding it to the crystal below. This low 'coordination' means OH⁻ ions need only break two bonds to detach each atom. The etch rate is high. The reaction Si + 2OH⁻ + 2H₂O → Si(OH)₂O₂²⁻ + 2H₂ is energetically favoured because the products are stable silicate species."
      },
      {
        label: "Why (111) Etches Slowly",
        text: "In the (111) plane, each surface atom is held by three bonds into the crystal beneath — a much more stable configuration. OH⁻ ions must break three bonds to detach each atom, which is statistically far less likely. The ratio of (100):(111) etch rates is typically 25–35:1 under texturing conditions. When the etch reaches a (111) plane, it effectively stops, and this self-terminating behaviour is what causes the pyramid shape to form naturally."
      },
      {
        label: "Role of Temperature on the Etch Rate Ratio",
        text: "Increasing temperature above 80°C reduces the etch rate anisotropy — the ratio approaches 1:1 as all reactions accelerate toward equilibrium. This is why texturing must stay within a narrow temperature window: too hot and the (111) plane begins to etch significantly, rounding or destroying the pyramid tips. Too cold slows the reaction to impractical speeds. The 70–80°C window maintains the high anisotropy ratio needed for sharp, well-defined pyramids."
      }
    ]
  },
  {
    type: "content",
    title: "Optical Physics of the Textured Surface",
    subtitle: "Why Multiple Reflections Trap Light",
    bullets: [
      {
        label: "Fresnel Reflection from a Flat Surface",
        text: "At normal incidence, bare silicon reflects approximately 30% of light at its surface (governed by the Fresnel equation: R = ((n₁-n₂)/(n₁+n₂))² where n_Si ≈ 3.5, n_air = 1). This is a fixed material property — no surface treatment can change it. The texturing solution is not to reduce this first reflection but to give the reflected photon a second chance to enter the silicon."
      },
      {
        label: "Double-Bounce Geometry",
        text: "A (111) pyramid face is inclined at 54.7° from the wafer surface. When light hits this face at an angle, the reflected ray is deflected toward the adjacent pyramid face (not back into the sky). At the second pyramid face, the photon has another ~30% chance of reflecting again but now back inward. Statistical analysis shows the average photon makes 2–3 surface interactions before escaping, reducing effective reflectance from 30% to ~10–12%. Adding the ARC later brings this to under 2%."
      },
      {
        label: "Path Length Enhancement",
        text: "Beyond reducing reflection, the angled pyramid faces refract transmitted light at a steep angle into the silicon — increasing the path length through the absorber. A photon entering at 54.7° travels √2 times longer through the silicon than a normally incident photon. For weakly absorbed near-infrared photons (>900 nm), this path length increase can double the absorption probability per pass, directly raising Isc."
      },
      {
        label: "Limitation: Pyramid Size vs Wavelength",
        text: "Geometric optics analysis is valid when pyramid dimensions >> wavelength. For 1–5 µm pyramids and visible light (400–700 nm), geometric optics gives reasonable predictions. For ultraviolet light (<400 nm), wave optics effects become significant. For this reason, some advanced cell designs use nano-scale textures optimised for UV response, though these are currently not commercial."
      }
    ]
  },
  {
    type: "faq",
    title: "Frequently Asked Questions",
    subtitle: "Interview Preparation & Technical Deep Dive",
    questions: [
      {
        q: "Why do pyramids form on monocrystalline silicon but not multicrystalline with the same etchant?",
        a: "Alkaline etching is anisotropic — it selectively attacks crystal planes based on atomic packing density. The (100) plane etches 25–35× faster than the (111) plane. Monocrystalline wafers have a uniform [100] orientation throughout, so pyramids form consistently everywhere. Multicrystalline silicon contains thousands of randomly oriented grain domains: some grains present a (100) face and form pyramids, others present (111) or (110) faces and remain flat. The result is catastrophic non-uniformity. Acid texturing (HF+HNO₃ isotropic attack) is used instead for multicrystalline to create round scallops that work on all orientations."
      },
      {
        q: "What happens to cell efficiency if texturing reflectance is 12% instead of the target <8%?",
        a: "Reflectance directly drives short-circuit current (Isc). Every 1% increase in reflectance loses ~0.4 mA/cm² of Isc. Going from 8% to 12% reflectance reduces Isc by roughly 1.6 mA/cm² — about 1% absolute cell efficiency. Additionally, non-uniform reflectance (some wafers at 12%, some at 6%) creates binning problems because cells of different Isc values cannot be mixed in a panel without causing current mismatch losses."
      },
      {
        q: "What is the purpose of the pre-clean (NaOH + H₂O₂) step before texturing?",
        a: "The pre-clean serves two purposes: (1) oxidise and dissolve organic contamination from wafer handling, packaging wax, and cutting coolant that would block the texturing etch locally; and (2) slightly oxidise the silicon surface with a fresh, uniform SiO₂ layer. This uniform oxide ensures the subsequent texturing starts from a clean, consistent surface condition rather than from a patchy saw-damaged one — producing more uniform pyramid nucleation sites."
      },
      {
        q: "Why is KOH sometimes preferred over NaOH for texturing in some fabs?",
        a: "KOH produces slightly more uniform pyramid morphology compared to NaOH at the same concentration and temperature, because K⁺ ions interact with the silicon surface somewhat differently than Na⁺. However, KOH is harder to handle (more corrosive to aluminium equipment) and Na⁺ contamination from NaOH is easily removed in the subsequent HF/HCl acid wash. Most modern high-volume lines use NaOH for economic and compatibility reasons, accepting the small morphology difference."
      },
      {
        q: "What is 'bath exhaustion' in texturing and how is it detected early?",
        a: "As the texturing bath processes batches, the reaction Si + 2NaOH + H₂O → Na₂SiO₃ + 2H₂ accumulates sodium silicate (Na₂SiO₃) as a byproduct. This silicate competes with OH⁻ for the silicon surface, progressively slowing the etch rate — this is bath exhaustion. Symptoms include: weight loss per batch gradually declining toward the control limit, reflectivity trending upward, and pyramid density visibly decreasing. Bath conductivity measurement is an early indicator since silicate concentration correlates with conductivity. Fab practice is to replenish NaOH on a dosing schedule and replace the bath entirely at a fixed number of batches."
      },
      {
        q: "What does 'weight loss' tell us that reflectance measurement does not?",
        a: "Weight loss measures how much silicon was removed — it probes the process side (chemistry, etch rate). Reflectance measures the optical outcome — it probes what actually formed on the surface. Both are needed: weight loss within spec but high reflectance might mean the pyramids formed correctly (right amount of silicon removed) but are uniform-height truncated frustums rather than complete pyramids — suggesting additive issue rather than concentration issue. Reflectance within spec but low weight loss suggests the bath attacked the texture non-uniformly, or a prior process step contaminated some areas. Having both metrics allows root-cause distinction."
      },
      {
        q: "Why can't we just apply an anti-reflection coating to a flat silicon wafer and skip texturing?",
        a: "An ARC on flat silicon reduces reflection to ~4–5% (from 30%), which is good but not optimal. Texturing + ARC together reduce reflection below 2% for two reasons: (1) the pyramids already reduce first-bounce reflection, so the ARC only needs to eliminate the remaining ~10–12%; (2) at angles, texturing is far more effective than an ARC because the ARC works best at normal incidence and degrades at steep angles. Additionally, texturing provides path length enhancement (longer journey through silicon for IR photons), which no ARC can replicate. A flat cell with ARC loses 0.5–1% absolute efficiency compared to a textured cell with ARC."
      },
      {
        q: "What is the 'acid wash' HF/HCl step at the end of texturing and why are both acids used?",
        a: "HF removes SiO₂ — it strips the thin oxide and any silicate byproduct from the texturing bath, leaving a hydrogen-terminated (hydrophobic) silicon surface. HCl targets metallic impurities: it dissolves metal hydroxide precipitates that may have formed from alkali solution and removes metal ions (Fe²⁺, Cu²⁺, Al³⁺) from the surface by forming soluble metal chlorides. NaOH residues could precipitate Na-silicates in later steps; alkali metal ions (Na⁺, K⁺) are particularly damaging because they act as mobile ionic contaminants that penetrate oxides and degrade passivation. The final HCl rinse removes them all."
      }
    ]
  }
];
