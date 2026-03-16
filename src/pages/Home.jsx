import { Suspense, lazy, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Zap, Shield, CheckCircle2,
  Laptop, ShoppingCart, Code, Settings,
  Terminal, ShieldCheck
} from 'lucide-react'
import SEO from '../components/SEO.jsx'

const Spline = lazy(() => import('@splinetool/react-spline'))

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

const services = [
  { icon: <Laptop size={20} />, label: 'Business Websites', price: 'From $800' },
  { icon: <ShoppingCart size={20} />, label: 'E-Commerce', price: 'From $1,500' },
  { icon: <Code size={20} />, label: 'Custom Web Apps', price: 'From $2,000' },
  { icon: <Settings size={20} />, label: 'Maintenance', price: 'From $100/mo' },
]

function SplineSkeleton() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {[0, 1, 2].map(i => (
        <motion.div key={i}
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.05, 0.15] }}
          transition={{ duration: 2.5, delay: i * 0.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', width: 200 + i * 120, height: 200 + i * 120, borderRadius: '50%', border: '1px solid var(--accent)', opacity: 0.15 }}
        />
      ))}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, var(--accent), var(--spark))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>PT</span>
        </motion.div>
      </motion.div>
      <motion.p animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 1.8, repeat: Infinity }}
        style={{ position: 'absolute', bottom: '15%', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--t3)' }}>
        Loading 3D Scene…
      </motion.p>
    </div>
  )
}

