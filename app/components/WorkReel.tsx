"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties, type MouseEvent, type PointerEvent } from "react";
import { useMountEffect } from "@/hooks/useMountEffect";
import type { Frame, Session } from "../frames";

const SESSION_DURATION = 2200;
const PHOTO_SIZES = "(min-width: 768px) 42vw, 92vw";

function now() {
  return performance.now();
}

function coverOf(session: Session): Frame {
  return session.frames.find((frame) => frame.height > frame.width) ?? session.frames[0];
}

export function WorkReel({ sessions }: { sessions: Session[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const indexRef = useRef(0);
  const pausedRef = useRef(false);
  const hoveringRef = useRef(false);
  const lastMoveRef = useRef(0);
  const swipeStartRef = useRef<number | null>(null);
  const swipedRef = useRef(false);

  function wrap(value: number) {
    return (value + sessions.length) % sessions.length;
  }

  function show(next: number) {
    indexRef.current = wrap(next);
    lastMoveRef.current = now();
    setIndex(indexRef.current);
  }

  function setPausedState(value: boolean) {
    pausedRef.current = value;
    lastMoveRef.current = now();
    setPaused(value);
  }

  useMountEffect(() => {
    lastMoveRef.current = now();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPausedState(true);

    const timer = window.setInterval(() => {
      if (pausedRef.current || hoveringRef.current || document.hidden) return;
      if (now() - lastMoveRef.current < SESSION_DURATION) return;
      show(indexRef.current + 1);
    }, 100);

    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") show(indexRef.current + 1);
      if (event.key === "ArrowLeft") show(indexRef.current - 1);
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("keydown", onKey);
    };
  });

  function onPointerDown(event: PointerEvent) {
    swipeStartRef.current = event.clientX;
    swipedRef.current = false;
  }

  function onPointerUp(event: PointerEvent) {
    if (swipeStartRef.current === null || event.pointerType === "mouse") return;
    const delta = event.clientX - swipeStartRef.current;
    swipeStartRef.current = null;
    if (Math.abs(delta) < 40) return;
    swipedRef.current = true;
    show(indexRef.current + (delta < 0 ? 1 : -1));
  }

  function onPhotoClick(event: MouseEvent) {
    if (!swipedRef.current) return;
    event.preventDefault();
    swipedRef.current = false;
  }

  function onZoneClick(direction: 1 | -1) {
    if (swipedRef.current) {
      swipedRef.current = false;
      return;
    }
    show(indexRef.current + direction);
  }

  const session = sessions[index];
  const cover = coverOf(session);
  const photoStyle = { "--ratio": cover.width / cover.height } as CSSProperties;

  return (
    <>
      <main className="reel">
        <div
          className="reel-stage"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (swipeStartRef.current = null)}
        >
          <button type="button" className="stage-zone stage-zone--prev" aria-label="Previous session" onClick={() => onZoneClick(-1)} />
          <button type="button" className="stage-zone stage-zone--next" aria-label="Next session" onClick={() => onZoneClick(1)} />
          <Link
            href={`/work/${session.slug}`}
            className="reel-link"
            style={photoStyle}
            onClick={onPhotoClick}
            onMouseEnter={() => (hoveringRef.current = true)}
            onMouseLeave={() => (hoveringRef.current = false)}
            onFocus={() => (hoveringRef.current = true)}
            onBlur={() => (hoveringRef.current = false)}
            draggable={false}
          >
            <Image
              key={cover.src}
              className="reel-photo"
              src={cover.src}
              alt={`${session.model}, open the session`}
              fill
              sizes={PHOTO_SIZES}
              preload={index === 0}
              draggable={false}
            />
          </Link>
          <span className="stage-preload" aria-hidden="true">
            {[1, -1].map((offset) => (
              <Image
                key={offset}
                src={coverOf(sessions[wrap(index + offset)]).src}
                alt=""
                fill
                sizes={PHOTO_SIZES}
                loading="eager"
              />
            ))}
          </span>
        </div>
        <p className="reel-caption" aria-live="polite">
          {session.model}
        </p>
      </main>

      <footer className="baseline">
        <p className="baseline-end">
          <span className="baseline-count">
            {index + 1}/{sessions.length}
          </span>
          <button type="button" onClick={() => setPausedState(!paused)} aria-pressed={paused}>
            {paused ? "Play" : "Pause"}
          </button>
        </p>
      </footer>
    </>
  );
}
