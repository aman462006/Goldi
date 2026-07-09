import type { QuizQuestion } from "./types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q-topcon",
    topic: "Fundamentals",
    question: "What does TOPCon stand for?",
    options: [
      "Tunnel Oxide Passivated Contact",
      "Top Contact Optimized Node",
      "Thin Oxide Photovoltaic Contact",
      "Textured Optical Passivation Coating",
    ],
    answer: 0,
    explanation:
      "TOPCon = Tunnel Oxide Passivated Contact, first proposed in 2013 by Germany's Fraunhofer ISE. The 'Passivated' is as important as the 'Tunnel'.",
  },
  {
    id: "q-junction",
    topic: "Physics",
    question: "At which step does the P–N junction of a TOPCon cell get formed?",
    options: [
      "LPCVD poly-Si deposition",
      "Boron diffusion into the n-type wafer",
      "PECVD silicon nitride",
      "Screen printing",
    ],
    answer: 1,
    explanation:
      "Boron diffused into the front of an n-type wafer creates the p⁺/n junction. Every step after that improves the contacts — not the junction.",
  },
  {
    id: "q-tunnel",
    topic: "Physics",
    question: "Why can electrons cross the ~1.5 nm tunnel oxide but holes essentially cannot?",
    options: [
      "The oxide has holes drilled in it for electrons",
      "Electrons are smaller than holes",
      "The n⁺ poly + oxide stack gives electrons a ~3.1 eV barrier and holes ~4.5 eV",
      "Holes are physically too large to fit",
    ],
    answer: 2,
    explanation:
      "It's a carrier-selective contact. The oxide alone isn't selective — the whole n-wafer / SiO₂ / n⁺ poly stack sets a small electron barrier (~3.1 eV) and a large hole barrier (~4.5 eV).",
  },
  {
    id: "q-ald",
    topic: "ALD",
    question: "Why does each ALD cycle deposit almost exactly the same thickness?",
    options: [
      "The operator measures each layer",
      "Each half-reaction is self-limiting — it stops once every surface site has reacted",
      "The precursor dose is timed precisely",
      "Gravity limits the film",
    ],
    answer: 1,
    explanation:
      "Self-limiting surface reactions mean thickness depends on the number of cycles (~0.1 nm each), not on how much precursor you supply.",
  },
  {
    id: "q-al2o3",
    topic: "ALD",
    question: "What makes Al₂O₃ so effective at passivating a p-type surface?",
    options: [
      "It conducts current very well",
      "It is transparent",
      "Its negative fixed charge repels electrons from the surface (field-effect passivation)",
      "It is extremely thick",
    ],
    answer: 2,
    explanation:
      "Al₂O₃ provides chemical passivation AND field-effect passivation: its negative fixed charge pushes minority-carrier electrons away from the p-type surface, cutting recombination.",
  },
  {
    id: "q-lpcvd",
    topic: "LPCVD",
    question: "What is the LPCVD reaction that grows the poly-silicon layer?",
    options: [
      "SiH₄ → Si + 2 H₂",
      "2 NaOH + Si + H₂O → Na₂SiO₃ + 2 H₂",
      "4 BCl₃ + 3 O₂ → 2 B₂O₃ + 6 Cl₂",
      "SiO₂ + 6 HF → H₂SiF₆ + 2 H₂O",
    ],
    answer: 0,
    explanation:
      "Silane thermally decomposes: SiH₄(g) → Si(s) + 2 H₂(g). The silicon stays on the wafer building the poly layer while hydrogen leaves as gas.",
  },
  {
    id: "q-pecvd",
    topic: "PECVD",
    question: "Why is plasma used in PECVD instead of just heating the gases?",
    options: [
      "Plasma looks impressive",
      "It lets the film deposit at 200–450 °C instead of 700–900 °C, protecting the junction",
      "Plasma is cheaper than a heater",
      "It removes the need for silane",
    ],
    answer: 1,
    explanation:
      "The plasma supplies the reaction energy, so SiNₓ:H grows at low temperature. That avoids re-diffusing the already-formed dopant profiles.",
  },
  {
    id: "q-sinx",
    topic: "PECVD",
    question: "Which is NOT one of SiNₓ:H's four jobs on the front of the cell?",
    options: [
      "Anti-reflection coating",
      "Surface passivation",
      "Carrying the main cell current",
      "Hydrogen reservoir for bulk passivation",
    ],
    answer: 2,
    explanation:
      "SiNₓ:H does anti-reflection, passivation, hydrogenation and protection — but it is a dielectric, not the current-carrying contact. The metal grid carries current.",
  },
  {
    id: "q-rear-etch",
    topic: "Process",
    question: "Why is the rear polished flat during the alkaline rear etch?",
    options: [
      "To make it look nicer",
      "To raise rear reflectance above 40% and recover long-wavelength light",
      "To make the wafer thinner",
      "To add more dangling bonds",
    ],
    answer: 1,
    explanation:
      "A polished rear acts as a mirror (>40% reflectance), sending long-wavelength photons back for a second pass — and it enables more uniform passivation film growth.",
  },
  {
    id: "q-firing",
    topic: "Printing",
    question: "During firing, how does the silver paste form an ohmic contact?",
    options: [
      "Glass frit penetrates the SiNₓ and forms a silver–silicon alloy (Ag–Si eutectic 600–800 °C)",
      "The silver melts completely at room temperature",
      "The paste is glued on with adhesive",
      "Electrons weld it in place",
    ],
    answer: 0,
    explanation:
      "Firing (peak ~786 °C) lets glass frit etch through the ARC so a silver–silicon alloy forms. Ag melts at 960.7 °C, but the Ag–Si eutectic contact happens at 600–800 °C.",
  },
];
