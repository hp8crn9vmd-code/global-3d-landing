"use client";

import TwoDShowcase from "@/components/showcase/TwoDShowcase";
import ThreeDShowcase from "@/components/showcase/ThreeDShowcase";

export default function HomeClient() {
  return (
    <>
      <header className="nav">
        <div className="container navInner">
          <div className="brand">
            <span className="dot" />
            <span>GLOBAL LAB</span>
          </div>
          <nav className="links">
            <a href="#capabilities">Capabilities</a>
            <a href="#two">2D</a>
            <a href="#three">3D</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="btn btnPrimary" href="#contact">Request a demo</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="heroGlow" />
          <div className="container heroGrid">
            <div>
              <div className="pill">
                <span className="dot" style={{width:6,height:6,opacity:.9}} />
                <span>Production-grade interactive surfaces</span>
              </div>

              <p className="kicker" style={{marginTop:16}}>Designed like a real product</p>
              <h1 className="h1">An interactive landing that proves craft — in 2D and 3D.</h1>
              <p className="lead">
                Not a list of tools. Real rendering, real interaction, and disciplined motion —
                built to feel like an enterprise interface system.
              </p>

              <div style={{display:"flex", gap:12, flexWrap:"wrap"}}>
                <a className="btn btnPrimary" href="#two">Explore 2D surface</a>
                <a className="btn" href="#three">Explore 3D scene</a>
              </div>

              <div className="kpiGrid">
                <div className="kpi">
                  <div className="kpiNum">Layered UI</div>
                  <div className="kpiLabel">Grid, nodes, edges, inspector — with interaction states.</div>
                </div>
                <div className="kpi">
                  <div className="kpiNum">Motion discipline</div>
                  <div className="kpiLabel">Subtle choreography that respects devices and preferences.</div>
                </div>
                <div className="kpi">
                  <div className="kpiNum">Performance-aware</div>
                  <div className="kpiLabel">Adaptive quality that stays stable on mobile browsers.</div>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panelHead">
                <div className="panelTitle">Live surface</div>
                <div style={{color:"rgba(255,255,255,.55)", fontSize:12}}>Interactive — not decorative</div>
              </div>
              <div className="canvasShell">
                {/* Hero preview intentionally minimal. 2D/3D are demonstrated below. */}
              </div>
              <div className="panelBody">
                <p className="note">
                  Scroll down to see a real 2D interaction surface, then a real-time 3D scene.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="capabilities" className="section">
          <div className="container">
            <h2 className="sectionTitle">Capabilities</h2>
            <p className="sectionDesc">
              Built to demonstrate engineering taste: composition, state, interaction, and visual hierarchy —
              with a clean, modern UI system.
            </p>

            <div className="cards3">
              <div className="card">
                <h3 className="cardTitle">Interaction design</h3>
                <p className="cardText">Drag, hover, snap, selection — behaviors that feel intentional.</p>
              </div>
              <div className="card">
                <h3 className="cardTitle">Visual hierarchy</h3>
                <p className="cardText">Typography, spacing, glass panels, and contrast tuned for clarity.</p>
              </div>
              <div className="card">
                <h3 className="cardTitle">Runtime stability</h3>
                <p className="cardText">Designed for mobile browsers with graceful fallbacks.</p>
              </div>
            </div>

            <div className="hrSoft" />
          </div>
        </section>

        <section id="two" className="section">
          <div className="container">
            <h2 className="sectionTitle">2D Implementation</h2>
            <p className="sectionDesc">
              A practical 2D surface: layered vectors, interaction states, snapping constraints,
              and an inspector-like overlay.
            </p>

            <div className="panel" style={{marginTop:18}}>
              <div className="panelHead">
                <div className="panelTitle">2D Surface</div>
                <div style={{color:"rgba(255,255,255,.55)", fontSize:12}}>Drag • Snap • Inspect</div>
              </div>
              <div className="canvasShell">
                <TwoDShowcase />
              </div>
              <div className="panelBody">
                <p className="note">
                  This is real interaction — move elements, see snapping, observe hover and selection.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="three" className="section">
          <div className="container">
            <h2 className="sectionTitle">3D Implementation</h2>
            <p className="sectionDesc">
              A real-time scene: physically-based materials, lighting discipline,
              and camera choreography with adaptive quality.
            </p>

            <div className="panel" style={{marginTop:18}}>
              <div className="panelHead">
                <div className="panelTitle">3D Scene</div>
                <div style={{color:"rgba(255,255,255,.55)", fontSize:12}}>PBR • Lighting • Motion</div>
              </div>
              <div className="canvasShell">
                <ThreeDShowcase />
              </div>
              <div className="panelBody">
                <p className="note">
                  Designed to feel premium: controlled highlights, soft shadows, and subtle motion.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <div className="panel">
              <div className="panelHead">
                <div className="panelTitle">Contact</div>
                <div style={{color:"rgba(255,255,255,.55)", fontSize:12}}>Ready for production handoff</div>
              </div>
              <div className="panelBody">
                <p className="note">
                  If you want, next we can add: pricing layout, case-study section, and a clean form flow —
                  while keeping performance and motion discipline.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
