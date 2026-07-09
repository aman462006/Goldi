export type Concept = {
  id: string;
  title: string;
  short: string;
  body: string[];
  accent: string;
};

export const physicsConcepts: Concept[] = [
  {
    id: "bandgap",
    title: "Band Gap & Photogeneration",
    short: "A photon lifts an electron across silicon's 1.12 eV gap, creating an electron–hole pair.",
    accent: "#38bdf8",
    body: [
      "Silicon has a band gap of about 1.12 eV between its valence band and conduction band.",
      "When sunlight delivers a photon with enough energy, a valence electron absorbs it, jumps the gap into the conduction band, and leaves behind a hole.",
      "This electron–hole pair is the raw material of all photovoltaic current. The whole cell is engineered to collect the electron and the hole before they meet again.",
    ],
  },
  {
    id: "pn-junction",
    title: "The P–N Junction & Built-in Field",
    short: "Diffusion of carriers leaves fixed ions that build an internal electric field — the engine of the cell.",
    accent: "#a78bfa",
    body: [
      "Where p-type meets n-type, majority carriers diffuse across and recombine, leaving behind fixed ionized dopants — positive on the n-side, negative on the p-side.",
      "These fixed charges form the Space Charge Region (depletion region) and a built-in electric field pointing from n to p.",
      "Diffusion (driven by concentration gradient) and drift (driven by the field) act in opposite directions. At equilibrium they cancel — zero net current until light or a load appears.",
      "Under light, the field sweeps electrons toward the n-region and holes toward the p-region, producing a voltage across the electrodes.",
    ],
  },
  {
    id: "recombination",
    title: "Recombination & Dangling Bonds",
    short: "Cutting a wafer breaks bonds; those traps kill carriers before they're collected.",
    accent: "#fb7185",
    body: [
      "Inside perfect silicon every atom shares four covalent bonds. At a cut surface, atoms lose neighbors, leaving dangling bonds.",
      "A dangling bond creates an allowed energy state inside the band gap — a trap. Carriers captured there recombine and release their energy as heat instead of current.",
      "If 1000 pairs are generated and 300 recombine at the surface, that's a 30% loss plus reduced voltage. Because the loss is at the surface, it is fixed by treating the surface.",
    ],
  },
  {
    id: "passivation",
    title: "Passivation: Chemical + Field-Effect",
    short: "Satisfy the broken bonds, and repel carriers away from whatever traps remain.",
    accent: "#2dd4bf",
    body: [
      "Chemical passivation caps dangling bonds with another material (Si–O, Si–H, Al–O bonds), erasing the trap states.",
      "Field-effect passivation uses fixed charge in the coating to repel one carrier type away from the surface. Al₂O₃ holds negative charge (repels electrons on p-type); SiNₓ holds positive charge (repels holes on n-type).",
      "Together they can cut surface recombination velocity below 20 cm/s — the difference between a mediocre and a record cell.",
    ],
  },
  {
    id: "tunnel-oxide",
    title: "Tunnel Oxide: The 1.5 nm Gatekeeper",
    short: "An oxide grown from the silicon itself — thin enough to tunnel, perfect enough to passivate.",
    accent: "#3b8cff",
    body: [
      "The tunnel oxide is ~1.5 nm of SiO₂ — about 50,000× thinner than a human hair — grown directly from the wafer, giving a near-perfect, low-defect interface.",
      "Its most important job is passivation: Si–O bonds saturate the dangling bonds at the rear surface.",
      "Its second job is to be a selective barrier. It is thin enough that electrons quantum-tunnel through, but it suppresses recombination — which is why the technology is 'Tunnel Oxide Passivated Contact'.",
      "Too thick (20 nm) blocks all tunneling; too thin (<0.5 nm) forms pinholes. The industry sweet spot is ~1.2–1.8 nm.",
    ],
  },
  {
    id: "tunneling",
    title: "Quantum Tunneling & Carrier Selectivity",
    short: "Electrons see a 3.1 eV barrier, holes see 4.5 eV — so electrons pass and holes turn back.",
    accent: "#7c3aed",
    body: [
      "At 1.5 nm, an electron behaves like a wave: part of its wavefunction extends through the barrier, giving a real probability of appearing on the other side — quantum tunneling.",
      "The oxide alone is not selective; both carriers can in principle tunnel. Selectivity comes from the whole stack: n-wafer → SiO₂ → n⁺ poly-Si.",
      "Because both regions are n-type and the poly is heavily doped, the bands line up so electrons face a small barrier (~3.1 eV) while holes face a much larger one (~4.5 eV).",
      "The result: electrons tunnel efficiently, holes almost never do, and recombination at the contact collapses. This is a carrier-selective contact.",
    ],
  },
  {
    id: "carriers",
    title: "Carriers Aren't Marbles",
    short: "A hole isn't a positive ball and n⁺ isn't a negative block — bands and populations rule, not Coulomb attraction.",
    accent: "#f472b6",
    body: [
      "A hole is not a positive particle drifting through space. It is a missing electron in a bond — it only appears to move because an electron from a neighbouring bond hops in to fill it. Hole motion is really electron motion in disguise.",
      "An n⁺ region is not a 'negatively charged block' either. Each phosphorus atom donates one electron but is left behind as a fixed positive donor ion, so the region stays electrically neutral overall. An incoming electron is not repelled by a wall of charge.",
      "So carrier behaviour is set by energy bands and carrier populations — not by a simple 'like charges repel'. Electrons flow easily from n to n⁺ because they are the majority carrier in both regions and just join a huge population; holes do not, because they are the minority carrier in both and face a large valence-band barrier.",
      "This is why 'the oxide blocks holes' is only shorthand: the n-wafer → SiO₂ → n⁺ poly stack, taken as a whole, is energetically easy for electrons and hard for holes. That combination — not the oxide alone — is what makes the contact carrier-selective.",
    ],
  },
];