export default function Home() {
  const [splineLoaded, setSplineLoaded] = useState(false)

  return (
    <>
      <SEO
        title="Expert Web Development & IT Solutions"
        description="Prairie Tech Services offers professional React development, IT support, and software solutions in High Prairie, Alberta."
        path="/"
      />

      <div className="page-wrap" style={{ background: 'var(--bg)', overflowX: 'hidden' }}>

        {/* ─── HERO ─── */}
        <section className="hero-sec">
          <div className="container hero-layout-container">

            {/* ROBOT */}
            <div className="bot-master-container">
              <AnimatePresence>
                {!splineLoaded && (
                  <motion.div key="skeleton" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
                    style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
                    <SplineSkeleton />
                  </motion.div>
                )}
              </AnimatePresence>

              <Suspense fallback={<SplineSkeleton />}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: splineLoaded ? 1 : 0 }} transition={{ duration: 1 }}
                  style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
                  <Spline
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="spline-canvas"
                    onLoad={(spline) => {
                      setSplineLoaded(true)
                      spline.setZoom(window.innerWidth < 768 ? 0.65 : 0.85)
                    }}
                    style={{ touchAction: 'none' }}
                  />
                </motion.div>
              </Suspense>
              <div className="bot-fade" />
            </div>

            {/* TEXT */}
            <div className="hero-text-box">

              {/* BADGE — from Hero component */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="hero-badge"
              >
                <span className="badge-dot" />
                Available for New Projects in Alberta
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="sec-tag" style={{ pointerEvents: 'auto' }}
              >
                Alberta · Canada · Open for Projects
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hero-title"
              >
                We Build <br />
                <span className="grad-text">Digital Products</span> <br />
                That Grow Business.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="hero-desc"
              >
                Full-stack development from High Prairie. We turn complex ideas into fast, secure, and premium web experiences.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="hero-btns"
              >
                <Link to="/contact">
                  <motion.div whileHover={{ scale: 1.05 }} className="btn-primary">
                    Start a Project <ArrowRight size={16} />
                  </motion.div>
                </Link>
                <Link to="/projects">
                  <motion.div whileHover={{ scale: 1.05 }} className="btn-ghost">
                    See Our Work
                  </motion.div>
                </Link>
              </motion.div>

              {/* FEATURE ITEMS — from Hero component */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="hero-features"
              >
                <div className="feature-item">
                  <Terminal size={15} color="var(--accent)" />
                  <span>Custom Dev</span>
                </div>
                <div className="feature-item">
                  <ShieldCheck size={15} color="var(--accent)" />
                  <span>IT Support</span>
                </div>
                <div className="feature-item">
                  <Zap size={15} color="var(--accent)" />
                  <span>Fast Delivery</span>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ─── STATS ─── */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              {[{ num: '5+', label: 'Projects' }, { num: '100%', label: 'Success' }, { num: '24h', label: 'Response' }, { num: '3+', label: 'Yrs Exp' }].map((s, i) => (
                <motion.div key={s.label} {...fadeUp(i * 0.1)} className="stat-item">
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SERVICES PREVIEW ─── */}
        <section className="section-padding">
          <div className="container">
            <div className="full-center-header">
              <div className="sec-tag">Expertise</div>
              <h2 className="sec-title">Our Solutions</h2>
            </div>
            <div className="services-grid-row">
              {services.map((s, i) => (
                <motion.div key={s.label} {...fadeUp(i * 0.1)} className="service-card">
                  <div className="service-content-inner">
                    <div className="service-top-line">
                      <span className="service-icon-svg">{s.icon}</span>
                      <h3 className="service-label">{s.label}</h3>
                    </div>
                    <p className="service-price">{s.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="center-view-all">
              <Link to="/services" className="view-all">View All Services <ArrowRight size={14} /></Link>
            </div>
          </div>
        </section>

        {/* ─── WHY US ─── */}
        <section className="section-padding no-top-mobile">
          <div className="container">
            <div className="trust-wrapper">
              <div className="grid-2">
                <motion.div {...fadeUp(0.1)} className="trust-content">
                  <h2 className="sec-title">Why Work With Us?</h2>
                  <div className="trust-list">
                    {['2-4 Week Delivery', 'Fixed Price Guarantee', 'Direct Support'].map(text => (
                      <div key={text} className="trust-item">
                        <CheckCircle2 size={18} color="var(--accent)" />
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                <div className="trust-cards">
                  <div className="mini-card centered-layout">
                    <Zap size={20} color="var(--accent)" />
                    <h4>Performance</h4>
                    <p>Optimized for Core Web Vitals.</p>
                  </div>
                  <div className="mini-card centered-layout">
                    <Shield size={20} color="var(--accent)" />
                    <h4>Security</h4>
                    <p>Industry-standard protection.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="section-padding cta-section-wrap">
          <div className="container">
            <motion.div {...fadeUp()} className="cta-box">
              <h2 className="sec-title">Ready to build something great?</h2>
              <p className="cta-subtitle">Let's discuss your project today. No strings attached.</p>
              <div className="cta-btn-center">
                <Link to="/contact">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn-primary">
                    Book a Free Call
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <style>{`
          .container { max-width: 1200px; margin: 0 auto; width: 100%; padding: 0 40px; }
          .section-padding { padding: 120px 0; }

          /* HERO */
          .hero-sec { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; }
          .hero-layout-container { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
          .bot-master-container { width: 55%; height: 85vh; position: relative; order: 2; display: flex; justify-content: center; align-items: center; z-index: 1; }
          .spline-canvas { width: 130% !important; height: 100% !important; position: absolute; left: 50%; transform: translateX(-30%); pointer-events: auto; }
          .bot-fade { position: absolute; inset: 0; z-index: 3; background: linear-gradient(90deg, var(--bg) 0%, transparent 30%, transparent 70%, var(--bg) 100%); pointer-events: none; }

          .hero-text-box { width: 45%; order: 1; z-index: 10; position: relative; pointer-events: none; }
          .hero-title, .hero-desc, .hero-btns, .sec-tag, .hero-badge, .hero-features { pointer-events: auto; }

          /* BADGE */
          .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: var(--card);
            padding: 6px 16px;
            border-radius: 100px;
            border: 1px solid var(--b1);
            font-size: 12px;
            font-weight: 500;
            color: var(--t2);
            margin-bottom: 12px;
          }
          .badge-dot {
            width: 7px; height: 7px;
            background: #22c55e;
            border-radius: 50%;
            box-shadow: 0 0 10px #22c55e;
            flex-shrink: 0;
          }

          .hero-title { font-family: var(--font-display); font-weight: 700; font-size: clamp(40px, 6vw, 80px); line-height: 1.1; color: var(--t1); margin-bottom: 24px; }
          .hero-desc { font-size: 17px; color: var(--t2); line-height: 1.6; max-width: 480px; margin-bottom: 32px; }
          .hero-btns { display: flex; gap: 16px; margin-bottom: 32px; }

          /* FEATURE ITEMS */
          .hero-features {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
          }
          .feature-item {
            display: flex;
            align-items: center;
            gap: 7px;
            font-size: 13px;
            color: var(--t3);
            font-weight: 500;
          }

          .btn-primary { background: var(--accent); color: white; padding: 14px 32px; border-radius: 12px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px; border: none; cursor: pointer; transition: 0.2s; font-family: var(--font-body); }
          .btn-ghost { background: var(--card); color: var(--t1); border: 1px solid var(--b2); padding: 14px 32px; border-radius: 12px; text-decoration: none; display: flex; align-items: center; cursor: pointer; transition: 0.2s; }
          .btn-ghost:hover { background: var(--card2); }

          /* STATS */
          .stats-section { background: var(--bg2); border-top: 1px solid var(--b1); border-bottom: 1px solid var(--b1); }
          .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
          .stat-item { padding: 50px 20px; text-align: center; border-right: 1px solid var(--b1); }
          .stat-item:last-child { border-right: none; }
          .stat-num { font-family: var(--font-display); font-size: 42px; font-weight: 700; color: var(--t1); }
          .stat-label { font-size: 12px; color: var(--t3); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px; }

          /* SERVICES */
          .full-center-header { text-align: center; margin-bottom: 50px; }
          .services-grid-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
          .service-card { background: var(--card); padding: 30px 15px; border-radius: 24px; border: 1px solid var(--b1); transition: 0.3s; display: flex; justify-content: center; align-items: center; min-height: 140px; }
          .service-card:hover { border-color: var(--accent-border); transform: translateY(-5px); }
          .service-content-inner { text-align: center; }
          .service-top-line { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 6px; }
          .service-icon-svg { color: var(--accent); display: flex; align-items: center; }
          .service-label { font-size: 17px; font-weight: 600; color: var(--t1); margin: 0; white-space: nowrap; font-family: var(--font-display); }
          .service-price { font-size: 13px; color: var(--t3); margin: 0; }
          .center-view-all { display: flex; justify-content: center; margin-top: 40px; }
          .view-all { color: var(--accent); text-decoration: none; display: flex; align-items: center; gap: 8px; font-weight: 500; font-size: 14px; }

          /* WHY US */
          .trust-wrapper { background: var(--card); padding: 80px; border-radius: 48px; border: 1px solid var(--b1); }
          .grid-2 { display: grid; grid-template-columns: 1fr 1.2fr; gap: 60px; align-items: center; }
          .trust-list { display: grid; gap: 18px; margin-top: 30px; }
          .trust-item { display: flex; align-items: center; gap: 12px; font-weight: 500; color: var(--t1); }
          .trust-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .mini-card { background: var(--bg); padding: 32px; border-radius: 24px; border: 1px solid var(--b1); }
          .centered-layout { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; }
          .mini-card h4 { font-family: var(--font-display); font-size: 16px; font-weight: 600; color: var(--t1); margin: 0; }
          .mini-card p { font-size: 13px; color: var(--t2); margin: 0; }

          /* CTA */
          .cta-box { background: var(--card2); border: 1px solid var(--b2); border-radius: 48px; padding: 100px 40px; text-align: center; display: flex; flex-direction: column; align-items: center; }
          .cta-subtitle { color: var(--t2); font-size: 18px; margin: 0 0 40px; max-width: 500px; font-weight: 300; }
          .cta-btn-center { display: flex; justify-content: center; width: 100%; }

          /* RESPONSIVE */
          @media (max-width: 1100px) {
            .services-grid-row { grid-template-columns: repeat(2, 1fr); }
            .container { padding: 0 24px; }
          }
          @media (max-width: 768px) {
            .section-padding { padding: 60px 0; }
            .hero-layout-container { flex-direction: column; text-align: center; padding-top: 40px; }
            .bot-master-container { width: 100%; height: 50vh; order: 1; }
            .spline-canvas { width: 160% !important; transform: translateX(-50%); left: 50%; }
            .hero-text-box { width: 100%; order: 2; padding-bottom: 40px; }
            .hero-btns { justify-content: center; flex-direction: column; align-items: center; gap: 12px; }
            .hero-btns a, .hero-btns > div { width: 100%; max-width: 280px; }
            .btn-primary, .btn-ghost { width: 100%; justify-content: center; }
            .hero-features { justify-content: center; }
            .hero-badge { margin: 0 auto 12px; }
            .stats-grid { grid-template-columns: repeat(2, 1fr); }
            .grid-2 { grid-template-columns: 1fr; gap: 40px; text-align: center; }
            .trust-list { justify-content: center; }
            .trust-cards { grid-template-columns: 1fr; }
            .trust-wrapper { padding: 40px 24px; border-radius: 32px; }
            .cta-box { padding: 60px 24px; border-radius: 32px; }
          }
          @media (max-width: 500px) {
            .services-grid-row { grid-template-columns: 1fr; }
            .service-label { white-space: normal; }
          }
        `}</style>
      </div>
    </>
  )
}