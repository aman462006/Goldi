export type Reaction = {
  equation: string;
  note?: string;
};

export type Parameter = {
  label: string;
  value: string;
  hint?: string;
};

export type InfluenceFactor = { factor: string; effect: string };

export type Tank = { name: string; chemical: string; role: string; reaction?: string };

export type SpcItem = {
  item: string;
  range: string;
  instrument?: string;
  frequency?: string;
  remark?: string;
};

export type PfmeaRow = {
  mode: string;
  effect: string;
  cause: string;
  control: string;
  rpn: number;
};

export type SafetyItem = { chemical: string; description: string };

export type StepFigure = {
  // key into the native diagram registry (components/diagrams/Diagrams.tsx)
  diagram: string;
  caption: string;
  label?: string;
  // which deep-dive tab this figure belongs under
  tab: "purpose" | "physics" | "chemistry" | "equipment" | "parameters" | "spc";
};

export type ProcessStep = {
  id: string;
  index: number;
  step: number;
  name: string;
  cn?: string;
  side: "Front" | "Rear" | "Both";
  accent: string; // hex
  tagline: string;
  oneLiner: string;
  purpose: string[];
  physics: string[];
  chemistry: Reaction[];
  equipment: {
    main?: string;
    detail: string[];
  };
  parameters: Parameter[];
  layer?: {
    material: string;
    thickness: string;
    where: string;
  };
  defects: { name: string; cause: string; fix: string }[];
  advantages?: string[];
  industrial?: string[];
  influencingFactors?: InfluenceFactor[];
  tanks?: Tank[];
  operationFlow?: string[];
  spc?: SpcItem[];
  pfmea?: PfmeaRow[];
  safety?: SafetyItem[];
  figures?: StepFigure[];
  deepDive?: DeepDiveSlide[];
};

export type DeepDiveSlide = {
  type: "hero" | "content" | "split" | "stats" | "table" | "comparison" | "steps" | "safety" | "visual";
  title: string;
  subtitle?: string;
  tagline?: string;
  body?: string[];
  left?: string;
  right?: string;
  bullets?: Array<{ label?: string; text: string; accent?: boolean }>;
  visual?: string;
  visualCaption?: string;
  caption?: string;
  stats?: Array<{ label: string; value: string; unit?: string; color?: string }>;
  headers?: string[];
  rows?: string[][];
  comparison?: Array<{ name: string; badge?: string; color: string; points: string[] }>;
  callout?: { label: string; text: string };
  steps?: Array<{ n: string; title: string; text: string }>;
  note?: string;
  warning?: string;
};

export type QuizQuestion = {
  id: string;
  topic: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};
