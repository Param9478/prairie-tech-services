import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ChevronDown, Filter } from 'lucide-react'

// Asset imports
import sac from '../assets/sac.webp'
import boondocks from '../assets/boondocks.webp'
import boondocksInventory from '../assets/inventory.webp'
import disposal from '../assets/disposal.webp'
import trading from '../assets/trading.webp'
import aquatic from '../assets/aquatic-center.webp'
import SEO from '../components/SEO.jsx'

const projects = [
  {
    id: 1,
    cat: 'Website',
    title: 'SAC',
    year: '2023',
    color: '#2D1010',
    accent: '#FB923C',
    img: sac,
    stack: ['React', 'Authentication', 'Dashboard'],
    desc: 'Official member portal and library for the Songwriters Association of Canada.',
    link: 'https://songwriters.ca/'
  },
  {
    id: 2,
    cat: 'Web App',
    title: 'The Boondocks Grill',
    year: '2025',
    color: '#0D1E2D',
    accent: '#eab309',
    img: boondocks,
    stack: ['React', 'UX Design', 'Branding'],
    desc: 'Main customer-facing portal for Boondocks Grill, featuring menus and location details.',
    link: 'https://theboondocksgrill.com/'
  },
  {
    id: 3,
    cat: 'Website',
    title: '24 Seven Disposal',
    year: '2024',
    color: '#0D2218',
    accent: '#f65726',
    img: disposal,
    stack: ['React', 'UI/UX', 'SEO'],
    desc: 'Full digital presence for a disposal service, focusing on local service booking.',
    link: 'https://24sevendisposal.com/'
  },
  {
    id: 4,
    cat: 'Web App',
    title: 'Trade With Scholars',
    year: '2023',
    color: '#0D2218',
    accent: '#34D399',
    img: trading,
    stack: ['Next.js', 'Real-time Data', 'Finance'],
    desc: 'Educational platform for trading and stock market analysis.',
    link: 'https://tradewithscholars.com/'
  },
  {
    id: 5,
    cat: 'Website',
    title: 'Aquatic Center',
    year: '2024',
    color: '#0D1A2D',
    accent: '#60A5FA',
    img: aquatic,
    stack: ['React', 'Scheduling', 'CSS Grid'],
    desc: 'Community-focused portal for pool schedules in High Prairie.',
    link: 'https://aquatic-center.netlify.app/'
  },
  {
    id: 6,
    cat: 'Web App',
    title: 'Boondocks Inventory',
    year: '2025',
    color: '#1A0D2E',
    accent: '#A78BFA',
    img: boondocksInventory,
    stack: ['React', 'Node.js', 'Inventory API'],
    desc: 'Internal management system to track stock levels and optimize ordering workflows.',
    link: 'https://boondocks-inventory.netlify.app/'
  }
]

const cats = ['All', 'Website', 'Web App']

