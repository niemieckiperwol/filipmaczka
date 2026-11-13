"use client";

import { useRef, type ReactNode } from "react";
import { useMountEffect } from "@/hooks/useMountEffect";

export function FitText({ children, className }: { children: ReactNode; className?: string }) {
  const boxRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useMountEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;
    if (!box || !text) return;

    function fit() {
      if (!box || !text) return;
      text.style.fontSize = "100px";
      const ratio = box.clientWidth / text.getBoundingClientRect().width;
      text.style.fontSize = `${Math.floor(ratio * 10000) / 100}px`;
    }

    fit();
    document.fonts.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  });

  return (
    <span ref={boxRef} className={`fit ${className ?? ""}`}>
      <span ref={textRef} className="fit-text">
        {children}
      </span>
    </span>
  );
}
