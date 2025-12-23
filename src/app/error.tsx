"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // You can later send this to your logging endpoint
    console.error("GlobalErrorBoundary:", error);
  }, [error]);

  return (
    <html>
      <body
        style={{
          margin: 0,
          background: "black",
          color: "white",
          fontFamily: "system-ui,-apple-system",
        }}
      >
        <div style={{ padding: 20, maxWidth: 920, margin: "0 auto" }}>
          <div style={{ letterSpacing: ".22em", fontSize: 11, color: "rgba(255,190,190,.9)" }}>
            APPLICATION CRASH
          </div>

          <h1 style={{ marginTop: 10, fontSize: 26 }}>
            A client-side exception occurred.
          </h1>

          <p style={{ color: "rgba(255,255,255,.75)", lineHeight: 1.6 }}>
            This is the real error message coming from the app (not the generic browser message).
            Copy it and send it here — we’ll fix the exact cause.
          </p>

          <div
            style={{
              marginTop: 14,
              border: "1px solid rgba(255,80,80,.45)",
              borderRadius: 14,
              padding: 14,
              background: "rgba(255,255,255,.04)",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            <div style={{ fontWeight: 700 }}>Message:</div>
            <div style={{ marginTop: 6, color: "rgba(255,255,255,.85)" }}>
              {error?.message || "Unknown error"}
            </div>

            {error?.digest ? (
              <div style={{ marginTop: 10, color: "rgba(255,255,255,.6)", fontSize: 12 }}>
                Digest: {error.digest}
              </div>
            ) : null}

            <details style={{ marginTop: 12 }}>
              <summary style={{ cursor: "pointer", color: "rgba(255,255,255,.7)" }}>
                Stack (tap to expand)
              </summary>
              <div style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,.7)" }}>
                {error?.stack || "No stack available"}
              </div>
            </details>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            <button
              onClick={() => reset()}
              style={{
                border: "1px solid rgba(255,255,255,.2)",
                background: "rgba(255,255,255,.08)",
                color: "white",
                padding: "10px 14px",
                borderRadius: 9999,
                cursor: "pointer",
              }}
            >
              Retry
            </button>

            <button
              onClick={() => location.reload()}
              style={{
                border: "1px solid rgba(255,255,255,.2)",
                background: "rgba(255,255,255,.08)",
                color: "white",
                padding: "10px 14px",
                borderRadius: 9999,
                cursor: "pointer",
              }}
            >
              Reload
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
