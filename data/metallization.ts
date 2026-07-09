// Screen-printing / metallization + factory quality-control data.
// Sourced from the Screen Printing QA reference (docs/extras) and the
// TOPCon process document. This is the "deep dive / extras" layer.

export type PrintStage = {
  id: string;
  name: string;
  detail: string;
};

// The end-to-end metallization flow, from paste on the screen to current out.
export const printFlow: PrintStage[] = [
  { id: "screen", name: "Screen in place", detail: "A patterned steel mesh sits a fraction of a millimetre above the wafer — the snap-off gap." },
  { id: "paste", name: "Paste loaded", detail: "Highly viscous silver paste rests on top of the screen, ahead of the squeegee." },
  { id: "squeegee", name: "Squeegee sweep", detail: "A polyurethane blade at ~60–75° rolls the paste and presses it through the open mesh." },
  { id: "snapoff", name: "Snap-off", detail: "Only the strip under the blade touches the wafer; the screen springs back the instant the blade passes." },
  { id: "print", name: "Fingers + busbars", detail: "Paste transfers only through open areas, leaving thin fingers joined by busbars." },
  { id: "dry", name: "Drying", detail: "150–250 °C removes the solvent so the soft print can be handled." },
  { id: "fire", name: "Firing", detail: "750–850 °C for seconds: binder burns off, silver sinters, glass frit etches through SiNₓ." },
  { id: "contact", name: "Ohmic contact", detail: "Silver bonds to the silicon only in tiny openings — passivation elsewhere survives. Current can now leave the cell." },
];

// One of the most critical mechanical facts: how the wafer survives printing.
export const printMechanics = [
  {
    title: "Snap-off printing",
    body: "The squeegee presses the screen, never the wafer. Only the small region beneath the blade deflects far enough to touch, then snaps back — so the force on any point of the brittle wafer is tiny and momentary.",
  },
  {
    title: "Vacuum chuck",
    body: "The 150–180 µm wafer rests on a flat chuck with vacuum holes that hold it firmly, preventing bending, sliding, or vibration during the sweep.",
  },
  {
    title: "Polyurethane blade",
    body: "A flexible blade (not rigid metal) deforms slightly and spreads the load gently instead of concentrating it — while still being stiff enough to push the viscous paste through.",
  },
  {
    title: "Thixotropic paste",
    body: "The paste flows only under the squeegee's pressure and stops the instant that pressure lifts. It cushions the contact and reproduces sharp fingers without spreading.",
  },
];

export type PrintParam = {
  name: string;
  optimum: string;
  tooLow: string;
  tooHigh: string;
};

// Section 5 & 8 of the Screen-Printing QA doc — every knob and what breaks.
export const printParams: PrintParam[] = [
  {
    name: "Screen tension",
    optimum: "20–35 N/cm",
    tooLow: "Mesh sags, fingers widen and blur, poor alignment — the mesh stretches instead of releasing cleanly.",
    tooHigh: "Barely deflects; high mesh stress, shorter screen life, risk of tearing.",
  },
  {
    name: "Snap-off distance",
    optimum: "0.5–1.5 mm",
    tooLow: "Screen sticks to the wet paste → smearing, blurred fingers, paste left behind.",
    tooHigh: "Screen must deflect farther → higher force, more mesh deformation, worse positional accuracy.",
  },
  {
    name: "Squeegee pressure",
    optimum: "Machine-specific",
    tooLow: "Paste doesn't fully clear the mesh → broken fingers with missing sections.",
    tooHigh: "Too much paste transfers → thick, wide fingers, more shading, possible wafer damage.",
  },
  {
    name: "Squeegee angle",
    optimum: "60–75°",
    tooLow: "Too flat: paste rolls ahead of the blade → smearing and thick prints.",
    tooHigh: "Too vertical: excess pressure, faster blade & screen wear, uneven printing.",
  },
  {
    name: "Printing speed",
    optimum: "Matched to paste",
    tooLow: "Paste has time to spread → wider fingers, lower throughput.",
    tooHigh: "Paste can't flow through the mesh in time → incomplete, broken lines.",
  },
  {
    name: "Paste viscosity",
    optimum: "Thixotropic",
    tooLow: "Spreads after printing → wide fingers, low height, short-circuit risk.",
    tooHigh: "Won't pass the mesh → missing fingers, rough surface.",
  },
  {
    name: "Drying temperature",
    optimum: "150–250 °C",
    tooLow: "Solvent remains, paste stays soft and smears when handled.",
    tooHigh: "Binder degrades early, surface defects develop.",
  },
  {
    name: "Firing temperature",
    optimum: "750–850 °C",
    tooLow: "Silver won't sinter, frit won't reach silicon → high contact resistance.",
    tooHigh: "Silver spikes into silicon → junction damage, recombination, shunts.",
  },
  {
    name: "Furnace time",
    optimum: "~30–60 s total",
    tooLow: "Incomplete sintering, poor contact quality.",
    tooHigh: "Over-firing → excess reactions and junction damage.",
  },
  {
    name: "Paste volume / finger",
    optimum: "Balanced",
    tooLow: "High resistance, broken fingers, weak current collection.",
    tooHigh: "More shading, higher silver cost, wider fingers.",
  },
];

