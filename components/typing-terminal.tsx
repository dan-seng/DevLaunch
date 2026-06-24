"use client";

import { useEffect, useState } from "react";

const LINES = [
  { prefix: "$", text: "devlaunch scan https://github.com/user/repo", check: false },
  { prefix: ">", text: "Clone complete", check: true },
  { prefix: ">", text: "Structure scanned", check: true },
  { prefix: ">", text: "Technologies detected", check: true },
  { prefix: ">", text: "Analysis ready", check: true },
];

const CHAR_INTERVAL = 35;
const LINE_DELAY = 350;

export function TypingTerminal() {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    const buffers: string[] = [];
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const line = LINES[lineIndex];
      if (charIndex < line.text.length) {
        if (!buffers[lineIndex]) buffers[lineIndex] = "";
        buffers[lineIndex] += line.text[charIndex];
        charIndex++;
        setDisplayed([...buffers]);
        timer = setTimeout(tick, CHAR_INTERVAL);
      } else {
        lineIndex++;
        charIndex = 0;
        if (lineIndex < LINES.length) {
          timer = setTimeout(tick, LINE_DELAY);
        } else {
          timer = setTimeout(() => setShowCursor(false), 2000);
        }
      }
    }

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-3 font-mono text-xs leading-relaxed">
      {LINES.map((line, i) => (
        <div key={i} className="flex">
          <span className="shrink-0 text-on-surface-variant/50">{line.prefix}</span>
          {line.check ? (
            <>
              <span className="ml-2 text-primary">✓</span>
              <span className="ml-2 text-on-surface">{displayed[i] || ""}</span>
            </>
          ) : (
            <span className="ml-2 text-on-surface-variant">{displayed[i] || ""}</span>
          )}
        </div>
      ))}
      <div className="flex">
        <span className="shrink-0 text-on-surface-variant/50">$</span>
        <span className={`ml-2 text-on-surface-variant ${showCursor ? "animate-pulse" : "opacity-0"}`}>_</span>
      </div>
    </div>
  );
}
