"use client";

import { Fragment, useEffect, useRef } from "react";

/**
 * A statement whose words light up as it scrolls into view (the "scrubbing
 * text" effect), and individually highlight under the pointer on hover.
 *
 * Progress (0 = dim, 1 = lit) is written to a per-word `--p` CSS variable
 * straight from one rAF-throttled scroll handler, so scrolling never
 * triggers a React re-render. CSS (`.scroll-word`) maps it to opacity with a
 * floor that keeps the dimmed text readable. Without JS every word is lit.
 */
export function ScrollText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Stable ids (position + word); the list is static and never reorders.
  const words = text.split(" ").map((word, index) => ({ word, id: `${index}:${word}` }));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    const last: string[] = [];
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // 0 when the block's top is at 90% of the viewport, 1 once its bottom reaches ~55%.
      const progress = Math.min(
        1,
        Math.max(0, (vh * 0.9 - rect.top) / (rect.height + vh * 0.35)),
      );
      const soft = 4; // words that are "mid-fade" at once
      nodes.forEach((node, i) => {
        const lit = Math.min(1, Math.max(0, progress * (nodes.length + soft) - i) / soft);
        const value = lit.toFixed(2);
        if (last[i] !== value) {
          node.style.setProperty("--p", value);
          last[i] = value;
        }
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span ref={ref} className="block cursor-default">
      {words.map(({ word, id }, i) => (
        <Fragment key={id}>
          <span data-w className="scroll-word">
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