export type PrintMaterial = {
  group: string;
  accent: string;
  items: { name: string; role: string; note?: string }[];
};

export const printMaterials: PrintMaterial[] = [
  {
    group: "The paste",
    accent: "#ffb020",
    items: [
      { name: "Silver particles", role: "Carry the current", note: "Highest conductivity; ~0.5–5 µm; purity > 99.9%." },
      { name: "Glass frit", role: "Etches through SiNₓ during firing so silver can reach silicon", note: "Without it the silver just sits on the insulator and no current flows." },
      { name: "Organic binder", role: "Holds the paste together; burns away during firing" },
      { name: "Solvent", role: "Sets viscosity for printing; evaporates during drying" },
    ],
  },
  {
    group: "The screen",
    accent: "#3b8cff",
    items: [
      { name: "Stainless-steel mesh", role: "Standard — strong, dimensionally stable, prints few-tens-of-µm fingers" },
      { name: "Polyester mesh", role: "Cheap but stretches → rarely used for solar" },
      { name: "Nickel electroformed", role: "Single laser-cut sheet → finest fingers, least silver, premium cells" },
      { name: "Photopolymer emulsion", role: "The stencil: UV-hardened to block, open where fingers print" },
    ],
  },
  {
    group: "The squeegee",
    accent: "#2dd4bf",
    items: [
      { name: "Polyurethane blade", role: "Industry standard — flexible, scratch- & chemical-resistant, 60–90 Shore A" },
      { name: "Rubber", role: "Cheaper but wears fast, poor consistency" },
      { name: "Silicone", role: "Too soft → poor edge definition" },
      { name: "Metal", role: "Never used — scratches the screen, damages the wafer" },
    ],
  },
];

// Why silver, and why not the alternatives.
export const contactMetals = [
  { metal: "Silver", verdict: "used", note: "Highest conductivity, forms good contact after firing — but expensive." },
  { metal: "Copper", verdict: "future", note: "Cheap & conductive, but diffuses into silicon fast — needs a Ni barrier + plating." },
  { metal: "Gold", verdict: "no", note: "Conducts well but very costly and creates deep-level defects in silicon." },
  { metal: "Aluminum", verdict: "rear", note: "Cheap but lower conductivity — used for rear contacts, not fine front lines." },
];

export type PrintDefect = {
  name: string;
  cause: string;
  effect: string;
  detect: string;
};

// The 15 common abnormalities (Section 6) + how factories catch them.
export const printDefects: PrintDefect[] = [
  { name: "Finger breakage", cause: "Low pressure, thick paste, clogged mesh, too fast", effect: "Series resistance rises, power drops", detect: "AOI cameras" },
  { name: "Finger spreading", cause: "Too much pressure, low viscosity, worn screen", effect: "More shading, more silver used", detect: "AOI + image analysis" },
  { name: "Missing fingers", cause: "Screen blockage, dust, dried paste, bubbles", effect: "No local current path, low fill factor", detect: "AOI" },
  { name: "Finger misalignment", cause: "Wafer movement, vacuum failure, camera drift", effect: "Miss contact openings, high resistance", detect: "Vision alignment" },
  { name: "Smearing", cause: "Snap-off too small, paste too thin", effect: "Wide fingers, short circuits", detect: "AOI" },
  { name: "Double printing", cause: "Vibration, wafer or screen movement", effect: "Uneven resistance, more shading", detect: "AOI" },
  { name: "Screen clogging", cause: "Slow printing, paste drying, low humidity", effect: "Missing fingers, uneven thickness", detect: "Screen inspection" },
  { name: "Air-bubble voids", cause: "Poor mixing, fast loading, old paste", effect: "Voids, open circuits, weak firing", detect: "AOI" },
  { name: "Paste bleeding", cause: "Low viscosity, high temp, slow printing", effect: "Short circuits, shading", detect: "AOI" },
  { name: "Wafer breakage", cause: "High pressure, poor vacuum, cracked incoming wafer", effect: "Total loss — most severe mechanical defect", detect: "EL imaging" },
  { name: "Screen damage", cause: "Old screen, contamination, aggressive cleaning", effect: "Finger width shifts, inconsistent print", detect: "Inspection microscope" },
  { name: "Uneven finger height", cause: "Uneven pressure, paste inconsistency, wear", effect: "Current crowding, resistance variation", detect: "3D / confocal" },
  { name: "Busbar defects", cause: "Same roots as fingers, on busbar pattern", effect: "Whole regions lose collection", detect: "Camera inspection" },
  { name: "Paste contamination", cause: "Dirty environment, old container", effect: "Blocked openings, pinholes, weak contacts", detect: "Filtering / QC" },
  { name: "Poor contact after firing", cause: "Wrong firing profile, frit issue, emitter mismatch", effect: "Bad performance despite a normal-looking print", detect: "EL + IV testing" },
];

