import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ChevronDown } from 'lucide-react'

import sac from '../assets/sac.webp'
import boondocks from '../assets/boondocks.webp'
import boondocksInventory from '../assets/inventory.webp'
import disposal from '../assets/disposal.webp'
import trading from '../assets/trading.webp'
import aquatic from '../assets/aquatic-center.webp'
import nexto from '../assets/nexto.webp'
import SEO from '../components/SEO.jsx'

const projects = [



  {
    id: 1, cat: 'Website', title: 'The Boondocks Grill', year: '2025',
    color: '#0D1E2D', accent: '#eab309', img: boondocks,
    stack: ['React', 'UX Design', 'Branding'],
    desc: 'Main customer-facing portal for Boondocks Grill, featuring menus and location details.',
    link: 'https://theboondocksgrill.com/'
  },
  {
    id: 2, cat: 'Web App', title: 'Boondocks Inventory', year: '2025',
    color: '#1A0D2E', accent: '#A78BFA', img: boondocksInventory,
    stack: ['React', 'Node.js', 'Inventory API'],
    desc: 'Internal management system to track stock levels and optimize ordering workflows.',
    link: 'https://boondocks-inventory.netlify.app/'
  },

  {
    id: 3, cat: 'Website', title: 'Trade With Scholars', year: '2023',
    color: '#0D2218', accent: '#34D399', img: trading,
    stack: ['Next.js', 'Real-time Data', 'Finance'],
    desc: 'Educational platform for trading and stock market analysis.',
    link: 'https://tradewithscholars.com/'
  },
  {
    id: 4,
    cat: 'Website',
    title: '24 Seven Disposal',
    year: '2024',
    color: '#0D2218',
    accent: '#f65726',
    img: disposal,
    stack: ['React', 'UI/UX', 'SEO', 'Responsive'],
    desc: 'Full digital presence for a local disposal service. Clean, conversion-focused design with service booking and local SEO optimization.',
    link: 'https://steady-nougat-6318f6.netlify.app/'
  },
  {
    id: 5,
    cat: 'Web App',
    title: 'Nexto Travel',
    year: '2024',
    color: '#0D1A2D',
    accent: '#60A5FA',
    img: nexto,
    stack: ['Next.js', 'Express', 'Aviation .API', 'Node.js'],
    desc: 'A full-stack flight search platform with real-time airport lookup and live flight data via aviation API.',
    link: 'https://nextotravel.netlify.app/'
  },
  {
    id: 6, cat: 'Website', title: 'Aquatic Center', year: '2024',
    color: '#0D1A2D', accent: '#60A5FA', img: aquatic,
    stack: ['React', 'Scheduling', 'CSS Grid'],
    desc: 'A clean, responsive website for a local aquatic center featuring pool schedules, facility information, and program listings.',
    link: 'https://aquatic-center.netlify.app/'
  },

]

const cats = ['All', 'Website', 'Web App']

