"use client";

import { useEffect, useState } from "react";

export function BgGlow() {
  const [gradient, setGradient] = useState(
    "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 50%, transparent 100%)"
  );

  useEffect(() => {
    function update() {
      const t = getComputedStyle(document.documentElement)
        .getPropertyValue("--on-surface")
        .trim();
      if (t === "#ffffff" || t === "#fff") {
        setGradient(
          "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 50%, transparent 100%)"
        );
      } else {
        setGradient(
          "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.01) 50%, transparent 100%)"
        );
      }
    }

    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{ background: gradient }}
    />
  );
}
