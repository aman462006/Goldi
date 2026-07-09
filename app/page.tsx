import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Physics } from "@/components/sections/Physics";
import { Tunneling } from "@/components/sections/Tunneling";
import { CrystalOrientation } from "@/components/sections/CrystalOrientation";
import { Timeline } from "@/components/sections/Timeline";
import { ProcessDeepDive } from "@/components/sections/ProcessDeepDive";
import { AldCycle } from "@/components/sections/AldCycle";
import { Equipment } from "@/components/sections/Equipment";
import { LayerExplorer } from "@/components/sections/LayerExplorer";
import { DepositionCompare } from "@/components/sections/DepositionCompare";
import { Metallization } from "@/components/sections/Metallization";
import { Quiz } from "@/components/sections/Quiz";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10 bg-ink-950">
        <Intro />
        <Physics />
        <Tunneling />
        <CrystalOrientation />
        <Timeline />
        <ProcessDeepDive />
        <AldCycle />
        <Equipment />
        <LayerExplorer />
        <DepositionCompare />
        <Metallization />
        <Quiz />
        <Footer />
      </div>
    </>
  );
}
