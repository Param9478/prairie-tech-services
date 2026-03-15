import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, X, Menu } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { toggle, isDark } = useTheme()
  const { pathname } = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`nav-master ${scrolled ? 'is-scrolled' : ''}`}
      >
        <div className="nav-container">

          {/* LOGO */}
          <NavLink to="/" className="nav-logo">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              className="logo-icon"
            >
              <span>PT</span>
            </motion.div>
            <span className="logo-text">
              Prairie<span className="accent-span">Tech</span>
              <span style={{ color: 'var(--accent)' }}>.</span>
            </span>
          </NavLink>

          {/* DESKTOP LINKS */}
          <div className="nav-links-desktop hide-mobile">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* RIGHT TOOLS */}
          <div className="nav-right">

            {/* ─── NEW PREMIUM PILL TOGGLE ─── */}
            <div
              className={`theme-pill-track ${isDark ? 'is-dark' : 'is-light'}`}
              onClick={toggle}
            >
              <div className="pill-icons-bg">
                <Sun size={12} strokeWidth={2.5} />
                <Moon size={12} strokeWidth={2.5} />
              </div>
              <motion.div
                className="pill-knob"
                layout
                transition={{ type: "spring", stiffness: 700, damping: 35 }}
              >
                {isDark ? (
                  <Moon size={14} fill="currentColor" strokeWidth={2} />
                ) : (
                  <Sun size={14} fill="currentColor" strokeWidth={2} />
                )}
              </motion.div>
            </div>

            <NavLink to="/contact" className="hide-mobile">
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="nav-cta-btn"
              >
                Get a Quote
              </motion.div>
            </NavLink>

            {/* Mobile Trigger */}
            <button
              className="mobile-trigger hide-desktop"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="mobile-overlay"
          >
            <div className="mobile-nav-content">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <NavLink
                    to={l.to}
                    className={({ isActive }) => isActive ? 'm-link active' : 'm-link'}
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <NavLink to="/contact" className="m-cta">Get a Quote</NavLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-master {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          padding: 24px 0;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-master.is-scrolled {
          padding: 12px 0;
          background: ${isDark ? 'rgba(3, 7, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--b1);
        }

        .nav-container {
          max-width: 1200px; margin: 0 auto; padding: 0 40px;
          display: flex; align-items: center; justify-content: space-between;
        }

        .nav-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .logo-icon {
          width: 32px; height: 32px;
          background: linear-gradient(135deg, var(--accent), var(--accent-dim));
          border-radius: 10px; display: flex; align-items: center; justify-content: center;
          color: #fff; font-weight: 800; font-size: 12px;
        }
        .logo-text { font-family: var(--font-display); font-weight: 700; font-size: 18px; color: var(--t1); letter-spacing: -0.5px; }
        .accent-span { color: var(--accent); }

        .nav-links-desktop { display: flex; gap: 6px; background: var(--bg2); padding: 5px; border-radius: 16px; border: 1px solid var(--b1); }
        .nav-item {
          padding: 8px 18px; border-radius: 12px; font-size: 14px; font-weight: 500;
          color: var(--t2); text-decoration: none; transition: 0.3s;
        }
        .nav-item:hover { color: var(--t1); }
        .nav-item.active { background: var(--card); color: var(--accent); box-shadow: 0 2px 10px rgba(0,0,0,0.05); }

        .nav-right { display: flex; align-items: center; gap: 16px; }

        /* ─── THEME PILL TOGGLE CSS ─── */
        .theme-pill-track {
          width: 58px; height: 30px; border-radius: 100px;
          background: var(--card); border: 1px solid var(--b2);
          position: relative; cursor: pointer; display: flex;
          align-items: center; padding: 3px; transition: 0.3s;
        }
        .theme-pill-track:hover { border-color: var(--accent); }
        
        .pill-icons-bg {
          position: absolute; inset: 0; display: flex; 
          justify-content: space-between; align-items: center;
          padding: 0 8px; color: var(--t3); opacity: 0.5; pointer-events: none;
        }
        
        .pill-knob {
          width: 22px; height: 22px; border-radius: 50%;
          background: var(--t1); color: var(--bg);
          display: flex; align-items: center; justify-content: center;
          z-index: 2; box-shadow: var(--shadow-sm);
        }

        .is-light { justify-content: flex-start; }
        .is-dark { justify-content: flex-end; }
        .is-dark .pill-knob { background: var(--accent); color: white; }

        /* ─── BAKI STYLES ─── */
        .nav-cta-btn {
          background: var(--t1); color: var(--bg); padding: 10px 22px; border-radius: 12px;
          font-size: 14px; font-weight: 600; cursor: pointer;
        }

        .mobile-overlay {
          position: fixed; inset: 0; z-index: 999; background: var(--bg);
          display: flex; align-items: center; justify-content: center;
        }
        .mobile-nav-content { text-align: center; }
        .m-link {
          display: block; font-family: var(--font-display); font-size: 48px;
          font-weight: 800; color: var(--t1); text-decoration: none; padding: 10px 0;
          letter-spacing: -2px;
        }
        .m-link.active { color: var(--accent); }
        .m-cta {
          margin-top: 30px; display: inline-block; background: var(--accent);
          color: #fff; padding: 16px 40px; border-radius: 100px; font-weight: 600; text-decoration: none;
        }
        .mobile-trigger { background: transparent; border: none; color: var(--t1); cursor: pointer; z-index: 1001; }

        @media (max-width: 768px) {
          .nav-container { padding: 0 20px; }
          .hide-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .hide-desktop { display: none !important; }
        }
      `}</style>
    </>
  )
}