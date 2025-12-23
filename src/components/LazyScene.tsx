"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  minHeight?: number;
  label?: string;
  className?: string;
};

function Skeleton({ label }: { label?: string }) {
  return (
    <div className="card-soft card-pad">
      <p className="eyebrow">{label ?? "LOADING"}</p>
      <div className="mt-4 space-y-3">
        <div className="h-3 w-2/3 rounded bg-white/10" />
        <div className="h-3 w-5/6 rounded bg-white/10" />
        <div className="h-3 w-1/2 rounded bg-white/10" />
      </div>
      <p className="mt-5 text-sm text-white/60 leading-6">
        Preparing the scene… optimizing for device capability and motion preferences.
      </p>
    </div>
  );
}

export default function LazyScene({
  children,
  minHeight = 380,
  label,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (hit) {
          setReady(true);
          io.disconnect();
        }
      },
      { root: null, threshold: 0.15, rootMargin: "120px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ minHeight }}>
      {ready ? children : <Skeleton label={label} />}
    </div>
  );
}
