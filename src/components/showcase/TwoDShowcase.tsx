"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Konva from "konva";

type NodeItem = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
};

function snap(v: number, step: number) {
  return Math.round(v / step) * step;
}

export default function TwoDShowcase() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<Konva.Stage | null>(null);

  const grid = 32;

  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const nodes = useMemo<NodeItem[]>(
    () => [
      { id: "n1", x: 120, y: 120, w: 220, h: 88, title: "Surface Layer" },
      { id: "n2", x: 420, y: 190, w: 260, h: 88, title: "Interaction" },
      { id: "n3", x: 260, y: 320, w: 280, h: 88, title: "Motion System" },
    ],
    []
  );

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // --- Stage & layers ---
    const stage = new Konva.Stage({
      container: host,
      width: host.clientWidth,
      height: host.clientHeight,
    });
    stageRef.current = stage;

    const gridLayer = new Konva.Layer();
    const edgeLayer = new Konva.Layer();
    const nodeLayer = new Konva.Layer();
    const uiLayer = new Konva.Layer();

    stage.add(gridLayer);
    stage.add(edgeLayer);
    stage.add(nodeLayer);
    stage.add(uiLayer);

    // --- Grid ---
    const drawGrid = () => {
      gridLayer.destroyChildren();
      const w = stage.width();
      const h = stage.height();

      const g = new Konva.Group({ opacity: 0.22 });
      for (let x = 0; x < w; x += grid) {
        g.add(
          new Konva.Line({
            points: [x, 0, x, h],
            stroke: "rgba(255,255,255,.16)",
            strokeWidth: x % (grid * 4) === 0 ? 1.2 : 1,
          })
        );
      }
      for (let y = 0; y < h; y += grid) {
        g.add(
          new Konva.Line({
            points: [0, y, w, y],
            stroke: "rgba(255,255,255,.16)",
            strokeWidth: y % (grid * 4) === 0 ? 1.2 : 1,
          })
        );
      }
      gridLayer.add(g);
      gridLayer.draw();
    };

    // --- Nodes ---
    const nodeShapes = new Map<string, Konva.Group>();

    const drawEdges = () => {
      edgeLayer.destroyChildren();
      const a = nodeShapes.get("n1");
      const b = nodeShapes.get("n2");
      const c = nodeShapes.get("n3");
      if (!a || !b || !c) return;

      const center = (g: Konva.Group) => {
        const r = g.getClientRect({ relativeTo: stage });
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
      };

      const p1 = center(a);
      const p2 = center(b);
      const p3 = center(c);

      const mk = (from: any, to: any) =>
        new Konva.Line({
          points: [from.x, from.y, (from.x + to.x) / 2, (from.y + to.y) / 2, to.x, to.y],
          stroke: "rgba(120,170,255,.55)",
          strokeWidth: 2,
          lineCap: "round",
          lineJoin: "round",
          tension: 0.4,
          shadowColor: "rgba(120,170,255,.25)",
          shadowBlur: 12,
          shadowOffset: { x: 0, y: 0 },
          shadowOpacity: 1,
        });

      edgeLayer.add(mk(p1, p2));
      edgeLayer.add(mk(p2, p3));
      edgeLayer.add(mk(p1, p3));
      edgeLayer.draw();
    };

    const mkNode = (n: NodeItem) => {
      const g = new Konva.Group({
        x: n.x,
        y: n.y,
        draggable: true,
        id: n.id,
      });

      const card = new Konva.Rect({
        width: n.w,
        height: n.h,
        cornerRadius: 16,
        fillLinearGradientStartPoint: { x: 0, y: 0 },
        fillLinearGradientEndPoint: { x: 0, y: n.h },
        fillLinearGradientColorStops: [
          0,
          "rgba(255,255,255,.10)",
          1,
          "rgba(255,255,255,.06)",
        ],
        stroke: "rgba(255,255,255,.18)",
        strokeWidth: 1,
        shadowColor: "rgba(0,0,0,.55)",
        shadowBlur: 18,
        shadowOffset: { x: 0, y: 10 },
        shadowOpacity: 0.65,
      });

      const badge = new Konva.Rect({
        x: 14,
        y: 14,
        width: 70,
        height: 22,
        cornerRadius: 999,
        fill: "rgba(255,255,255,.08)",
        stroke: "rgba(255,255,255,.12)",
        strokeWidth: 1,
      });

      const badgeText = new Konva.Text({
        x: 14,
        y: 18,
        width: 70,
        text: "LIVE",
        align: "center",
        fontSize: 10,
        letterSpacing: 2,
        fill: "rgba(255,255,255,.75)",
        fontStyle: "bold",
      });

      const title = new Konva.Text({
        x: 14,
        y: 44,
        width: n.w - 28,
        text: n.title,
        fontSize: 16,
        fill: "rgba(255,255,255,.92)",
        fontStyle: "600",
      });

      const sub = new Konva.Text({
        x: 14,
        y: 66,
        width: n.w - 28,
        text: "Drag • Snap • Inspect",
        fontSize: 12,
        fill: "rgba(255,255,255,.55)",
      });

      g.add(card);
      g.add(badge);
      g.add(badgeText);
      g.add(title);
      g.add(sub);

      // Hover / select styling
      const applyState = () => {
        const isSel = selected === n.id;
        const isHover = hovered === n.id;

        card.stroke(isSel ? "rgba(255,255,255,.42)" : "rgba(255,255,255,.18)");
        card.shadowOpacity(isSel ? 0.9 : 0.65);

        if (isHover && !isSel) {
          card.stroke("rgba(170,210,255,.42)");
        }
      };

      g.on("mouseenter", () => {
        document.body.style.cursor = "grab";
        setHovered(n.id);
      });

      g.on("mouseleave", () => {
        document.body.style.cursor = "default";
        setHovered((cur) => (cur === n.id ? null : cur));
      });

      g.on("mousedown touchstart", () => setSelected(n.id));

      g.on("dragstart", () => {
        document.body.style.cursor = "grabbing";
      });

      g.on("dragmove", () => {
        // soft snap preview
        const nx = snap(g.x(), grid);
        const ny = snap(g.y(), grid);
        g.position({ x: nx, y: ny });
        drawEdges();
      });

      g.on("dragend", () => {
        document.body.style.cursor = "grab";
        drawEdges();
      });

      // Re-apply state on render ticks
      const stateTick = () => applyState();
      g.on("draw", stateTick);

      nodeShapes.set(n.id, g);
      nodeLayer.add(g);
    };

    // Render all
    nodes.forEach(mkNode);

    // Click empty space to clear selection
    stage.on("mousedown touchstart", (e) => {
      if (e.target === stage) setSelected(null);
    });

    // Minimal “Inspector” overlay in canvas (uiLayer)
    const inspector = new Konva.Label({ x: 14, y: 14, opacity: 0.95 });
    const tag = new Konva.Tag({
      fill: "rgba(0,0,0,.45)",
      stroke: "rgba(255,255,255,.12)",
      strokeWidth: 1,
      cornerRadius: 14,
    });
    const labelText = new Konva.Text({
      text: "Select a node",
      fill: "rgba(255,255,255,.85)",
      fontSize: 12,
      padding: 12,
    });
    inspector.add(tag);
    inspector.add(labelText);
    uiLayer.add(inspector);

    const updateInspector = () => {
      if (!selected) {
        labelText.text("Select a node");
      } else {
        const g = nodeShapes.get(selected);
        if (g) {
          labelText.text(`Selected: ${selected}  •  x:${Math.round(g.x())} y:${Math.round(g.y())}`);
        } else {
          labelText.text(`Selected: ${selected}`);
        }
      }
      uiLayer.draw();
    };

    const tick = () => {
      // update selection/hover styling
      for (const [id, g] of nodeShapes.entries()) {
        const rect = g.findOne<Konva.Rect>("Rect");
        if (!rect) continue;
        const isSel = selected === id;
        const isHover = hovered === id;

        rect.stroke(isSel ? "rgba(255,255,255,.42)" : "rgba(255,255,255,.18)");
        rect.shadowOpacity(isSel ? 0.9 : 0.65);
        if (isHover && !isSel) rect.stroke("rgba(170,210,255,.42)");
      }
      updateInspector();
      drawEdges();
      nodeLayer.draw();
    };

    const interval = window.setInterval(tick, 80);

    // Resize
    const ro = new ResizeObserver(() => {
      stage.width(host.clientWidth);
      stage.height(host.clientHeight);
      drawGrid();
      drawEdges();
      nodeLayer.draw();
      uiLayer.draw();
    });
    ro.observe(host);

    drawGrid();
    drawEdges();
    nodeLayer.draw();
    uiLayer.draw();

    return () => {
      window.clearInterval(interval);
      ro.disconnect();
      stage.destroy();
      stageRef.current = null;
      document.body.style.cursor = "default";
    };
  }, [grid, nodes, selected, hovered]);

  return <div ref={hostRef} style={{ position: "absolute", inset: 0 }} />;
}