// Material qualification — the spec-sheet properties engineers check before
// a paste/screen/squeegee is approved for production (Screen-Printing QA §7).
export const printSpecs: { group: string; accent: string; items: string[] }[] = [
  {
    group: "Silver paste",
    accent: "#ffb020",
    items: [
      "Thixotropy — flows freely under the squeegee, then stops the instant pressure lifts so fingers don't spread. Without it, screen printing simply wouldn't work.",
      "Silver purity > 99.9%; particle size ~0.5–5 µm (too large won't pass a fine mesh, too small changes sintering).",
      "Glass-frit composition tuned to soften at the firing temperature and etch the SiNₓ by just the right amount — too aggressive shunts the junction, too weak leaves high resistance.",
      "Solids content sets finger height vs printability; refrigerated storage, warmed to room temperature before use.",
    ],
  },
  {
    group: "Screen",
    accent: "#3b8cff",
    items: [
      "Mesh count sets resolution vs paste throughput — finer mesh gives narrower fingers but lets less paste through.",
      "Wire diameter trades resolution against strength; screen tension 20–35 N/cm.",
      "Emulsion thickness sets the printed finger height.",
    ],
  },
  {
    group: "Squeegee & environment",
    accent: "#2dd4bf",
    items: [
      "Polyurethane blade, ~60–90 Shore A; a worn, rounded edge blurs finger definition, so blades are replaced before quality drops.",
      "Cleaning solvents must evaporate cleanly and leave zero residue, or the next print fails.",
      "Room held at 20–25 °C and 40–60% RH — warmth thins the paste, low humidity dries it on the screen.",
    ],
  },
];

export const metalMethods = [
  { name: "Screen printing", advantage: "Lowest cost, fastest, most mature", limit: "Uses significant silver", current: true },
  { name: "Inkjet printing", advantage: "Less paste waste, flexible patterns", limit: "Slower, more complex", current: false },
  { name: "Electroplating", advantage: "Very low silver, narrow lines", limit: "Extra steps, tighter control", current: false },
  { name: "Evaporation", advantage: "Extremely fine contacts", limit: "Expensive, specialized cells", current: false },
  { name: "Laser-assisted", advantage: "High precision", limit: "Higher equipment cost", current: false },
];

// ---- Statistical Process Control (SPC) ----
// The layered target / control / specification concept (Sections 8 & 9).
export const spcConcept = {
  target: 25,
  controlLo: 24.5,
  controlHi: 25.5,
  specLo: 23,
  specHi: 27,
  unit: "µm",
  metric: "Finger width",
  zones: [
    { id: "target", label: "On target", value: "25.0 µm", verdict: "Process is exactly where it should be — no action.", tone: "good" },
    { id: "control", label: "Inside control", value: "25.4 µm", verdict: "Statistically stable — production continues normally.", tone: "good" },
    { id: "drift", label: "Out of control, in spec", value: "25.8 µm", verdict: "Cell still acceptable, but the process is drifting — investigate the cause.", tone: "warn" },
    { id: "fail", label: "Out of spec", value: "29.0 µm", verdict: "Non-conforming — rework or scrap, and run root-cause analysis.", tone: "bad" },
  ],
};

export const spcTable = [
  { param: "Finger width", target: "25 µm", control: "24.5–25.5 µm", spec: "23–27 µm" },
  { param: "Finger height", target: "18 µm", control: "17.5–18.5 µm", spec: "16–20 µm" },
  { param: "Busbar width", target: "0.55 mm", control: "0.53–0.57 mm", spec: "0.50–0.60 mm" },
  { param: "Screen tension", target: "28 N/cm", control: "27–29 N/cm", spec: "25–31 N/cm" },
  { param: "Contact resistance", target: "2.0 mΩ·cm²", control: "1.8–2.2 mΩ·cm²", spec: "≤ 3.0 mΩ·cm²" },
];

export const fingerSpecs = [
  { param: "Finger width — PERC", value: "30–40 µm" },
  { param: "Finger width — TOPCon", value: "20–30 µm" },
  { param: "Finger width — HJT", value: "15–25 µm" },
  { param: "Finger height", value: "12–25 µm" },
  { param: "Aspect ratio (h/w)", value: "0.4–0.8" },
  { param: "Contact resistance", value: "~1–3 mΩ·cm²" },
];

// ---- Boron diffusion chart data (from the extras infographic) ----
// Boron concentration falls ~exponentially with depth; junction where it
// meets the wafer's phosphorus background.
export function boronConcentration(depthUm: number) {
  // surface ~5e19, decays; expressed as log10(cm^-3)
  const surface = 19.7;
  const val = surface - depthUm * 3.4;
  return Math.max(14, val);
}

export const boronJunctionDepthUm = 0.55; // ~0.3–1.0 µm
export const boronBackgroundLog = 15.2; // n-type phosphorus background

export const sheetResistanceRef = [
  { type: "Heavy doped (p++)", rs: "20–40 Ω/□" },
  { type: "Medium doped (p+)", rs: "40–80 Ω/□" },
  { type: "Lightly doped (p)", rs: "80–150 Ω/□" },
];
