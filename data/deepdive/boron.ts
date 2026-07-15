import type { DeepDiveSlide } from "../types";

export const boronDeepDive: DeepDiveSlide[] = [
  {
    type: "hero",
    title: "Boron Diffusion",
    subtitle: "Creating the p-Type Emitter",
    tagline: "To turn a piece of silicon into a solar cell, we must create a built-in electric field. We do this by forcing boron atoms into the crystal lattice at extreme temperatures.",
    body: [
      "In an n-type TOPCon cell, the bulk of the wafer is doped with phosphorus (an n-type material with extra electrons).",
      "To create a p-n junction, we must dope the front surface of the wafer with a p-type material (like boron, which has one less electron, creating 'holes').",
      "Because silicon is a dense, solid crystal, we can't just mix the boron in. We have to heat the wafer until the lattice expands enough that boron atoms can literally squeeze their way into the crystal structure."
    ]
  },
  {
    type: "split",
    title: "The Space Charge Region",
    subtitle: "How the Junction Works",
    left: "At the p-n junction, electrons from the n-side diffuse into the p-side and holes from the p-side diffuse into the n-side. This diffusion leaves behind fixed ionized atoms: positive phosphorus donor ions on the n-side, negative boron acceptor ions on the p-side.\n\nThis region of fixed charges with no free carriers is called the Space Charge Region (SCR) or depletion region.",
    right: "The fixed charges create a built-in electric field pointing from n to p. This field exactly opposes the diffusion tendency at equilibrium — zero net current flows.\n\nWhen light generates an electron-hole pair inside or near the SCR, this field sweeps the electron toward the n-side and the hole toward the p-side, generating photocurrent. The junction depth xⱼ (where p-type concentration equals the n-type background) determines how deeply light-generated carriers can be efficiently collected."
  },
  {
    type: "split",
    title: "Tube Diffusion",
    subtitle: "The Three Methods",
    left: "Diffusion is typically performed in massive quartz tubes heated by resistance coils. \n\nThere are three ways to introduce the dopant into the tube:\n\n1. Solid Source: Solid boron disks are placed between the wafers and vaporize when heated.\n2. Liquid Source: A carrier gas bubbles through liquid BBr₃ to carry the vapor into the tube.\n3. Gaseous Source: Pure BCl₃ gas is pumped directly into the tube.",
    right: "Modern high-volume manufacturing almost exclusively uses gaseous or liquid sources because they offer much tighter control over the doping profile and better uniformity across thousands of wafers.\n\nThis line uses BCl₃ (gaseous source) rather than BBr₃ (liquid). BCl₃ advantages: non-corrosive to quartz (longer tube life), B₂O₃ deposits self-clean over time, lower cost, and higher throughput."
  },
  {
    type: "split",
    title: "Gaseous Source Reactions",
    subtitle: "The Chemistry",
    left: "Inside the furnace at 800-1100°C, the boron trichloride (BCl₃) gas reacts with oxygen to form a liquid layer of boron oxide (B₂O₃) directly on the wafer surface.\n\n4BCl₃ + 3O₂ → 2B₂O₃ + 6Cl₂↑\n\nThis boron oxide layer acts as the diffusion source. The chlorine byproduct also helps getter metallic impurities from the furnace tube walls.",
    right: "Because the silicon is so hot, the boron atoms break free from the oxide and slowly migrate down into the silicon lattice.\n\n2B₂O₃ + 3Si → 3SiO₂ + 4B\n\nThis creates a heavily doped p-type region at the surface that gradually fades back into the n-type bulk silicon. This gradient is the 'emitter'. The SiO₂ formed simultaneously creates the Boron Silicate Glass (BSG) layer on the surface."
  },
  {
    type: "split",
    title: "BBr₃ vs BCl₃",
    subtitle: "Comparing the Two Main Sources",
    left: "BBr₃ (liquid source) is widely used in industry because it can be used at lower temperatures (~800°C) and produces a very uniform, controllable boron profile. The carrier N₂ is bubbled through the liquid flask.\n\nHowever, BBr₃ is more corrosive to quartz tube walls and generates HBr as a byproduct, which accelerates quartz aging. It also requires heating the source flask to maintain vapor pressure.",
    right: "BCl₃ (gaseous source, used on this line) simplifies the gas delivery system — no heated flask needed. At process temperatures, it produces a self-cleaning B₂O₃ deposit and the Cl₂ byproduct serves as an in-situ getter for Na and Fe impurities in the tube walls.\n\nTrade-off: BCl₃ requires slightly higher temperatures for equivalent diffusion depth and is a toxic gas requiring dedicated gas-cabinet safety systems."
  },
  {
    type: "content",
    title: "The Three-Stage Recipe",
    subtitle: "Pre-Oxidation → Deposition → Drive-in",
    bullets: [
      {
        label: "Pre-Oxidation (820°C, 200 s)",
        text: "A thin SiO₂ layer is deliberately grown before introducing BCl₃. This oxide modulates the subsequent BSG formation and reduces the 'Boron-Rich Layer' (BRL) — a highly recombinative surface phase. The pre-ox also ensures wafer surfaces are equally clean and oxidized before source exposure."
      },
      {
        label: "Deposition (810°C, 410 s with BCl₃)",
        text: "BCl₃ and O₂ flow into the tube. B₂O₃ deposits on the wafer surface and boron begins diffusing in. The furnace temperature is slightly lower than pre-ox to control the diffusion rate. Uniformity depends critically on gas flow distribution, boat rotation, and the N₂ dilution ratio."
      },
      {
        label: "Drive-in (920°C, N₂ only, 1000 s)",
        text: "BCl₃ is cut off and temperature rises to 920°C. The boron already in the surface drives deeper into the silicon by thermal diffusion. Simultaneously, a post-oxidation SiO₂ cap grows from the residual oxygen, which: (1) segregates boron from the surface, raising sheet resistance; (2) converts the BRL into removable SiO₂; and (3) seals the BSG layer for subsequent cleaning."
      },
      {
        label: "Why Sheet Resistance Matters",
        text: "Sheet resistance (Rs, Ω/□) is the primary quality metric and is measured with a four-point probe. Target: 390 ± 30 Ω/□ (control). Higher Rs = shallower, lighter doping; lower Rs = deeper, heavier doping. The emitter must be doped just right: heavy enough to collect holes efficiently, light enough to minimize Auger recombination losses between the contacts."
      }
    ]
  },
  {
    type: "content",
    title: "Boron Silicate Glass (BSG)",
    subtitle: "The Leftover Residue",
    bullets: [
      {
        label: "The Glass Formation",
        text: "The boron oxide on the surface doesn't just sit there; it reacts with the underlying silicon to form a thick, glassy layer called Boron Silicate Glass (BSG). BSG is essentially B₂O₃ dissolved into SiO₂ — its boron content determines its etch rate in HF (higher B = faster etch)."
      },
      {
        label: "The Problem",
        text: "While the BSG is necessary to act as the diffusion source during the high-temperature bake, it is a dead, insulating layer. If left on the wafer, it would block sunlight and prevent electrical contact. Worse, BSG is hygroscopic — it absorbs atmospheric moisture and causes corrosion, color inconsistencies after PECVD, and long-term power degradation."
      },
      {
        label: "Wrap-Around",
        text: "Boron gas doesn't just coat the front of the wafer — it wraps around the edges and deposits on the rear. This creates a thin BSG layer and a parasitic p-type boron region on the rear, which must be removed in the Alkaline Rear Etch step. If not removed, it would short-circuit the TOPCon rear structure."
      },
      {
        label: "The Solution",
        text: "After diffusion, the wafers undergo a wet-chemical etch (HF-based) during the rear etch step. The surface is considered clean when it becomes hydrophobic — water beads up without spreading. Hydrophobicity confirms all BSG/SiO₂ is removed and the surface is now hydrogen-terminated bare silicon."
      }
    ]
  },
  {
    type: "content",
    title: "Sheet Resistance Influencing Factors",
    subtitle: "What Drives Diffusion Depth",
    bullets: [
      {
        label: "Temperature",
        text: "Boron diffusivity in silicon scales exponentially with temperature (Arrhenius behavior). A 10°C increase in drive-in temperature can drop sheet resistance by ~10–15 Ω/□. Temperature is the primary tuning lever — every furnace zone is calibrated carefully."
      },
      {
        label: "BCl₃ Flow Rate & Time",
        text: "Higher BCl₃ flow or longer source time deposits more boron on the surface, giving a larger diffusion source. Both lower the final sheet resistance. If the flow meter drifts or BCl₃ source runs low (level alarm), the surface boron supply drops and sheet resistance shoots high."
      },
      {
        label: "Furnace Pressure",
        text: "Lower pressure improves uniformity by promoting laminar gas flow across the boat. Too-high pressure can cause condensation of BCl₃ in the feed lines, creating sudden bursts of dopant that cause within-wafer and wafer-to-wafer non-uniformity."
      },
      {
        label: "Quartz Boat Cleanliness",
        text: "Accumulated BSG and boron deposits on the quartz boat and tube walls act as parasitic dopant sources. Quartz boats are cleaned every 60 runs. Dirty boats cause 'boat mark' appearance defects and unpredictable sheet resistance variation across the batch."
      }
    ]
  },
  {
    type: "split",
    title: "Ion Implantation",
    subtitle: "The High-Tech Alternative",
    left: "While tube diffusion is the industry standard, Ion Implantation is an alternative method borrowed from the semiconductor industry.\n\nInstead of relying on heat and chemistry, a particle accelerator fires boron ions directly into the silicon lattice at high speeds. The implant dose and energy precisely control the surface concentration and junction depth.",
    right: "Advantages:\n- Extremely precise control over the doping profile.\n- Single-sided doping (no need to etch away the back later — no boron wrap-around).\n- Can easily create patterns for advanced cell architectures like IBC.\n- Avoids BSG formation entirely.\n\nDisadvantages:\n- The physical impact of the ions damages the crystal structure, requiring a high-temperature annealing step afterward to heal the lattice.\n- Very high capital equipment cost — typically 3–5× the cost of a diffusion tube.\n- Lower throughput than batch furnace processing."
  },
  {
    type: "content",
    title: "The Source Bubbler",
    subtitle: "Constant-Temperature Bath Control",
    bullets: [
      {
        label: "How the Liquid Source is Delivered",
        text: "The boron source (BCl₃) is kept in a sealed bottle held at a precise, steady temperature — called a bubbler or constant-temperature bath. Nitrogen carrier gas is bubbled through the liquid to pick up and carry a controlled amount of boron vapour into the furnace tube. The amount of vapour carried depends directly on the bath temperature."
      },
      {
        label: "Why Temperature Control is Critical",
        text: "If the bath temperature drifts by even ~20°C, the amount of boron vapour delivered changes significantly, and the sheet resistance goes off-target. This is why the source bottle temperature is continuously monitored with tight alarm limits — even a brief temperature excursion can cause an entire boat's worth of wafers to miss specification."
      },
      {
        label: "Too-High Pressure Causes Problems",
        text: "If source pressure rises too high, liquid boron source can condense back into the gas delivery lines. This causes sudden, erratic bursts of dopant rather than a steady controlled flow — leading to within-wafer and wafer-to-wafer non-uniformity in sheet resistance. Pressure alarms on the source cabinet are a critical safety and quality control."
      }
    ]
  },
  {
    type: "content",
    title: "Dummy Wafers & Quartz Saturation",
    subtitle: "Ensuring Uniformity Across the Boat",
    bullets: [
      {
        label: "What Are Dummy Wafers?",
        text: "Dummy (sacrificial) wafers fill the empty slot positions at the front and rear ends of the quartz boat. Without them, gas flow is uneven — real wafers at the boat ends see different flow patterns from those in the center. Dummies ensure every production wafer experiences an identical gas environment and dopant exposure."
      },
      {
        label: "What is Quartz-Boat Saturation?",
        text: "When a quartz tube and boat are freshly cleaned, their surfaces are 'hungry' — they absorb dopant gas from the first few batches, stealing boron meant for the wafers. 'Saturation' means running the furnace until the quartz surfaces have absorbed enough source material that they no longer compete with the wafers. An unsaturated tube produces consistently high sheet resistance — the quartz is stealing the dopant."
      },
      {
        label: "Boat Lifetime and Cleaning",
        text: "Quartz boats accumulate BSG and boron deposits with every run. These deposits create parasitic dopant reservoirs that cause 'boat mark' appearance defects and unpredictable sheet resistance variation across the batch. Boats are cleaned every 60 runs on a strict maintenance schedule to prevent this."
      }
    ]
  },
  {
    type: "content",
    title: "High Sheet Resistance at the Door End",
    subtitle: "A Characteristic Furnace Failure Mode",
    bullets: [
      {
        label: "The Symptom",
        text: "Sheet resistance is consistently higher for wafers at the furnace door end of the boat but normal for wafers deeper inside. This spatial pattern — high at one end only — is the key diagnostic signature that distinguishes a door-seal issue from a global temperature or flow problem."
      },
      {
        label: "The Root Cause",
        text: "The furnace door is not sealing tightly. Exhaust suction draws source gas away from the door-end before it reaches those wafers. Alternatively, there is a small crack or failed sealing ring in the door — air leaks in, diluting the boron source at that location. The dopant simply never reaches the wafers near the door."
      },
      {
        label: "The Fix",
        text: "Reseat or replace the furnace door and its sealing ring. Perform a leak-rate test and confirm the leak rate is below 1.5 Pa/min before resuming production. Wafers affected by the door-end abnormality should be re-measured; those with sheet resistance outside the circulation limit must be reworked or scrapped."
      }
    ]
  },
  {
    type: "table",
    title: "Boron Diffusion: Complete Parameter Reference",
    subtitle: "Industrial Setpoints and Tolerances",
    headers: ["Parameter", "Value / Range", "Effect on Cell"],
    rows: [
      ["Pre-oxidation temperature", "820 °C", "Grows thin SiO₂ that reduces the Boron-Rich Layer; too high → deeper junction before deposition begins"],
      ["Deposition temperature (BCl₃)", "810 °C", "Controls B₂O₃ formation rate; higher = more surface boron = lower final Rs"],
      ["Drive-in temperature", "920 °C", "Primary lever for junction depth; +10 °C ≈ −10 Ω/□ on final Rs"],
      ["Drive-in time", "~1000 s", "More time = deeper junction; too long merges emitter with BSF region"],
      ["Sheet resistance target", "390 ± 30 Ω/□ (control)", "Balances hole collection vs Auger recombination; ~0.3 µm junction depth"],
      ["Sheet resistance limit", "390 ± 60 Ω/□ (spec)", "Beyond this, efficiency loss is too large; requires rework or scrap"],
      ["BCl₃ source temperature", "Precisely controlled (±0.5 °C)", "Direct control of vapour pressure and BCl₃ flow rate"],
      ["Furnace pressure", "~Atmospheric (controlled)", "Too high → condensation in lines; too low → non-uniform flow"],
      ["N₂ carrier flow", "Calibrated L/min", "Dilutes BCl₃ to target concentration; flow meter drift = Rs drift"],
      ["Boat cleaning frequency", "Every 60 runs", "Removes parasitic BSG deposits that cause boat marks and Rs non-uniformity"],
      ["Tube leak rate", "< 1.5 Pa/min", "Leak = air entry = O₂ interference and unpredictable oxidation during diffusion"],
      ["Four-point probe spacing", "1 mm", "Standard probe geometry for Rs measurement; must be calibrated regularly"],
    ],
  },
  {
    type: "content",
    title: "Doping Profile & Electrical Impact",
    subtitle: "How Boron Concentration Varies with Depth",
    bullets: [
      {
        label: "Gaussian Concentration Profile",
        text: "Boron diffusion produces a concentration profile that roughly follows an erfc (complementary error function) shape — very high at the surface and decaying exponentially with depth. The surface concentration after the full recipe is typically 5×10¹⁸ to 10¹⁹ atoms/cm³. The junction (where boron equals the background n-type phosphorus ~10¹⁵ cm⁻³) sits approximately 0.3–0.4 µm below the surface."
      },
      {
        label: "Impact on Open-Circuit Voltage (Voc)",
        text: "A well-optimized boron emitter achieves low dark saturation current density J₀e (emitter recombination contribution) of <50 fA/cm². This directly sets the upper limit of Voc via: Voc = (kT/q) × ln(Jsc/J₀). Under-diffusing (too shallow or too light) raises Rs and reduces Voc; over-diffusing (too deep/heavy) raises Auger recombination and also reduces Voc. The optimum is narrow — approximately ±30 Ω/□ of the 390 Ω/□ target."
      },
      {
        label: "Impact on Short-Circuit Current (Isc)",
        text: "The boron emitter region is a 'dead layer' where photon-generated carriers recombine before collection — because the emitter is so heavily doped. Thinner, lighter-doped emitters (higher Rs) have a thinner dead layer and collect more blue photons (UV response). Thicker emitters shade more short wavelengths. This is why modern TOPCon emitters use passivated contacts to reduce dead-layer recombination, allowing slightly heavier doping without the normal efficiency penalty."
      },
      {
        label: "Auger Recombination Limit",
        text: "Auger recombination (three-carrier process: e + h + e → e + phonon) dominates at doping concentrations above ~10¹⁸ cm⁻³. The Auger lifetime τ_Auger = 1/(C_n × n²) drops rapidly at high doping. For the emitter, Auger recombination is tolerated but minimized by keeping the surface concentration as low as the contact-resistance requirement allows. The selective emitter concept (heavier doping only under metal contacts, lighter doping in illuminated areas) is the solution employed in advanced lines."
      }
    ]
  },
  {
    type: "faq",
    title: "Frequently Asked Questions",
    subtitle: "Interview Preparation & Technical Deep Dive",
    questions: [
      {
        q: "Why is boron used for the p-type emitter in TOPCon rather than gallium or aluminium?",
        a: "Boron is the dominant group-III dopant for silicon because: (1) it diffuses predictably by substitutional diffusion at 800–950°C; (2) its diffusivity in silicon is well-characterised and reproducible; (3) it does not segregate to grain boundaries like Al; (4) it does not form deep-level traps (gallium forms slightly deeper levels). Aluminium is used as p-type dopant in PERC/BSF rear contacts but cannot be used as a diffused emitter because it melts at 660°C — far below the 900°C needed to drive it deep enough. Gallium is used in some p-type substrates but its diffusivity in silicon makes it harder to control in furnace diffusion."
      },
      {
        q: "What is the Boron-Rich Layer (BRL) and how does it degrade efficiency?",
        a: "The BRL is a 2–5 nm thick ultra-heavily doped phase (boron concentration >10²¹ cm⁻³) that forms at the very top surface when molten B₂O₃ is in direct contact with silicon. It acts as an extreme Auger recombination zone — any carrier entering this layer recombines almost instantaneously. Its presence raises the emitter J₀ by 50–100 fA/cm², reducing Voc by 10–20 mV and Isc by visible amounts. The pre-oxidation step grows a thin SiO₂ before BCl₃ introduction, which modulates the B₂O₃ deposition and reduces BRL formation. The post-oxidation during drive-in converts residual BRL into a removable SiO₂ layer."
      },
      {
        q: "What is the 'three-stage recipe' and why must each stage be separate?",
        a: "Stage 1 (Pre-oxidation): grows uniform SiO₂ before any dopant arrives — ensures a clean, identical starting surface for every wafer. Stage 2 (Deposition): BCl₃ + O₂ flow establishes the B₂O₃ reservoir on the surface; temperature is lower (810°C) to control the deposition rate without over-diffusing. Stage 3 (Drive-in): BCl₃ stops, temperature rises to 920°C; the already-deposited boron redistributes deeper and the post-oxidation cap seals the BSG. Combining stages 1 and 2 would mean depositing dopant onto an incompletely oxidised surface — inconsistent wafer-to-wafer. Combining stages 2 and 3 would mean still introducing BCl₃ at the higher drive-in temperature, over-doping and making Rs uncontrollably low."
      },
      {
        q: "How does BCl₃ differ from BBr₃ and why did this line choose BCl₃?",
        a: "BBr₃ is a liquid at room temperature requiring a heated source bubbler (~15–20°C), adding complexity. It generates HBr as a byproduct that attacks quartz tube walls, shortening tube life. BCl₃ is already a gas, simplifying delivery. It generates Cl₂, which getters metallic impurities from tube walls — a self-cleaning benefit. BCl₃ requires slightly higher process temperatures (~10–20°C) for equivalent diffusion depth, and is highly toxic (TLV: 1 ppm), requiring fully sealed gas-cabinet delivery. The choice of BCl₃ on this line reflects the balance of lower equipment maintenance cost, longer tube life, and in-situ gettering benefit outweighing the slightly higher hazard handling requirement."
      },
      {
        q: "What does the four-point probe measure and how does sheet resistance relate to junction quality?",
        a: "A four-point probe measures sheet resistance (Ω/□) by passing a known current through two outer probes and measuring voltage across two inner probes, applying Rs = (π/ln2) × V/I. Sheet resistance integrates the boron concentration profile across the emitter depth — it is proportional to 1/(q × µ × ∫N(x)dx). A lower Rs means more total boron per cm² (either deeper junction or higher surface concentration). Sheet resistance does NOT directly tell you junction depth or surface concentration separately — for that, ECV (electrochemical capacitance-voltage) profiling or SIMS (secondary ion mass spectrometry) are required. Four-point probe is fast, non-destructive, and runs on every wafer — making it the production SPC tool."
      },
      {
        q: "What happens to TOPCon cell efficiency if the boron emitter is too deeply doped (Rs too low, e.g. 250 Ω/□)?",
        a: "Over-doping the emitter causes: (1) Auger recombination in the emitter region rises sharply, reducing minority carrier (electron) lifetime near the surface — this lowers both Voc and blue photon collection (Isc); (2) The emitter dead layer becomes thicker, absorbing short-wavelength photons without collecting the generated carriers; (3) If the junction penetrates too deep, it overlaps with the back surface field region and can interfere with TOPCon rear structure formation. The net result is a cell that may have lower series resistance but has reduced Voc (by 10–30 mV) and Isc — overall efficiency loss despite the lower emitter resistance."
      },
      {
        q: "Why does the boron source temperature need to be controlled to ±0.5°C?",
        a: "The vapour pressure of BCl₃ (or BBr₃) follows the Antoine equation — it changes exponentially with temperature. A ±2°C change in source temperature can change vapour pressure by ±10–15%, directly changing the boron supply rate to the furnace tube. Since the boron surface concentration (and hence sheet resistance) depends linearly on total boron deposited, even a 10% change in supply shifts Rs outside the control limit (390 ± 30 Ω/□). Temperature excursions of ±5°C can push Rs outside the circulation limit, requiring full lot evaluation and potential scrap."
      },
      {
        q: "What is 'ion implantation' and what are its advantages over furnace diffusion for solar cells?",
        a: "Ion implantation fires boron ions directly into the silicon using an ion beam accelerator. Advantages: (1) Extremely precise dose and depth control — no reliance on temperature, gas flow, or source concentration; (2) Inherently single-sided — the beam hits only one face, eliminating boron wrap-around and rear BSG formation, saving the rear-etch step; (3) Can create complex doping profiles (e.g. box profiles) not achievable by diffusion; (4) No BSG by-product. Disadvantages: (1) Physical impact of ions creates crystal damage requiring high-temperature annealing to recover — this adds process steps; (2) Equipment cost is 3–5× the cost of a diffusion furnace; (3) Lower throughput per unit floor area. Currently used in IBC (back-contact) cells and some high-efficiency demonstration cells but not yet cost-competitive for mainstream TOPCon production."
      }
    ]
  }
];
