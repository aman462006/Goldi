"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Section({
  id,
  children,
  className,
  full = false,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  full?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full scroll-mt-24",
        full ? "" : "px-5 sm:px-8 lg:px-12",
        className,
      )}
    >
      <div className={cn(full ? "" : "mx-auto max-w-7xl")}>{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  accent = "#3b8cff",
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  accent?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && (
        <Reveal>
          <div
            className={cn(
              "mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-[0.18em] uppercase",
              align === "center" && "mx-auto",
            )}
            style={{
              borderColor: `${accent}44`,
              color: accent,
              background: `${accent}12`,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
            />
            {eyebrow}
          </div>
        </Reveal>
      )}
      <Reveal i={1}>
        <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal i={2}>
          <p className="mt-5 text-lg leading-relaxed text-white/55">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
