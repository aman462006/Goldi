export type NavSection = {
  id: string;
  label: string;
  group: "start" | "physics" | "process" | "explore";
};

export const navSections: NavSection[] = [
  { id: "hero", label: "Start", group: "start" },
  { id: "intro", label: "Intro", group: "start" },
  { id: "physics", label: "Physics", group: "physics" },
  { id: "tunneling", label: "Tunneling", group: "physics" },
  { id: "crystal-orientation", label: "Orientation", group: "physics" },
  { id: "timeline", label: "Timeline", group: "process" },
  { id: "process", label: "Process", group: "process" },
  { id: "ald-cycle", label: "ALD Cycle", group: "process" },
  { id: "explorer", label: "Layers", group: "explore" },
  { id: "compare", label: "Deposition", group: "explore" },
  { id: "metallization", label: "Metallization", group: "explore" },
  { id: "quiz", label: "Quiz", group: "explore" },
];
