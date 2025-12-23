"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const SceneMount = dynamic(() => import("@/components/SceneMount"), { ssr: false });

type Props = {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string; // e.g. "200px"
};

export default function LazyScene({ children, className, rootMargin = "220px" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setReady(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {ready ? <SceneMount className="h-full w-full">{children}</SceneMount> : null}
    </div>
  );
}
