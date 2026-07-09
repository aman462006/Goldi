"use client";

import { useEffect, useState } from "react";

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>();

    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            visible.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
          }
          let best = ids[0];
          let bestRatio = -1;
          for (const [k, v] of visible) {
            if (v > bestRatio) {
              bestRatio = v;
              best = k;
            }
          }
          if (bestRatio > 0) setActive(best);
        },
        { threshold: [0.1, 0.3, 0.55, 0.8], rootMargin: "-15% 0px -35% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);

  return active;
}