export default function Projects() {
  const [active, setActive] = useState('All')
  const [isOpen, setIsOpen] = useState(false)

  const filtered = active === 'All' ? projects : projects.filter(p => p.cat === active)

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

              <div className="filter-system">
                <div className="desktop-filters">
                  {cats.map(c => (
                    <button
                      key={c}
                      onClick={() => setActive(c)}
                      className={`filter-tab ${active === c ? 'active' : ''}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <div className="mobile-dropdown-wrap">
                  <button className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
                    <span>{active}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="dropdown-menu"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {cats.map(c => (
                          <div
                            key={c}
                            className={`dropdown-item ${active === c ? 'selected' : ''}`}
                            onClick={() => {
                              setActive(c);
                              setIsOpen(false);
                            }}
                          >
                            {c}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="proj-grid-sec">
          <div className="container">
            <motion.div layout className="projects-masonry">
              <AnimatePresence mode='popLayout'>
                {filtered.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="work-card"
                  >
                    {/* VISUAL WRAPPER */}
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
                          {p.stack.map(s => (
                            <span key={s} className="stack-pill">{s}</span>
                          ))}
                        </div>
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="work-link"
                          style={{ '--accent-c': p.accent }}
                        >
                          <ExternalLink size={18} style={{ color: p.accent }} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <style>{`
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .proj-header { padding: 140px 0 60px; border-bottom: 1px solid var(--b1); }
        .header-flex-box { display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; }
        .proj-main-title { font-family: var(--font-display); font-size: clamp(40px, 6vw, 72px); font-weight: 700; color: var(--t1); line-height: 1; }

        .desktop-filters { display: flex; gap: 8px; }
        .filter-tab { padding: 10px 22px; border-radius: 12px; background: var(--bg2); color: var(--t2); border: 1px solid var(--b1); font-size: 13px; font-weight: 500; cursor: pointer; transition: 0.3s; }
        .filter-tab.active { background: var(--card); color: var(--t1); border-color: var(--accent); }

        .mobile-dropdown-wrap { display: none; position: relative; width: 100%; }
        .dropdown-trigger { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; background: var(--card); border: 1px solid var(--b2); border-radius: 14px; color: var(--t1); font-weight: 600; cursor: pointer; }
        .dropdown-menu { position: absolute; top: calc(100% + 8px); left: 0; right: 0; background: var(--card); border: 1px solid var(--b2); border-radius: 14px; z-index: 100; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        .dropdown-item { padding: 14px 20px; color: var(--t2); font-size: 14px; cursor: pointer; border-bottom: 1px solid var(--b1); }
        .dropdown-item.selected { color: var(--accent); background: var(--bg2); }

        .proj-grid-sec { padding: 80px 0; }
        .projects-masonry { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 30px; }
        .work-card { background: var(--card); border-radius: 24px; border: 1px solid var(--b1); overflow: hidden; transition: 0.3s ease; }
        .work-card:hover { border-color: var(--accent); transform: translateY(-5px); }
        
        /* THE FIX: Image Clipper */
        .work-card-visual { height: 220px; position: relative; overflow: hidden; background: #111; }
        
        .image-clipper {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
        }

        .work-card-img { 
          width: 100%; 
          height: 115%; /* Height thodi vadh ditti taaki crop layi space mil sake */
          object-fit: cover; 
          /* TABS HIDE KARAN LAYI: 
             Scale thoda vadhaya te image nu upar nu shift kita taaki tabs frame ton bahar ho javan */
          transform: translateY(-9%) scale(1.1); 
          transform-origin: top;
          transition: 0.6s cubic-bezier(0.33, 1, 0.68, 1);
        }

        .work-card:hover .work-card-img { 
          transform: translateY(-5%) scale(1.15); 
        }

        .work-category-tag { position: absolute; top: 20px; right: 20px; background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); color: #fff; padding: 6px 12px; border-radius: 8px; font-size: 10px; font-weight: 600; z-index: 5; }
        
        .work-card-details { padding: 30px; }
        .work-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .work-title { font-size: 22px; font-weight: 700; color: var(--t1); font-family: var(--font-display); }
        .work-year { font-size: 12px; color: var(--t3); font-weight: 500; }
        .work-desc { font-size: 14px; color: var(--t2); line-height: 1.6; margin-bottom: 24px; min-height: 45px; }
        
        .work-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 1px solid var(--b1); }
        .work-stack { display: flex; gap: 8px; flex-wrap: wrap; }
        .stack-pill { background: var(--bg); color: var(--t3); font-size: 10px; padding: 4px 10px; border-radius: 6px; border: 1px solid var(--b1); }
        
        .work-link { 
          display: flex; align-items: center; justify-content: center; 
          transition: 0.3s; padding: 8px; border-radius: 12px; 
          background: var(--bg); border: 1px solid var(--b1);
        }
        .work-link:hover { transform: scale(1.1); border-color: var(--accent-c); }

        @media (max-width: 900px) {
          .proj-header { padding-top: 100px; padding-bottom: 40px; }
          .header-flex-box { flex-direction: column; align-items: flex-start; gap: 20px; }
          .desktop-filters { display: none; }
          .mobile-dropdown-wrap { display: block; }
          .projects-masonry { grid-template-columns: 1fr; }
        }
      `}</style>
      </div>
    </>
  )
}