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
  }
];
