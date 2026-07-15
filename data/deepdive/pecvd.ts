import type { DeepDiveSlide } from "../types";

export const pecvdDeepDive: DeepDiveSlide[] = [
  {
    type: "content",
    title: "1. What Is PECVD?",
    subtitle: "Plasma-Enhanced Chemical Vapor Deposition",
    bullets: [
      {
        label: "The Process",
        text: "PECVD is a thin-film deposition process that uses a plasma to enhance chemical reactions between gas molecules."
      },
      {
        label: "Low Temperature",
        text: "Because the plasma provides the energy needed to break the gas molecules apart, the process can occur at much lower temperatures (100-450°C) than conventional CVD."
      },
      {
        label: "Common Use",
        text: "In the solar industry, it is primarily used to deposit hydrogenated silicon nitride (SiNx:H) on the front surface of solar cells."
      }
    ]
  },
  {
    type: "visual",
    title: "2. The PECVD Chamber",
    subtitle: "Creating the plasma",
    visual: "pecvdPlasma",
    caption: "RF power creates a plasma that breaks gases like SiH₄ and NH₃ into highly reactive species. These species then react and form a thin film on the substrate at relatively low temperatures."
  },
  {
    type: "content",
    title: "3. Why Is PECVD Required in Solar Cells?",
    subtitle: "Fixing a bare silicon wafer",
    bullets: [
      {
        label: "The Starting Point",
        text: "A bare silicon solar cell (even with a completed p-n junction) is very inefficient. It suffers from three major problems."
      },
      {
        label: "Problem 1",
        text: "It reflects too much sunlight (~30%)."
      },
      {
        label: "Problem 2",
        text: "It suffers from massive surface recombination at the dangling bonds."
      },
      {
        label: "Problem 3",
        text: "It is exposed to dirt, moisture, and environmental damage."
      }
    ]
  },
  {
    type: "visual",
    title: "4. Fixing Reflection: Anti-Reflection Coating",
    subtitle: "Trapping the light",
    visual: "antiReflection",
    caption: "Bare silicon reflects 30% of light. PECVD deposits a SiNx ARC. Reflected waves from the top of the SiNx and the top of the silicon destructively interfere, dropping reflection to 2-5%."
  },
  {
    type: "content",
    title: "5. Fixing Recombination: Surface Passivation",
    subtitle: "Neutralizing the surface",
    bullets: [
      {
        label: "Dangling Bonds",
        text: "At the surface, silicon atoms have missing neighbors, creating dangling bonds that trap electrons and holes, causing recombination."
      },
      {
        label: "The Fix",
        text: "PECVD SiNx:H satisfies many of these dangling bonds, greatly reducing surface recombination and allowing more current to flow out of the cell."
      }
    ]
  },
  {
    type: "content",
    title: "6. Why PECVD Specifically?",
    subtitle: "Protecting the junction",
    bullets: [
      {
        label: "The Temperature Problem",
        text: "Depositing silicon nitride normally requires 700-900°C. By this stage in manufacturing, the dopant profiles are already perfectly placed."
      },
      {
        label: "Dopant Diffusion",
        text: "Heating to 800°C again would cause the dopants to diffuse further, changing the junction depth and ruining the cell."
      },
      {
        label: "The Plasma Solution",
        text: "Plasma supplies the energy for the chemical reaction. This allows the SiNx to be deposited at a safe 200-450°C without damaging the existing p-n junction."
      }
    ]
  },
  {
    type: "content",
    title: "7. The 4 Jobs of SiNx:H",
    subtitle: "The ultimate multi-tasker",
    bullets: [
      {
        label: "1. Anti-Reflection Coating",
        text: "Tuning the refractive index (n ≈ 1.9-2.1) ensures maximum sunlight enters the cell."
      },
      {
        label: "2. Surface Passivation",
        text: "It chemically bonds to the silicon surface, reducing dangling bonds."
      },
      {
        label: "3. Hydrogen Reservoir",
        text: "The ':H' in SiNx:H means it contains hydrogen. During the later high-temp firing step, this hydrogen diffuses into the silicon to passivate bulk defects."
      },
      {
        label: "4. Environmental Protection",
        text: "It forms a hard, stable barrier against dirt, moisture, and oxidation."
      }
    ]
  },
  {
    type: "split",
    title: "8. PECVD vs ALD",
    subtitle: "Why not use ALD for everything?",
    left: "PECVD (SiNx:H)\n- Fast deposition\n- Lower manufacturing cost\n- Excellent anti-reflection\n- Provides hydrogen passivation\n- Good, but not perfect, chemical passivation.",
    right: "ALD (Al₂O₃)\n- Very slow deposition (atomic layers)\n- Higher manufacturing cost\n- Poor anti-reflection on its own\n- No inherent hydrogen reservoir\n- EXCEPTIONAL chemical and field-effect passivation."
  },
  {
    type: "content",
    title: "9. Why Are We Using Both?",
    subtitle: "Complementary processes",
    bullets: [
      {
        label: "The Best of Both Worlds",
        text: "ALD gives the absolute best surface passivation. PECVD gives hydrogenation, protection, and anti-reflection at high speed."
      },
      {
        label: "The Stacked Solution",
        text: "High-efficiency cells often use a stack: Silicon → ALD Al₂O₃ → PECVD SiNx:H. ALD does the heavy lifting for passivation, while PECVD does everything else."
      },
      {
        label: "Not Redundant",
        text: "They are not doing the same job. ALD lacks hydrogen and anti-reflection; PECVD lacks the ultimate field-effect passivation of Al₂O₃."
      }
    ]
  },
  {
    type: "content",
    title: "10. ALD vs PECVD on TOPCon",
    subtitle: "Where do they go?",
    bullets: [
      {
        label: "The Front Surface",
        text: "The front surface is exposed silicon. It always gets PECVD SiNx:H. Sometimes, an ALD layer is placed underneath for an extra ~0.3% efficiency boost."
      },
      {
        label: "The Rear Surface (TOPCon)",
        text: "The rear silicon is completely covered by the thermal Tunnel Oxide and LPCVD Poly-Si. Because the Tunnel Oxide already passivates the rear perfectly, ALD is NOT typically used on the rear of TOPCon."
      }
    ]
  },
  {
    type: "content",
    title: "11. If PECVD Works, Why Use ALD on the Front?",
    subtitle: "The efficiency trade-off",
    bullets: [
      {
        label: "Cost vs Performance",
        text: "PECVD SiNx alone is fast, cheap, and very good. Many commercial TOPCon manufacturers use ONLY PECVD on the front to save money."
      },
      {
        label: "The Last Few Defects",
        text: "PECVD leaves a few dangling bonds. ALD Al₂O₃ eliminates almost all of them and adds a strong repelling electric field."
      },
      {
        label: "The Premium Choice",
        text: "Adding ALD might increase absolute efficiency from 25.0% to 25.3%. For some manufacturers, this small gain is worth the extra equipment and time."
      }
    ]
  },
  {
    type: "split",
    title: "12. Could We Use Another Material?",
    subtitle: "Why SiNx:H is king",
    left: "Alternatives Tested:\nSiO₂: Great passivation, poor ARC, no hydrogen.\nAl₂O₃: Best passivation, poor ARC, slow.\nTiO₂: Good optical, weaker passivation.\nHfO₂: Too expensive.",
    right: "The Winner: SiNx:H\nIt is the ONLY material that scores highly in every category: cheap, fast, great ARC, good passivation, hydrogen source, and highly durable. It provides the best overall performance per dollar."
  },
  {
    type: "stats",
    title: "13. Process Parameters & Chemistry",
    subtitle: "Industrial specs for PECVD",
    stats: [
      { label: "Temperature", value: "200-450°C" },
      { label: "Gases Used", value: "SiH₄, NH₃, N₂" },
      { label: "Refractive Index", value: "1.9 - 2.1" },
      { label: "Thickness", value: "~70-80 nm" },
    ],
    callout: {
      label: "The Plasma Chemistry",
      text: "Inside the chamber, the RF field fragments SiH₄ into Si and H, and NH₃ into N and H. These fragments combine on the wafer to form Hydrogenated Silicon Nitride (SiNx:H)."
    }
  },
  {
    type: "content",
    title: "Hydrogen Passivation & Bulk Passivation",
    subtitle: "How SiNx Heals the Silicon Interior",
    bullets: [
      {
        label: "Surface Passivation During Deposition",
        text: "During PECVD deposition, hydrogen atoms from the fragmented SiH₄ and NH₃ gases bond directly to silicon dangling bonds at the wafer surface. This immediate chemical passivation reduces surface recombination velocity from the moment the film forms."
      },
      {
        label: "Bulk Passivation During Firing",
        text: "The SiNx:H film stores a large reservoir of hydrogen. During the later high-temperature firing step (peak ~786°C), this hydrogen is released from the SiNx film. It diffuses into the silicon wafer interior and passivates dangling bonds and defects deep inside the bulk — not just at the surface. This internal healing is called bulk passivation, and it raises the minority-carrier lifetime throughout the wafer."
      },
      {
        label: "Why Both Matter",
        text: "Surface passivation reduces the density of active defect traps at the silicon-SiNx interface. Bulk passivation reduces the density of traps inside the wafer volume. Together they raise carrier lifetime at every level of the cell — translating directly into higher Voc and better fill factor in the finished device."
      }
    ]
  },
  {
    type: "content",
    title: "Nitrogen as a Simple Asphyxiant",
    subtitle: "A Hidden but Serious Safety Risk",
    bullets: [
      {
        label: "Why Nitrogen is Listed as a Hazard",
        text: "Nitrogen (N₂) makes up 78% of normal air and is completely non-toxic. However, in an enclosed space or following a large nitrogen leak, it can displace oxygen and create an oxygen-deficient atmosphere below the safe threshold of 19.5% O₂."
      },
      {
        label: "The Danger: No Warning",
        text: "A person entering an oxygen-deficient atmosphere loses consciousness in seconds with virtually no warning — there is no detectable smell, taste, or physical discomfort before collapse. This makes nitrogen one of the most dangerous simple asphyxiants precisely because it provides no warning. Multiple fatalities have occurred when workers entered nitrogen-purged spaces to help unconscious colleagues."
      },
      {
        label: "Required Controls in the PECVD Area",
        text: "The PECVD furnace uses large flows of N₂ carrier gas. Oxygen-deficiency monitors must be installed and functioning in all areas where N₂ is used or stored. Workers must be trained to never enter an area with O₂ below 19.5% without a self-contained breathing apparatus (SCBA). On a low-O₂ alarm, evacuate and ventilate before any person re-enters."
      }
    ]
  },
  {
    type: "table",
    title: "PECVD Process Parameter Reference",
    subtitle: "SiNx:H Industrial Specifications",
    headers: ["Parameter", "Value / Range", "Why It Matters"],
    rows: [
      ["Process gases", "SiH₄, NH₃, N₂ (H₂ sometimes)", "SiH₄ provides Si; NH₃ provides N and H; N₂ carrier reduces deposition rate for control"],
      ["SiH₄ : NH₃ flow ratio", "Tuned for n ≈ 1.9–2.1", "Higher SiH₄/NH₃ → more Si-rich film, higher n (yellow/gold colour); lower ratio → N-rich, n → 1.8 (light blue)"],
      ["RF power frequency", "13.56 MHz or 40 kHz (dual)", "High frequency → denser, harder film; low frequency → softer film with more hydrogen content"],
      ["Deposition temperature", "200–450 °C", "< 200 °C → poor film quality, less hydrogen in film; > 450 °C → damages boron diffusion profile"],
      ["Target SiNx thickness (front)", "~70–80 nm", "Quarter-wavelength ARC optimised for ~600 nm: d = λ/(4n) = 600/(4×2.0) = 75 nm"],
      ["Refractive index target", "n = 2.0 ± 0.05", "Directly sets ARC performance; deviation shifts the reflectance minimum wavelength"],
      ["Deposition rate", "5–20 nm/min", "Controlled by gas flows and RF power; too fast → less uniform; too slow → throughput bottleneck"],
      ["Hydrogen content in film (H)", "10–20 at%", "Reservoir for bulk passivation during firing; too low → poor bulk passivation; too high → poor film stability"],
      ["Target reflectance (post PECVD)", "< 2% (weighted solar spectrum)", "Direct cell efficiency indicator; above 2% indicates ARC thickness or refractive index deviation"],
      ["Graphite boat replacement cycle", "Per Al₂O₃ buildup schedule", "Changed boat geometry → altered gas flow → colour variation between positions"],
      ["NH₃ purity", "> 99.999% (5N)", "Moisture or O₂ impurity in NH₃ creates oxide inclusions in SiNx film → poor passivation"],
    ],
  },
  {
    type: "content",
    title: "White Spots and Colour Variation",
    subtitle: "Diagnosing PECVD Appearance Defects",
    bullets: [
      {
        label: "What Causes White Spots?",
        text: "White or light-coloured irregular patches on an otherwise uniform dark-blue SiNx-coated cell are almost always caused by upstream contamination. Inadequate PSG/BSG removal in the front etch step leaves glass residue islands on the silicon surface. When SiNx deposits over glass instead of bare silicon, the optical film behaves differently over those patches — they appear white because the interference colour is shifted."
      },
      {
        label: "What Causes Colour Variation Bands or Gradients?",
        text: "Since film colour depends precisely on both thickness and refractive index, even small deviations in gas flow, chamber pressure, or boat condition cause visible colour shifts. An overused graphite boat (past its replacement count) changes the thermal and gas-flow environment. Wafers not fully seated in boat pockets receive slightly different deposition conditions. Wrong SiH₄:NH₃ ratio shifts the refractive index and apparent colour."
      },
      {
        label: "Prevention and Response",
        text: "For white spots: enforce upstream quality gates — do not transfer non-conforming wafers from front etch to PECVD. For colour variation: verify gas flows and chamber pressure at each shift start; replace graphite boats on their scheduled replacement cycle; check wafer seating before each load. Both defect types are detected by AOI and the visual colour check at the unloader."
      }
    ]
  },
  {
    type: "faq",
    title: "Frequently Asked Questions",
    subtitle: "Interview Preparation & Technical Deep Dive",
    questions: [
      {
        q: "Why is SiNx:H used as an ARC instead of MgF₂, ZnS, or other ARC materials used in high-efficiency lab cells?",
        a: "MgF₂ and ZnS are used in lab cells and III-V space solar cells where cost is secondary to performance. In silicon PV at scale, SiNx:H wins because: (1) it provides passivation AND ARC simultaneously in one step — no separate passivation layer needed; (2) it acts as a hydrogen reservoir for bulk passivation during the firing step; (3) it is mechanically robust and chemically stable over 30 years outdoors; (4) PECVD is fast (5–20 nm/min) and can coat hundreds of wafers per hour in batch inline systems; (5) silicon nitride chemistry is well-understood and equipment is mature. TiO₂ is another candidate (good optical properties, no passivation) but fails on points 2, 3, and passivation. SiNx is simply the only material that scores high on all five criteria simultaneously."
      },
      {
        q: "What is the relationship between refractive index (n), film thickness, and cell colour?",
        a: "The SiNx film creates thin-film optical interference. The minimum reflectance condition is: n × d = λ/4, where λ is the target wavelength. For n = 2.0 and target λ = 600 nm (peak solar spectrum): d = 75 nm → minimum reflection at 600 nm means red and blue light reflect more than green → cell appears dark blue/black. If n increases to 2.2 (more Si-rich): d_optimal shortens → some films end up slightly thicker-than-optimal → interference minimum shifts → cell may appear golden or yellow. If n decreases to 1.85 (more N-rich): d_optimal increases → lighter blue. AOI in colour-sorting mode measures HSV (hue, saturation, value) and bins cells into colour grades — within a module, all cells must be the same colour grade or the panel looks non-uniform on a rooftop."
      },
      {
        q: "How does PECVD provide bulk passivation if the SiNx film is only on the surface?",
        a: "During firing (the screen-printing firing step at ~780°C peak for 1–3 seconds), the Si–H and N–H bonds in the SiNx film begin to break. Hydrogen atoms released from the breaking bonds are small enough (1 pm atomic radius) to rapidly diffuse through both silicon and SiNx. In 1–3 seconds at 780°C, hydrogen can diffuse several micrometers into silicon — effectively reaching the entire ~150 µm wafer thickness. Inside the bulk, atomic H bonds to 'broken' or dangling bonds associated with crystal dislocations, metal impurity complexes (Fe–B pairs, Cu clusters), and grain boundaries. This neutralises their charge-trapping nature. Post-firing, minority carrier lifetime in the wafer bulk increases by 2–10× compared to pre-firing, measurable by PL imaging."
      },
      {
        q: "Why must the PECVD step come AFTER ALD and not before?",
        a: "The SiNx:H PECVD film must be deposited on top of the ALD Al₂O₃ layer for two reasons: (1) Structure — the stack is Si / Al₂O₃ (passivation) / SiNx (protection + ARC + H-source). If PECVD came first, SiNx would be directly on silicon — losing the superior Al₂O₃ passivation at the Si/oxide interface. (2) The ALD process uses TMA and H₂O which react with Si-OH surface groups — it requires a clean silicon-oxide surface. If PECVD SiNx were deposited first, ALD precursors would react with Si–N bonds at the SiNx surface, not the Si surface — the ALD Al₂O₃ would grow on SiNx, not silicon, eliminating field-effect passivation. The correct sequence is thermodynamically and chemically mandatory."
      },
      {
        q: "What is the 'dual-frequency' PECVD mode and what does it achieve?",
        a: "Standard PECVD uses 13.56 MHz RF (high frequency). Dual-frequency adds a second, lower frequency (40 kHz or 350 kHz) RF signal. The high-frequency signal controls electron temperature and plasma density. The low-frequency signal controls ion bombardment energy — ions accelerate more strongly in a slow-oscillating field. Benefits of low-frequency ion bombardment: (1) more compact, denser SiNx film (better diffusion barrier for moisture ingress over 30 years); (2) better adhesion of the film to the Al₂O₃ interface; (3) more complete H coverage of remaining Si dangling bonds at the interface. Disadvantage: ion bombardment at too-high power damages the underlying Al₂O₃ and silicon surface. Most advanced TOPCon lines use dual-frequency PECVD with carefully optimised power ratio between the two frequencies."
      },
      {
        q: "What does nitrogen (N₂) as a carrier gas do in PECVD and what happens if it leaks in large quantities?",
        a: "N₂ acts as a diluent carrier gas — it doesn't react in the plasma but controls the dilution of SiH₄ and NH₃, allowing finer control of deposition rate. It also helps stabilize the plasma discharge. In large quantities, however, N₂ is an asphyxiant: it displaces oxygen from enclosed spaces with no smell, colour, or warning. At O₂ levels below 19.5% (normal air is 20.9%), a person loses consciousness within seconds. PECVD areas use N₂ in high flow rates for carrier gas, chamber purging, and cassette N₂-blanketing. O₂ deficiency monitors with audible alarms must be installed at floor level (where N₂ accumulates, being slightly heavier than air) throughout the PECVD tool area. Entry into a low-O₂ alarm zone without SCBA is prohibited."
      },
      {
        q: "How does the firing step activate the SiNx:H and what would happen if firing were skipped?",
        a: "The SiNx:H as-deposited has hydrogen stored in Si–H and N–H bonds within the film matrix. Without firing (heating), this hydrogen remains locked in the film — it cannot diffuse into the silicon to passivate bulk defects. The Al₂O₃ negative fixed charge is also at sub-optimal density before thermal activation. If firing were skipped: bulk minority-carrier lifetime would remain at its pre-passivation value (sometimes 50–100× lower); Al₂O₃ field-effect passivation would be weaker; Voc would be 30–80 mV lower; cell efficiency would drop 1–2% absolute. Since screen printing and firing happen after PECVD anyway (for metallisation), the firing step always occurs in practice — but its role as a passivation activation step is often overlooked."
      }
    ]
  }
];
