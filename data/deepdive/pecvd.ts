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
  }
];
