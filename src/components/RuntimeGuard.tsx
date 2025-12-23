"use client";

import { useEffect, useState } from "react";

export default function RuntimeGuard() {
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      const msg = e?.message || "Unknown runtime error";
      setErr(msg);
    };

    const onRejection = (e: PromiseRejectionEvent) => {
      const msg =
        (e?.reason && (e.reason.message || String(e.reason))) ||
        "Unhandled promise rejection";
      setErr(msg);
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  if (!err) return null;

  return (
    <div className="fixed left-4 right-4 top-4 z-[9999] rounded-2xl border border-red-500/40 bg-black/80 p-4 text-sm text-white shadow-2xl backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs tracking-[0.22em] text-red-200/90">RUNTIME ERROR</div>
          <div className="mt-2 font-semibold">Something crashed while scrolling.</div>
          <div className="mt-2 break-words text-white/80">{err}</div>
          <div className="mt-3 text-xs text-white/60">
            Screenshot this message and send it here — we’ll fix the exact source.
          </div>
        </div>
        <button
          className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80 hover:border-white/40"
          onClick={() => setErr(null)}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
