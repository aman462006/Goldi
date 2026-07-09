# TOPCon — Journey Inside a Solar Cell

An interactive, cinematic educational experience about **TOPCon (Tunnel Oxide Passivated Contact) solar cell manufacturing** — from raw silicon wafer to a tested, high-efficiency bifacial photovoltaic device.

Built to teach an engineer the complete process visually: every step, physics principle, chemical reaction, and layer, rendered with 3D scenes, canvas animations, and scroll-driven storytelling.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **TailwindCSS** — custom dark, electric-blue design system
- **Framer Motion** — reveals, transitions, micro-interactions
- **Three.js / React Three Fiber / drei** — hero silicon crystal + exploded 3D layer explorer
- **Lenis** — smooth scrolling
- **lucide-react** — icons
- Bespoke Canvas 2D engines — quantum tunneling, PN junction, ALD cycle, reactions, LPCVD furnace, PECVD plasma

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Experience map

| Section | What it teaches |
| --- | --- |
| **Hero** | 3D silicon crystal, orbiting electrons, streaming photons |
| **Introduction** | What TOPCon is; animated TOPCon vs PERC vs HJT comparison |
| **Solar Physics** | Band gap, PN junction, recombination, passivation, tunnel oxide, selectivity — with live carrier animation |
| **Quantum Tunneling** | Full canvas viz; drag the oxide thickness and watch tunneling probability change |
| **Timeline** | Scroll-lit 10-step process flow |
| **Process Deep Dive** | Per-step purpose / physics / chemistry / equipment / parameters / defects, with molecular reaction animations |
| **ALD Cycle** | Watch one atomic layer form (TMA → purge → H₂O → purge); cycles → thickness slider; conformal coating on pyramids |
| **Inside the Machines** | Animated LPCVD quartz furnace + PECVD RF plasma |
| **Layer Explorer** | Interactive exploded 3D cell — rotate, explode, click any of 9 layers |
| **Deposition Methods** | Thermal / LPCVD / ALD / PECVD comparison + SiO₂ tunnel-oxide scorecard |
| **Knowledge Check** | 10-question quiz with instant feedback and scoring |

Global search: **⌘K** (or `/`).

## Content source

All technical content is derived from the provided TOPCon process reference (full manufacturing flow) plus the ALD, LPCVD, PECVD, and TOPCon Q&A reference documents. The material was reorganized into an interactive learning experience while preserving technical accuracy.

## Structure

```
app/            layout, page, global styles
components/
  sections/     one file per page section
  three/        R3F scenes (crystal, layer stack)
  viz/          Canvas 2D visualizations
  layout/       nav, command menu, scroll progress
  ui/           reusable primitives
  providers/    Lenis smooth-scroll
data/           all TOPCon content as typed data
lib/            utilities & hooks
```
