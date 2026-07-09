export type CellLayer = {
  id: string;
  name: string;
  formula?: string;
  thickness: string;
  color: string;
  emissive: string;
  role: string;
  detail: string;
  process: string; // which step creates it
  side: "front" | "bulk" | "rear";
};

// Ordered front (sun) → rear (back electrode)
export const cellLayers: CellLayer[] = [
  {
    id: "front-metal",
    name: "Front Silver Grid",
    formula: "Ag",
    thickness: "screen-printed fingers + busbars",
    color: "#d7dbe6",
    emissive: "#8a8f9c",
    role: "Collect current from the front",
    detail:
      "Fine silver fingers and busbars printed and fired onto the front. Finger paste fires through SiNₓ to contact silicon; busbar paste is non-penetrating to protect Voc.",
    process: "print",
    side: "front",
  },
  {
    id: "sinx-front",
    name: "SiNₓ:H Anti-Reflection",
    formula: "SiNₓ:H",
    thickness: "~78 nm",
    color: "#2b3f7a",
    emissive: "#f472b6",
    role: "Anti-reflection + passivation + hydrogen",
    detail:
      "Plasma-deposited hydrogenated silicon nitride. Index n ≈ 2.0–2.3 for quarter-wave anti-reflection, passivates the surface, and releases hydrogen during firing for bulk passivation.",
    process: "pecvd",
    side: "front",
  },
  {
    id: "al2o3",
    name: "Al₂O₃ Passivation",
    formula: "Al₂O₃",
    thickness: "5–10 nm",
    color: "#3a2a63",
    emissive: "#7c3aed",
    role: "Chemical + field-effect passivation",
    detail:
      "ALD-grown aluminum oxide on the p⁺ emitter. Negative fixed charge repels electrons from the surface (field-effect) while Al–O bonds cap dangling bonds (chemical passivation).",
    process: "ald",
    side: "front",
  },
  {
    id: "emitter",
    name: "p⁺ Boron Emitter",
    formula: "Si:B",
    thickness: "sub-micron",
    color: "#5b3a8c",
    emissive: "#a78bfa",
    role: "Forms the P–N junction",
    detail:
      "Boron diffused into the front of the n-type wafer. The junction with the n-bulk is the built-in field that separates electrons and holes.",
    process: "boron",
    side: "front",
  },
  {
    id: "wafer",
    name: "n-type Silicon Wafer",
    formula: "Si:P",
    thickness: "~125–170 µm",
    color: "#1f3a6b",
    emissive: "#3b8cff",
    role: "The absorber",
    detail:
      "The bulk single-crystal, phosphorus-doped absorber (~1000× thicker than the deposited films). Textured pyramids trap light; this is where electron–hole pairs are generated.",
    process: "texture",
    side: "bulk",
  },
  {
    id: "tunnel-oxide",
    name: "SiO₂ Tunnel Oxide",
    formula: "SiO₂",
    thickness: "~1.5 nm",
    color: "#0e4f8a",
    emissive: "#38bdf8",
    role: "Passivate + carrier-selective barrier",
    detail:
      "Ultra-thin oxide grown from the silicon. Passivates the rear surface and forms an asymmetric barrier: electrons (~3.1 eV) tunnel through, holes (~4.5 eV) are blocked.",
    process: "lpcvd",
    side: "rear",
  },
  {
    id: "poly",
    name: "n⁺ Poly-Silicon",
    formula: "poly-Si:P",
    thickness: "~100–200 nm",
    color: "#12406e",
    emissive: "#0ea5e9",
    role: "Electron-selective contact",
    detail:
      "Polycrystalline silicon deposited by LPCVD and doped n⁺ by POCl₃. A continuous conductive sheet that collects tunneled electrons everywhere and funnels them sideways to the rear metal.",
    process: "pocl3",
    side: "rear",
  },
  {
    id: "sinx-rear",
    name: "Rear SiNₓ",
    formula: "SiNₓ:H",
    thickness: "capping layer",
    color: "#243a70",
    emissive: "#f472b6",
    role: "Protect & passivate rear",
    detail:
      "PECVD silicon nitride capping the rear poly-Si — protects the stack and passivates the phosphorus-diffused rear surface for the bifacial design.",
    process: "pecvd",
    side: "rear",
  },
  {
    id: "rear-metal",
    name: "Rear Silver Grid",
    formula: "Ag",
    thickness: "screen-printed grid",
    color: "#c9cdd8",
    emissive: "#8a8f9c",
    role: "Collect current from the rear",
    detail:
      "Rear electrodes printed and fired to contact the n⁺ poly-Si. Being bifacial, the rear is a grid (not full-area metal), letting the cell also harvest reflected/ambient light.",
    process: "print",
    side: "rear",
  },
];
