"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useMountEffect } from "@/hooks/useMountEffect";
import type { Session } from "../frames";

const FLIP_DURATION = 420;

export function SessionCover({ session }: { session: Session }) {
  const [frame, setFrame] = useState(0);
  const timerRef = useRef<number | null>(null);

  function stop() {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    timerRef.current = null;
    setFrame(0);
  }

  function start() {
    if (timerRef.current !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timerRef.current = window.setInterval(() => {
      setFrame((current) => (current + 1) % session.frames.length);
    }, FLIP_DURATION);
  }

  useMountEffect(() => () => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
  });

  return (
    <Link
      href={`/work/${session.slug}`}
      className="cover"
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
    >
      <span className="cover-frame">
        {session.frames.map((item, index) => (
          <Image
            key={item.src}
            className={index === frame ? "cover-photo is-shown" : "cover-photo"}
            src={item.src}
            alt={index === 0 ? `${session.model}, cover photograph` : ""}
            fill
            sizes="(min-width: 768px) 19vw, 4rem"
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </span>
      <span className="cover-name">{session.model}</span>
      <span className="cover-count">{session.frames.length}</span>
    </Link>
  );
}