export default function Projects() {
  const [active, setActive] = useState('All')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const filtered = active === 'All' ? projects : projects.filter(p => p.cat === active)

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <>
      <SEO
        title="Our Projects"
        description="Check out our latest web development and IT projects in High Prairie, Alberta."
        path="/projects"
      />
      <div className="page-wrap" style={{ background: 'var(--bg)', minHeight: '100vh' }}>

        <header className="proj-header">
          <div className="container">
            <div className="header-flex-box">
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                <div className="sec-tag">Portfolio</div>
                <h1 className="proj-main-title">Selected <span className="grad-text">Work</span></h1>
              </motion.div>

              {/* DESKTOP */}
              <div className="desktop-filters">
                {cats.map(c => (
                  <button key={c} onClick={() => setActive(c)} className={`filter-tab ${active === c ? 'active' : ''}`}>
                    {c}
                  </button>
                ))}
              </div>

              {/* MOBILE — full width block below title */}
              <div className="mobile-filter-row" ref={dropdownRef}>
                <button className={`dropdown-trigger ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                  <div className="trigger-left">
                    {/* <span className="trigger-label">Filter by</span> */}
                    <span className="trigger-value">{active}</span>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.22 }} className="chevron-icon">
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="dropdown-menu"
                      initial={{ opacity: 0, y: -4, scaleY: 0.94 }}
                      animate={{ opacity: 1, y: 0, scaleY: 1 }}
                      exit={{ opacity: 0, y: -4, scaleY: 0.94 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'top' }}
                    >
                      {cats.map((c, i) => (
                        <motion.button
                          key={c}
                          className={`dropdown-item ${active === c ? 'selected' : ''}`}
                          onClick={() => { setActive(c); setIsOpen(false) }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <span className={`item-dot ${active === c ? 'active' : ''}`} />
                          <span className="item-text">{c}</span>
                          {active === c && <span className="item-check">✓</span>}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </header>

        <section className="proj-grid-sec">
          <div className="container">
            <div className="projects-masonry">
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="work-card"
                  >
                    <div className="work-card-visual" style={{ background: p.color }}>
                      <div className="image-clipper">
                        <img src={p.img} alt={p.title} className="work-card-img" />
                      </div>
                      <div className="work-category-tag">{p.cat}</div>
                    </div>
                    <div className="work-card-details">
                      <div className="work-header">
                        <h3 className="work-title">{p.title}</h3>
                        <span className="work-year">{p.year}</span>
                      </div>
                      <p className="work-desc">{p.desc}</p>
                      <div className="work-footer">
                        <div className="work-stack">
                          {p.stack.map(s => <span key={s} className="stack-pill">{s}</span>)}
                        </div>
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="work-link" style={{ '--accent-c': p.accent }}>
                          <ExternalLink size={18} style={{ color: p.accent }} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <style>{`
          .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
          .proj-header { padding: 140px 0 60px; border-bottom: 1px solid var(--b1); }
          .header-flex-box { display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; }
          .proj-main-title { font-family: var(--font-display); font-size: clamp(40px, 6vw, 72px); font-weight: 700; color: var(--t1); line-height: 1; }

          /* DESKTOP FILTERS */
          .desktop-filters { display: flex; gap: 8px; align-items: center; }
          .filter-tab { padding: 10px 22px; border-radius: 12px; background: var(--bg2); color: var(--t2); border: 1px solid var(--b1); font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: var(--font-body); }
          .filter-tab:hover { background: var(--card); color: var(--t1); }
          .filter-tab.active { background: linear-gradient(135deg, var(--accent), var(--accent-dim)); color: #fff; border-color: transparent; }

          /* MOBILE FILTER ROW */
          .mobile-filter-row {
            display: none;
            width: 100%;
            position: relative;
          }

          /* TRIGGER BUTTON */
          .dropdown-trigger {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 20px;
            background: var(--card);
            border: 1px solid var(--b2);
            border-radius: 14px;
            cursor: pointer;
            font-family: var(--font-body);
            transition: all 0.2s;
          }
          .dropdown-trigger:hover { border-color: var(--b3); }
          .dropdown-trigger.open {
            border-color: var(--accent-border);
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
          .trigger-left { display: flex; align-items: center; gap: 10px; }
          .trigger-label { font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--t3); }
          .trigger-value { font-size: 15px; font-weight: 600; color: var(--accent); }
          .chevron-icon { color: var(--t3); display: flex; align-items: center; }

          /* DROPDOWN MENU — attached to trigger */
          .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            width: 100%;
            background: var(--card);
            border: 1px solid var(--accent-border);
            border-top: none;
            border-bottom-left-radius: 14px;
            border-bottom-right-radius: 14px;
            overflow: hidden;
            box-shadow: 0 16px 40px rgba(0,0,0,0.3);
            z-index: 50;
          }

          /* DROPDOWN ITEMS */
          .dropdown-item {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 16px 20px;
            background: none;
            border: none;
            border-top: 1px solid var(--b1);
            color: var(--t2);
            font-size: 15px;
            font-weight: 500;
            cursor: pointer;
            font-family: var(--font-body);
            text-align: left;
            transition: background 0.15s, color 0.15s;
          }
          .dropdown-item:hover { background: var(--bg2); color: var(--t1); }
          .dropdown-item.selected { color: var(--t1); }

          .item-dot {
            width: 7px; height: 7px;
            border-radius: 50%;
            background: var(--b2);
            flex-shrink: 0;
            transition: background 0.2s;
          }
          .item-dot.active { background: var(--accent); box-shadow: 0 0 8px var(--accent-glow); }
          .item-text { flex: 1; }
          .item-check { font-size: 13px; font-weight: 700; color: var(--accent); margin-left: auto; }

          /* GRID */
          .proj-grid-sec { padding: 80px 0 120px; }
          .projects-masonry { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 30px; align-items: start; }

          /* CARDS */
          .work-card { background: var(--card); border-radius: 24px; border: 1px solid var(--b1); overflow: hidden; transition: 0.3s ease; }
          .work-card:hover { border-color: var(--b3); transform: translateY(-5px); }
          .work-card-visual { height: 220px; position: relative; overflow: hidden; }
          .image-clipper { width: 100%; height: 100%; overflow: hidden; position: relative; }
          .work-card-img { width: 100%; height: 115%; object-fit: cover; transform: translateY(-9%) scale(1.0); transform-origin: top; transition: 0.6s cubic-bezier(0.33, 1, 0.68, 1); }
          .work-card:hover .work-card-img { transform: translateY(-5%) scale(1.15); }
          .work-category-tag { position: absolute; top: 16px; right: 16px; background: rgba(0,0,0,0.55); backdrop-filter: blur(10px); color: #fff; padding: 5px 12px; border-radius: 8px; font-size: 10px; font-weight: 600; z-index: 5; text-transform: uppercase; letter-spacing: 0.05em; }
          .work-card-details { padding: 28px; }
          .work-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
          .work-title { font-size: 20px; font-weight: 700; color: var(--t1); font-family: var(--font-display); letter-spacing: -0.02em; }
          .work-year { font-size: 11px; color: var(--t3); font-weight: 500; }
          .work-desc { font-size: 13px; color: var(--t2); line-height: 1.65; margin-bottom: 22px; min-height: 44px; }
          .work-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 18px; border-top: 1px solid var(--b1); gap: 12px; }
          .work-stack { display: flex; gap: 6px; flex-wrap: wrap; flex: 1; }
          .stack-pill { background: var(--bg3); color: var(--t3); font-size: 10px; padding: 4px 10px; border-radius: 6px; border: 1px solid var(--b1); font-weight: 500; white-space: nowrap; }
          .work-link { display: flex; align-items: center; justify-content: center; padding: 8px; border-radius: 10px; background: var(--bg3); border: 1px solid var(--b1); transition: all 0.2s; flex-shrink: 0; }
          .work-link:hover { transform: scale(1.1); border-color: var(--accent-c, var(--accent)); }

          /* RESPONSIVE */
          @media (max-width: 900px) {
            .proj-header { padding-top: 110px; padding-bottom: 40px; }
            .header-flex-box { flex-direction: column; align-items: flex-start; gap: 24px; }
            .desktop-filters { display: none; }
            .mobile-filter-row { display: block; }
          }
          @media (max-width: 600px) {
            .projects-masonry { grid-template-columns: 1fr; gap: 20px; }
            .proj-grid-sec { padding: 48px 0 80px; }
          }
        `}</style>
      </div>
    </>
  )
}