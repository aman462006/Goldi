import type { DeepDiveSlide } from "../types";

export const testDeepDive: DeepDiveSlide[] = [
  {
    type: "hero",
    title: "Testing & Sorting",
    subtitle: "The Final Exam",
    tagline: "Before a solar cell can be packaged into a module and sent to a solar farm, it must undergo a rigorous barrage of optical and electrical tests to guarantee its performance and reliability.",
    body: [
      "Every single cell produced on a manufacturing line is tested and sorted. There is no batch sampling for final efficiency.",
      "Cells are bombarded with intense light to measure their power output, scanned by infrared cameras to look for microscopic defects, and inspected by machine vision for physical damage.",
      "Based on these results, cells are binned into different efficiency and color grades so that perfectly matched cells are used together in the final solar panel."
    ],
    visual: "elTesting",
    visualCaption: "Electroluminescence testing reveals invisible defects."
  },
  {
    type: "content",
    title: "Optical Inspection",
    subtitle: "The Eyes of the Factory",
    bullets: [
      {
        label: "AOI (Automatic Optical Inspection)",
        text: "High-speed cameras photograph every cell to check for physical defects. It looks for chipped edges, microcracks, missing or broken silver fingers, and misaligned printing. The AOI system uses HSV color space template matching to distinguish cell regions and detect structural anomalies that would cause in-field failures."
      },
      {
        label: "Color Sorting",
        text: "The exact thickness of the anti-reflection coating (SiNx) dictates the color of the cell (usually dark blue or black). Even a 2 nanometer difference in thickness causes a visible color shift. AOI sorts cells by exact color hue so finished panels look uniform on a roof."
      },
      {
        label: "PL (Photoluminescence)",
        text: "The cell is blasted with a high-intensity laser (typically 808 nm or 980 nm). The silicon absorbs the energy and re-emits a faint near-infrared glow (~1100 nm). Cameras capture this glow to map out the 'minority carrier lifetime' — essentially measuring how long an electron survives before recombining. PL can be used at any process step, even before metallization."
      }
    ]
  },
  {
    type: "split",
    title: "PL — Photoluminescence Principles",
    subtitle: "Non-Contact Lifetime Mapping",
    left: "When above-bandgap laser light excites the silicon, electron-hole pairs are generated. In high-lifetime regions, these pairs recombine radiatively (emitting photons at ~1100 nm) before they can find a defect. The emitted photon count is proportional to the minority carrier density.\n\nHigh-quality silicon → high PL signal (bright image).\nDefective silicon → low PL signal (dark image).",
    right: "PL is powerful because it is completely non-contact and non-destructive. It can be used at every process step:\n• After texturing: lifetime maps reveal saw-damage hot spots.\n• After diffusion: non-uniform doping shows as brightness variation.\n• After passivation: ALD/PECVD quality visible as lifetime contrast.\n• After firing: contact-induced recombination shows as dark lines.\n\nPL images are compared to process-step benchmarks to identify whether defects were introduced in the current or a prior step."
  },
  {
    type: "split",
    title: "Electroluminescence (EL)",
    subtitle: "X-Ray for Solar Cells",
    left: "Electroluminescence (EL) imaging is essentially running the solar cell in reverse. \n\nInstead of shining light on the cell to extract electricity, we pump electricity into the cell in the dark at a controlled forward bias (~0.5–0.6 V, similar to Vmpp).\n\nAs the injected electrons and holes recombine inside the silicon, they emit infrared light (~1100–1200 nm). An InGaAs or Si CCD camera captures this emission to create a spatially resolved image of the cell's internal health.",
    right: "A healthy, highly efficient area of the cell will glow brightly and uniformly. \n\nDefective areas — where microcracks, shunts, impurities, or poor contacts cause electrons to recombine non-radiatively (as heat instead of light) — appear as dark black spots, dead zones, or bright shunting points.\n\nEL is the ultimate diagnostic tool:\n• Dark spots = high recombination or broken contacts\n• Bright spots = shunts (local forward-biased junctions)\n• Dark fingers = broken/high-resistance contact lines\n• Edge darkening = incomplete edge isolation"
  },
  {
    type: "content",
    title: "EL Defect Classification",
    subtitle: "Reading the EL Image",
    bullets: [
      {
        label: "Uniform Dark Area",
        text: "Indicates a region of very high recombination — usually a crystal defect (dislocation, grain boundary in mc-Si), a surface contamination spot, or a region with failed passivation. In TOPCon cells, this often traces back to incomplete ALD coverage or a contamination event."
      },
      {
        label: "Dark Lines Along Fingers",
        text: "Points to broken or open-circuit metal fingers. Current cannot flow along the broken section, so the local minority carrier density stays high but has nowhere to go — that column of silicon goes dark. Root cause: clogged screen mesh, wafer microcrack under a finger, or spiking during firing that locally destroyed the emitter."
      },
      {
        label: "Edge Darkening",
        text: "Indicates residual edge junction shunting — the front p-type and rear n-type are still electrically connected at the perimeter. This means front-etch edge isolation was incomplete. The shunt path leaks current in reverse, reducing Rsh and suppressing EL near the edges."
      },
      {
        label: "Bright Spots (Shunts)",
        text: "Unusually bright localized areas indicate local shunts — paths where forward-biased current flows through a defect in the junction (metal spike through the junction, process contamination, or a pore in the SiNx). Shunts lower Rsh dramatically and appear as a hot spot in dark I-V measurements."
      }
    ]
  },
  {
    type: "content",
    title: "Electrical Testing (I-V Curve)",
    subtitle: "Measuring Power Output",
    bullets: [
      {
        label: "The Sun Simulator",
        text: "The cell is flashed with a xenon lamp that perfectly mimics the AM1.5G solar spectrum at exactly 1000 W/m² intensity (Standard Test Conditions: 25°C cell temperature). The flash duration is typically 5–20 ms — short enough that the cell doesn't heat up significantly during the measurement."
      },
      {
        label: "Voltage (Voc) & Current (Isc)",
        text: "The machine measures the Open Circuit Voltage (Voc) and Short Circuit Current (Isc). Voc tells us how good the surface passivation and junction quality is — it is set by the dark recombination current (J0). Isc tells us how well the cell absorbs light and collects carriers — it is limited by optical losses (reflection, absorption) and collection efficiency."
      },
      {
        label: "Series Resistance (Rs)",
        text: "Calculated from the I-V curve by comparing measurements under 1000 W/m² and 500 W/m² illumination. High Rs means the silver paste was printed too thin, not fired hot enough (poor glass frit penetration), or has a high contact resistivity. High Rs reduces fill factor (FF) by causing voltage to drop across the metal resistance."
      },
      {
        label: "Shunt Resistance (Rsh)",
        text: "Derived from the slope of the dark I-V curve near zero current. High Rsh is good (ideal ≈ ∞). Low Rsh means electricity is leaking backward through the cell: shunts from silver spiking through the junction, edge isolation failure, or crystal defects that bridge the junction. Low Rsh lowers Voc and FF simultaneously."
      }
    ]
  },
  {
    type: "content",
    title: "IV Curve Parameters Explained",
    subtitle: "What Each Number Tells You",
    bullets: [
      {
        label: "Fill Factor (FF)",
        text: "FF = Pmpp / (Voc × Isc). It represents how 'square' the IV curve is — how close the cell operates to its ideal maximum power point. A perfect cell with no resistance losses would have FF = 1.0. Typical TOPCon cells achieve FF ≈ 83–85%. FF is reduced by both high Rs (curve bends near Vmpp) and low Rsh (curve has non-zero slope near Isc)."
      },
      {
        label: "Efficiency (η)",
        text: "η = Pmpp / (Pin × Area). This is the headline number. The certified world-record η for TOPCon is 27.79 % (JinkoSolar, ISFH-certified, Nov 2025), edging past HJT's 27.08 % record (Trina Solar, Dec 2024). Commercial TOPCon production lines run at 24–25.5 %. Even a 0.1 % absolute efficiency difference corresponds to significant revenue over a 30-year module lifetime."
      },
      {
        label: "Irev1 and Irev2",
        text: "Reverse current measured at −10 V (Irev1) and −12 V (Irev2). High reverse current indicates weak avalanche breakdown paths — usually from surface damage, metallic shunts, or edge contamination. Irev1 and Irev2 correlate with shunt resistance and predict long-term degradation risk."
      },
      {
        label: "Bifaciality",
        text: "TOPCon cells generate current from both sides. Bifaciality factor (typically 75–85% for TOPCon) is measured by illuminating the rear at 1000 W/m² and dividing the resulting Isc by the front Isc. Higher bifaciality means more energy harvest in bifacial module installations."
      }
    ]
  },
  {
    type: "content",
    title: "Reliability Testing",
    subtitle: "Predicting 30-Year Lifetime",
    bullets: [
      {
        label: "CID (Carrier-Induced Degradation)",
        text: "N-type TOPCon cells can degrade under combined carrier injection and elevated temperature — analogous to LID in p-type PERC, but with a different mechanism. The HOC-CID tester stresses cells at 110°C with 0.5 A forward current for 8 hours. Target: average degradation ≤ 0.6%, single-cell ≤ 1.2%."
      },
      {
        label: "LeTID (Light and Elevated Temperature Induced Degradation)",
        text: "A separate degradation mode where minority-carrier injection at elevated temperature (70°C) and light exposure (1000 W/m²) causes bulk recombination-center activation. Test condition: 5 kWh total energy dose. Target: average ≤ 0.6%, single ≤ 1.0%."
      },
      {
        label: "PID (Potential Induced Degradation)",
        text: "In a module string, cells are exposed to large voltage potentials relative to the grounded frame. PID accelerates leakage current through the encapsulant and glass, causing surface damage. Test: double-85 condition (85°C, 85% RH, −1500 V, 96 or 192 h). TOPCon cells are generally more PID-resistant than PERC due to the SiNx/Al₂O₃ double barrier on the front."
      },
      {
        label: "Pull Force Test",
        text: "Measures the adhesion strength of the silver busbar contacts using a mechanical peel fixture. Target: front busbar ≥ 1 N average, ≥ 0.8 N minimum, ≤ 2 failed measurement points per cell. Poor pull force predicts ribbon delamination in module soldering and field failures."
      }
    ]
  },
  {
    type: "content",
    title: "Troubleshooting Trees",
    subtitle: "Systematic Diagnosis From Final Test to Root Cause",
    bullets: [
      {
        label: "What is a Troubleshooting Tree?",
        text: "A troubleshooting tree is a structured, branching diagnostic tool used in solar cell manufacturing. You start from an observed final electrical symptom (such as a low Isc reading, low Voc, high Rs, or low Rsh) and follow a series of yes/no branches that narrow down the potential root cause to a specific upstream process step. This prevents engineers from randomly adjusting parameters and instead forces a systematic search."
      },
      {
        label: "Low Isc Troubleshooting Tree",
        text: "Low short-circuit current means fewer photons are being converted to electrons — either because light is being lost before it enters the cell, or generated carriers are being lost before they reach the contacts. The tree first asks: is the front ARC colour correct? If not → PECVD thickness deviation. Is texturing uniform? If not → texture uniformity or additive issue. Is the boron emitter sheet resistance within spec? If not → boron diffusion deviation. Is the front etch complete? If not → PSG residue blocking light. Following these branches turns a vague low-Isc failure into a specific upstream step to investigate."
      },
      {
        label: "Low Voc Troubleshooting Tree",
        text: "Low open-circuit voltage means excessive carrier recombination somewhere in the cell. The tree first asks: does EL show edge darkening? If yes → front etch edge isolation incomplete. Does EL show uniform dark area (not edge)? If yes → passivation failure (ALD or PECVD). Does the PL image show bulk lifetime reduction? If yes → contamination or firing overdose. Is firing temperature at spec? If not → firing profile deviation. The tree converts a single low-Voc reading into actionable root causes across ALD, PECVD, front etch, and firing."
      },
      {
        label: "Why Trees Beat Random Adjustment",
        text: "In a 10-step process, randomly changing parameters when a problem appears risks introducing a new problem while failing to fix the original. Troubleshooting trees enforce causal logic: every upstream step has a known electrical signature in the final I-V curve and EL/PL image. By reading those signatures systematically, engineers locate root causes in minutes instead of days — and fix the right thing, not a random guess."
      }
    ]
  },
  {
    type: "content",
    title: "Why Every Step Determines Final Efficiency",
    subtitle: "The Chain From Photon to Power",
    bullets: [
      {
        label: "The Light Capture Chain",
        text: "Final Isc depends on how many photons actually enter the silicon. Texturing determines how well the front pyramid structure traps light; PECVD determines the ARC optical properties. A problem in either step directly reduces Isc. PFMEA for texturing and PECVD both carry high RPN values precisely because their impact on light capture is irreversible — no later step can un-reflect a photon that bounced off the cell."
      },
      {
        label: "The Carrier Lifetime Chain",
        text: "Voc and FF depend on how long photogenerated carriers survive before recombining. Boron diffusion sets the emitter quality; ALD passivates the rear surface; PECVD provides surface and bulk hydrogen passivation during firing; firing itself must be precisely controlled to avoid silver spiking through the junction. Every one of these steps contributes independently to the total recombination rate. Weakness in any single step lowers the minority-carrier lifetime — and that loss cannot be recovered downstream."
      },
      {
        label: "The Collection Chain",
        text: "Even perfectly generated, long-lived carriers must still be collected. The n/n⁺ back surface field built by POCl₃ diffusion pushes minority carriers toward the front junction. The screen-printed silver contacts must fire through the SiNx without over-spiking. The busbar must connect fingers without introducing recombination. Each collection step is an efficiency multiplier — not an adder — meaning deficiencies compound rather than add."
      },
      {
        label: "Why SPC and PFMEA Exist",
        text: "Because every process step contributes multiplicatively to final efficiency, no single step can be treated as unimportant. SPC keeps each step operating at its optimal target with early-warning detection of drift. PFMEA quantifies the risk (RPN = Severity × Occurrence × Detection) so engineering resources are directed at the steps where failures are most severe, most likely, and hardest to detect. Together, they ensure that the full chain — texturing through testing — operates within the narrow window that produces commercial cells above the efficiency threshold."
      }
    ]
  },
  {
    type: "table",
    title: "Final Test Parameter Reference",
    subtitle: "Standard Test Conditions and Key Metrics",
    headers: ["Parameter", "Value / Target", "Significance"],
    rows: [
      ["Standard Test Condition (STC)", "1000 W/m², AM1.5G, 25°C cell temp", "Universal benchmark — all cells worldwide compared at identical conditions"],
      ["Flash duration", "5–20 ms xenon flash", "Short enough to avoid cell heating during measurement; long enough for stable I-V sweep"],
      ["Commercial TOPCon η", "24.0–25.5% (production average)", "Current state-of-the-art; world record 27.79% (JinkoSolar, ISFH, 2025)"],
      ["Voc typical range", "720–740 mV", "Higher Voc = better passivation and lower J₀; PERC Voc typically 680–690 mV"],
      ["Isc typical range", "13.5–14.5 A (M10 wafer)", "Higher Isc = better ARC and less surface recombination"],
      ["Fill Factor target", "82–85%", "Limited by Rs (high → lower FF) and Rsh (low → lower FF)"],
      ["Series resistance (Rs) target", "< 2.0 mΩ·cm²", "Higher Rs from poor contact formation; reduces FF by ~1% per 0.5 mΩ·cm² increase"],
      ["Shunt resistance (Rsh) target", "> 200 Ω·cm²", "Lower Rsh from shunting; reduces Voc and FF simultaneously"],
      ["EL forward bias voltage", "~0.5–0.6 V (Vmpp)", "Mimics operating condition; Ag crystallite quality and junction integrity revealed"],
      ["PL wavelength", "~1100 nm (emitted by Si)", "Below-bandgap emission from radiative recombination; maps minority carrier lifetime"],
      ["CID test condition", "110 °C, 0.5 A, 8 hours", "Accelerated stress for n-type carrier-induced degradation; target < 0.6% average"],
      ["Bifaciality factor", "75–85% (TOPCon)", "Rear Isc / Front Isc × 100%; higher = more energy from bifacial installation"],
    ],
  },
  {
    type: "faq",
    title: "Frequently Asked Questions",
    subtitle: "Interview Preparation & Technical Deep Dive",
    questions: [
      {
        q: "What is Standard Test Condition (STC) and why must every measurement use it?",
        a: "STC is a universally agreed reference condition: 1000 W/m² irradiance with the AM1.5G spectrum (the solar spectrum filtered through 1.5 atmospheres of air at 37.5° latitude), and a cell temperature of exactly 25°C. Solar cell efficiency varies with: (1) irradiance — linearly proportional to Isc; (2) temperature — Voc decreases ~2 mV/°C and efficiency drops 0.3–0.4%/°C for TOPCon (the temperature coefficient); (3) spectrum — different cell types have different spectral responses. Without a common reference, a cell measured on a hot day in India would show much lower efficiency than the same cell measured in a cold lab — making global commercial comparison impossible. Every certified cell datasheet, every power purchase agreement, and every module warranty is referenced to STC."
      },
      {
        q: "Why does electroluminescence (EL) reveal defects that cannot be seen optically or by four-point probe?",
        a: "EL uses the cell itself as a spatially resolved recombination map. When forward-biased, each local region emits IR photons proportional to the local carrier injection level. Areas with high-quality semiconductor and good contacts emit brightly (long carrier lifetime, low recombination). Defective areas emit dimly or not at all: (1) microcracks break the local circuit, so no current flows in that line → dark line; (2) shunts divert current before it reaches surrounding areas → surrounding region appears dark; (3) metal-free areas where current must spread laterally through thin poly-Si → appear slightly dimmer if sheet resistance is high. Four-point probe cannot spatially locate which finger broke. Optical inspection cannot see sub-surface microcracks. EL sees all three with millimetre spatial resolution across the entire 210 mm cell in one image."
      },
      {
        q: "What is the difference between Irev1 and Irev2 and what do they indicate about cell quality?",
        a: "Irev1 is the reverse leakage current measured at −10 V applied voltage; Irev2 at −12 V. At these large reverse biases, avalanche breakdown or shunting causes current to flow backward through any weak points in the junction. Low Irev (< 1–2 A) indicates the junction is defect-free and no shunt paths exist. High Irev indicates: metallic shunt paths (silver spikes), edge conduction from incomplete isolation, or crystal defects that act as localized avalanche sites. Irev measurements are extremely sensitive to cell quality — they can detect shunts that don't appear in standard I-V measurements at the working voltage range. High Irev1/Irev2 values correlate with PID (potential-induced degradation) susceptibility and predict higher degradation rates in field conditions where high negative voltages appear across cells in a string."
      },
      {
        q: "What is TOPCon's Carrier-Induced Degradation (CID) and why is it unique to n-type cells?",
        a: "CID occurs when simultaneous carrier injection (from light or forward current) and elevated temperature activate latent defects in the silicon bulk. In n-type silicon, the primary mechanism is hydrogen-related: interstitial hydrogen that is electrically neutral under normal conditions becomes trapped at crystal defects (e.g., vacancy clusters, metal-H complexes) forming recombination-active defect complexes. This only occurs under simultaneous injection + heat — neither alone is sufficient. P-type PERC cells suffer LID (boron-oxygen complexes form under light + heat, degrading by 1–3% in first hours), but LID is irrelevant for n-type silicon which has no boron-oxygen pathways. N-type cells are essentially LID-immune but can suffer CID instead. The HOC-CID test (110°C, 0.5 A forward bias, 8 hours) is the accelerated stress protocol to certify that CID remains within acceptable bounds (<0.6% average efficiency loss)."
      },
      {
        q: "Why is bifaciality measured and what determines the bifaciality factor for TOPCon?",
        a: "Bifaciality (η_rear/η_front × 100%) is commercially critical because bifacial modules are installed over reflective ground (white gravel, concrete, snow) and collect diffuse ground-reflected light from the rear. A 75% bifaciality factor means 750 W/m² on the rear surface generates the same current as 1000 W/m² on the front — in the field, this can increase annual energy yield by 10–30% over a monofacial equivalent. TOPCon naturally has high bifaciality (75–85%) because: (1) the rear is passivated contact rather than full-area aluminium BSF — no opaque metal blocking rear light; (2) the n⁺ poly-Si contact fingers cover only 3–5% of rear area; (3) SiNx on the rear provides ARC function for rear-incident light. To increase bifaciality further, rear contact coverage must be minimized — a design tradeoff against Rs."
      },
      {
        q: "How do pull-force tests predict field reliability and what failure modes do they catch?",
        a: "The pull-force test attaches a fixture to the silver busbar and measures the force required to peel it from the cell. Target: average ≥ 1 N per point, minimum ≥ 0.8 N. Low pull force indicates: (1) insufficient glass frit penetration — the contact is silver-on-glass rather than Ag crystallites on silicon; (2) contaminated silicon surface (PSG/BSG residue not removed) — the frit reacted with glass residue instead of silicon; (3) firing temperature too low. In the field, low pull-force contacts delaminate when module ribbons expand and contract thermally over 30 years (cycling from −40°C to +85°C). A delaminated contact = broken circuit = loss of string current. Modules with low pull-force cells fail early in accelerated thermal cycling tests (IEC 61215 standard) before ever being shipped."
      },
      {
        q: "What is PID (Potential-Induced Degradation) and why are TOPCon cells more resistant than PERC?",
        a: "PID occurs when large voltage potentials (up to −1500 V in large string installations) drive leakage current through the module encapsulant and glass into the cell junction. In PERC, sodium ions from the glass migrate through the EVA encapsulant and SiNx anti-reflection coating into the silicon surface, creating defect traps — efficiency can drop 20–80% under worst-case PID conditions. TOPCon has inherently better PID resistance because: (1) the front passivation stack (Al₂O₃ + SiNx) is denser and has a higher activation energy for ion transport; (2) the n-type bulk has lower hole concentration, reducing the driving force for ion-induced shunting; (3) the field-effect passivation from Al₂O₃ (negative charge) repels the positive Na⁺ ions that cause PID. Standardised PID testing (IEC 62804: 85°C, 85% RH, −1500 V, 96h) verifies TOPCon cells remain within certified degradation limits."
      },
      {
        q: "What does the troubleshooting tree look like for a batch with simultaneously low Voc AND low Isc?",
        a: "Simultaneous Voc AND Isc reduction is the most complex case because it cannot be attributed to a single mechanism — Voc and Isc have different physical origins. The troubleshooting tree branches: First, check EL images — are dark areas concentrated at edges (→ incomplete edge isolation → front etch problem) or distributed uniformly across the cell (→ passivation failure → ALD/PECVD problem)? Second, check PL images from the post-passivation step — was lifetime already low before metallisation (→ problem is upstream of firing) or did it appear after firing (→ over-firing, silver spiking, or contamination during firing)? Third, check sheet resistance data — was the boron emitter correct (→ diffusion OK) or off-spec (→ diffusion problem that propagates to both Voc and Isc)? The tree forces the engineer to eliminate all possibilities systematically before touching any process parameter."
      }
    ]
  }
];
