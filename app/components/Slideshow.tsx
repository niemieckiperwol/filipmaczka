"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { useMountEffect } from "@/hooks/useMountEffect";
import type { Frame } from "../frames";

const FRAME_DURATION = 1400;
const PHOTO_SIZES = "(min-width: 768px) 42vw, 92vw";

type View = "slideshow" | "sheet";

function now() {
  return performance.now();
}

function sheetLayout(count: number) {
  const columns = count <= 6 ? count : Math.ceil(count / 2);
  const mobileColumns = count <= 4 ? 2 : 3;
  return {
    "--columns": columns,
    "--rows": Math.ceil(count / columns),
    "--columns-mobile": mobileColumns,
    "--rows-mobile": Math.ceil(count / mobileColumns),
  } as CSSProperties;
}

export function Slideshow({
  frames,
  allowSheet = false,
  showModel = true,
}: {
  frames: Frame[];
  allowSheet?: boolean;
  showModel?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [view, setView] = useState<View>("slideshow");

  const indexRef = useRef(0);
  const pausedRef = useRef(false);
  const viewRef = useRef<View>("slideshow");
  const lastMoveRef = useRef(0);
  const swipeStartRef = useRef<number | null>(null);
  const swipedRef = useRef(false);

  function wrap(value: number) {
    return (value + frames.length) % frames.length;
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

  function setViewState(value: View) {
    viewRef.current = value;
    lastMoveRef.current = now();
    setView(value);
  }

  function openFrame(frameIndex: number) {
    show(frameIndex);
    setViewState("slideshow");
  }

  useMountEffect(() => {
    lastMoveRef.current = now();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPausedState(true);

    const timer = window.setInterval(() => {
      if (pausedRef.current || viewRef.current === "sheet" || document.hidden) return;
      if (now() - lastMoveRef.current < FRAME_DURATION) return;
      show(indexRef.current + 1);
    }, 100);

    function onKey(event: KeyboardEvent) {
      if (viewRef.current === "sheet") return;
      if (event.key === "ArrowRight") show(indexRef.current + 1);
      if (event.key === "ArrowLeft") show(indexRef.current - 1);
      if (event.key === " " && event.target === document.body) {
        event.preventDefault();
        setPausedState(!pausedRef.current);
      }
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

  function onZoneClick(direction: 1 | -1) {
    if (swipedRef.current) {
      swipedRef.current = false;
      return;
    }
    show(indexRef.current + direction);
  }

  const frame = frames[index];
  const count = String(frames.length).length;
  const position = `${String(index + 1).padStart(count, "0")}/${frames.length}`;
  const viewToggle = allowSheet && (
    <button type="button" onClick={() => setViewState(view === "sheet" ? "slideshow" : "sheet")}>
      {view === "sheet" ? "Slideshow" : "Grid"}
    </button>
  );

  if (view === "sheet") {
    return (
      <>
        <main className="sheet" style={sheetLayout(frames.length)} aria-label={`All photographs of ${frame.model}`}>
          {frames.map((item, frameIndex) => (
            <button
              key={item.src}
              type="button"
              className="sheet-item"
              onClick={() => openFrame(frameIndex)}
              aria-label={`Open photograph ${frameIndex + 1} of ${frames.length}`}
            >
              <Image className="sheet-photo" src={item.src} alt="" fill sizes="(min-width: 768px) 20vw, 33vw" />
            </button>
          ))}
        </main>

        <footer className="baseline">
          <p>{frame.model}</p>
          <p className="baseline-end">
            <span className="baseline-count">{frames.length}</span>
            {viewToggle}
          </p>
        </footer>
      </>
    );
  }

  return (
    <>
      <main
        className="stage"
        aria-roledescription="carousel"
        aria-label="Selected work"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (swipeStartRef.current = null)}
      >
        <Image
          key={frame.src}
          className="stage-photo"
          src={frame.src}
          alt={`${frame.model}, photograph ${index + 1} of ${frames.length}`}
          fill
          sizes={PHOTO_SIZES}
          preload={index === 0}
        />
        <div className="stage-preload" aria-hidden="true">
          {[1, 2, 3, -1].map((offset) => (
            <Image
              key={offset}
              src={frames[wrap(index + offset)].src}
              alt=""
              fill
              sizes={PHOTO_SIZES}
              loading="eager"
            />
          ))}
        </div>
        <button type="button" className="stage-zone stage-zone--prev" aria-label="Previous photograph" onClick={() => onZoneClick(-1)} />
        <button type="button" className="stage-zone stage-zone--next" aria-label="Next photograph" onClick={() => onZoneClick(1)} />
      </main>

      <footer className="baseline">
        {showModel && <p aria-live="polite">{frame.model}</p>}
        <p className="baseline-end">
          <span className="baseline-count">{position}</span>
          <button type="button" onClick={() => setPausedState(!paused)} aria-pressed={paused}>
            {paused ? "Play" : "Pause"}
          </button>
          {viewToggle}
        </p>
      </footer>
    </>
  );
}
