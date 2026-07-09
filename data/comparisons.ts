export const cellComparison = {
  columns: ["TOPCon", "PERC", "HJT"],
  rows: [
    { label: "Record efficiency", values: ["27.79 %", "~23.5 %", "27.08 %"] },
    { label: "Degradation", values: ["Negligible", "First-year up to ~8%", "Gradual (low-temp encapsulant)"] },
    { label: "Process steps", values: ["10–12", "11", "5"] },
    { label: "Equipment capex", values: ["~200M RMB/GW", "~120M RMB/GW", "300–350M RMB/GW"] },
    { label: "Non-silicon cost", values: ["0.26–0.27 RMB/W", "~0.20 RMB/W", "0.33 RMB/W"] },
    { label: "Wafer thickness", values: ["125–135 µm", "~170 µm", "90–110 µm"] },
    { label: "Line compatibility", values: ["Upgrades PERC lines", "Mainstream", "New tech, new line"] },
  ],
};

export const topconAdvantages = [
  "Record efficiency: 27.79 % (ISFH-certified, JinkoSolar, Nov 2025) — surpassing HJT's 27.08 % record and PERC's ~23.5 %.",
  "No power binning drop — negligible long-term degradation.",
  "Excellent spectral response across both short and long wavelengths.",
  "Energy yield is less affected by weather than PERC.",
  "Seamless upgrade from existing PERC production lines — operators and much equipment transfer directly.",
];

export const topconTradeoffs = [
  "Longer process flow than PERC (adds 3 steps, removes 2, modifies 1) — more complexity.",
  "Higher non-silicon cost (~0.26–0.27 RMB/W) and higher equipment capex than PERC.",
  "Limited wafer thinning: must survive boron diffusion's high temperature and rapid thermal cycles.",
  "Wafer size is comparatively constrained versus HJT.",
];

export type DepositionMethod = {
  id: string;
  name: string;
  full: string;
  deposits: string;
  where: string;
  temp: string;
  speed: string;
  cost: string;
  accent: string;
  strengths: string[];
  why: string;
};

export const depositionMethods: DepositionMethod[] = [
  {
    id: "thermal",
    name: "Thermal Oxidation",
    full: "Thermal / Chemical Oxidation",
    deposits: "SiO₂ tunnel oxide",
    where: "Rear, on silicon",
    temp: "High",
    speed: "—",
    cost: "Low",
    accent: "#3b8cff",
    strengths: ["Grows oxide directly from the wafer", "Near-perfect Si interface", "Ultra-thin & uniform"],
    why: "Produces an ultra-thin, high-quality oxide straight from the silicon surface — impossible to match by deposition.",
  },
  {
    id: "lpcvd",
    name: "LPCVD",
    full: "Low-Pressure Chemical Vapor Deposition",
    deposits: "Doped poly-silicon",
    where: "Rear, on tunnel oxide",
    temp: "590–630 °C",
    speed: "Batch, high throughput",
    cost: "Moderate",
    accent: "#63acff",
    strengths: ["Dense, high-quality poly-Si", "Excellent uniformity & conformality", "Very low defect density"],
    why: "Makes the dense, uniform, high-quality polysilicon needed for the electron-selective contact — PECVD can't match this quality.",
  },
  {
    id: "ald",
    name: "ALD",
    full: "Atomic Layer Deposition",
    deposits: "Al₂O₃ passivation",
    where: "Front emitter",
    temp: "Low",
    speed: "Slow (~0.1 nm/cycle)",
    cost: "Higher",
    accent: "#7c3aed",
    strengths: ["Atomic thickness control", "Best chemical + field-effect passivation", "Perfect conformality on texture"],
    why: "Delivers the highest-quality, self-limiting passivation film — chosen where every 0.1% of efficiency is worth the slower speed.",
  },
  {
    id: "pecvd",
    name: "PECVD",
    full: "Plasma-Enhanced Chemical Vapor Deposition",
    deposits: "SiNₓ:H",
    where: "Front & rear",
    temp: "200–450 °C",
    speed: "Very fast",
    cost: "Low",
    accent: "#f472b6",
    strengths: ["Anti-reflection + passivation + H reservoir + protection", "Low-temp, junction-safe", "Cheap at ~20k wafers/hr"],
    why: "Fast, cheap, low-temperature, and does four jobs at once — the workhorse for coating millions of cells.",
  },
];

export type TunnelMaterial = {
  material: string;
  interface: number;
  tunneling: number;
  passivation: number;
  fieldEffect: number;
  use: string;
};

export const tunnelMaterials: TunnelMaterial[] = [
  { material: "SiO₂", interface: 5, tunneling: 5, passivation: 5, fieldEffect: 2, use: "TOPCon tunnel oxide" },
  { material: "Al₂O₃", interface: 4, tunneling: 2, passivation: 5, fieldEffect: 5, use: "PERC / front passivation" },
  { material: "SiNₓ", interface: 3, tunneling: 1, passivation: 3, fieldEffect: 3, use: "Anti-reflection coating" },
  { material: "HfO₂", interface: 2, tunneling: 3, passivation: 2, fieldEffect: 2, use: "CMOS transistors" },
  { material: "TiO₂", interface: 2, tunneling: 3, passivation: 2, fieldEffect: 2, use: "Research" },
];
