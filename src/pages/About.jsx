import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Globe,
  Code2,
  Terminal,
  Database,
  Cpu,
  Layers,
  MessageSquare,
  Rocket
} from 'lucide-react'
import SEO from '../components/SEO.JSX'

const stack = [
  { cat: 'Frontend', items: ['React', 'Next.js', 'Vite', 'Framer Motion', 'Tailwind'], icon: <Code2 size={18} /> },
  { cat: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'JWT Auth', 'Mongoose'], icon: <Terminal size={18} /> },
  { cat: 'Database', items: ['MongoDB', 'PostgreSQL', 'Firebase', 'Redis'], icon: <Database size={18} /> },
  { cat: 'DevOps', items: ['Git', 'Vercel', 'Docker', 'Nginx', 'VS Code'], icon: <Cpu size={18} /> },
]

const steps = [
  { num: '01', title: 'Discovery Call', desc: 'Free 30-min call. We listen, understand your goals, no pitch.' },
  { num: '02', title: 'Proposal', desc: 'Written proposal: exact scope, timeline, fixed price.' },
  { num: '03', title: 'Build', desc: '50% deposit starts dev. Regular updates and staging link.' },
  { num: '04', title: 'Launch', desc: 'Final review → live. 2-week free post-launch support.' },
]

export default function About() {
  return (
    <>
      <SEO
        title="Our Projects"
        description="Check out our latest web development and IT projects in High Prairie, Alberta."
        path="/projects"
      />
      <div className="page-wrap" style={{ background: 'var(--bg)', paddingTop: 80 }}>

        {/* ─── INTRO SECTION ─── */}
        <section className="about-intro-sec">
          <div className="container intro-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="intro-text-side"
            >
              <div className="sec-tag">Who We Are</div>
              <h1 className="about-main-title">About<br /><span className="grad-text">Prairie Tech</span></h1>
              <p className="about-p">
                Prairie Tech Services is a specialized full-stack studio based in <strong>High Prairie, Alberta</strong>. We build digital products for businesses that value speed, security, and scalability.
              </p>
              <p className="about-p">
                With a deep background in computer technology, we deliver clean-code solutions without the agency fluff. No shortcuts, just high-performance builds.
              </p>
              <Link to="/contact" className="cta-link">
                Work With Us <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="profile-box-outer"
            >
              <div className="profile-box-inner">
                <div className="profile-badge">PT</div>
                <h3 className="profile-name">Prairie Tech Services</h3>
                <p className="profile-sub"><Globe size={12} /> Alberta, Canada</p>

                <div className="profile-info-list">
                  <div className="info-item"><span>Location</span><span className="info-val">High Prairie</span></div>
                  <div className="info-item"><span>Expertise</span><span className="info-val">MERN Stack</span></div>
                  <div className="info-item"><span>Availability</span><span className="info-val" style={{ color: 'var(--accent)' }}>● Open Now</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── BENTO ARSENAL (TECH STACK) ─── */}
        <section className="arsenal-sec">
          <div className="container">
            <div className="section-header-centered">
              <div className="sec-tag">Capabilities</div>
              <h2 className="section-title-h2">The <span className="grad-text">Arsenal</span></h2>
              <p className="section-subtitle">What we use to build your digital future.</p>
            </div>

            <div className="bento-grid">
              {stack.map((s, i) => (
                <motion.div
                  key={s.cat}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bento-card bento-${s.cat.toLowerCase()}`}
                >
                  <div className="bento-card-header">
                    <div className="bento-card-icon">{s.icon}</div>
                    <span className="bento-card-cat">{s.cat}</span>
                  </div>
                  <div className="bento-card-tags">
                    {s.items.map(item => (
                      <span key={item} className="stack-pill">{item}</span>
                    ))}
                  </div>
                  <div className="bento-glow-effect" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROCESS SECTION ─── */}
        <section className="process-sec">
          <div className="container">
            <div className="section-header-centered">
              <div className="sec-tag">How It Works</div>
              <h2 className="section-title-h2">Our Process</h2>
            </div>
            <div className="process-grid">
              {steps.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="process-card"
                >
                  <div className="process-step-num">{s.num}</div>
                  <h3 className="process-step-title">{s.title}</h3>
                  <p className="process-step-desc">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <style>{`
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        /* Intro Section */
        .about-intro-sec { padding: 100px 0; border-bottom: 1px solid var(--b1); }
        .intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .about-main-title { font-family: var(--font-display); font-size: clamp(44px, 6vw, 82px); font-weight: 700; color: var(--t1); line-height: 0.95; letter-spacing: -3px; margin-bottom: 24px; }
        .about-p { font-size: 16px; color: var(--t2); line-height: 1.8; margin-bottom: 20px; font-weight: 300; }
        .cta-link { display: inline-flex; align-items: center; gap: 8px; color: var(--accent); font-weight: 600; text-decoration: none; font-size: 14px; margin-top: 10px; }

        /* Profile Box */
        .profile-box-outer { background: var(--card); border: 1px solid var(--b2); border-radius: 32px; padding: 12px; }
        .profile-box-inner { padding: 32px; background: var(--bg2); border: 1px solid var(--b1); border-radius: 22px; position: relative; overflow: hidden; }
        .profile-badge { width: 56px; height: 56px; background: var(--accent); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 20px; margin-bottom: 20px; }
        .profile-name { font-size: 20px; font-weight: 600; color: var(--t1); margin-bottom: 4px; }
        .profile-sub { font-size: 12px; color: var(--t3); margin-bottom: 24px; display: flex; align-items: center; gap: 6px; }
        .info-item { display: flex; justify-content: space-between; padding: 12px 0; border-top: 1px solid var(--b1); font-size: 13px; color: var(--t3); }
        .info-val { color: var(--t1); font-weight: 500; }

        /* Arsenal Section & Bento Grid */
        .arsenal-sec { padding: 100px 0; border-bottom: 1px solid var(--b1); }
        .section-header-centered { text-align: center; margin-bottom: 60px; }
        .section-title-h2 { font-family: var(--font-display); font-size: clamp(32px, 5vw, 56px); font-weight: 700; color: var(--t1); letter-spacing: -2px; margin-bottom: 12px; }
        .section-subtitle { color: var(--t3); font-size: 16px; font-weight: 300; }

        .bento-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 20px; }
        .bento-card { position: relative; background: var(--card); border: 1px solid var(--b1); padding: 32px; border-radius: 28px; overflow: hidden; transition: 0.3s ease; }
        .bento-card:hover { border-color: var(--accent); transform: translateY(-4px); }
        
        .bento-frontend { grid-column: span 3; }
        .bento-backend { grid-column: span 3; }
        .bento-database { grid-column: span 2; }
        .bento-devops { grid-column: span 4; }

        .bento-card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .bento-card-icon { color: var(--accent); }
        .bento-card-cat { font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--t1); }
        .bento-card-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .stack-pill { font-size: 12px; color: var(--t2); background: var(--bg3); padding: 6px 14px; border-radius: 10px; border: 1px solid var(--b1); }
        
        .bento-glow-effect { position: absolute; inset: 0; background: radial-gradient(circle at top right, var(--accent-dim), transparent 70%); opacity: 0; transition: 0.4s; pointer-events: none; }
        .bento-card:hover .bento-glow-effect { opacity: 0.1; }

        /* Process Section */
        .process-sec { padding: 100px 0 140px; }
        .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; }
        .process-step-num { font-family: var(--font-display); font-size: 48px; font-weight: 700; color: var(--b2); line-height: 1; margin-bottom: 16px; letter-spacing: -2px; }
        .process-step-title { font-size: 18px; font-weight: 600; color: var(--t1); margin-bottom: 10px; }
        .process-step-desc { font-size: 14px; color: var(--t2); line-height: 1.7; }

        /* ─── MOBILE FIXES ─── */
        @media (max-width: 900px) {
          .intro-grid { grid-template-columns: 1fr; text-align: center; gap: 50px; }
          .intro-text-side { display: flex; flex-direction: column; align-items: center; }
          .profile-box-outer { max-width: 400px; margin: 0 auto; width: 100%; }
          .about-p { max-width: 500px; }

          .bento-grid { grid-template-columns: 1fr; }
          .bento-frontend, .bento-backend, .bento-database, .bento-devops { grid-column: span 1; }
          .bento-card { padding: 24px; text-align: center; }
          .bento-card-header { flex-direction: column; }
          .bento-card-tags { justify-content: center; }

          .process-grid { grid-template-columns: repeat(2, 1fr); text-align: center; }
        }

        @media (max-width: 600px) {
          .process-grid { grid-template-columns: 1fr; }
          .about-main-title { font-size: 48px; }
        }
      `}</style>
      </div>
    </>

  )
}