import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, X, Menu } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import logo from '../assets/logo.png'
import logoIcon from '../assets/logo-icon.png'

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

  useEffect(() => { setOpen(false) }, [pathname])

  const handleQuoteClick = () => {
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`nav-master ${scrolled ? 'is-scrolled' : ''}`}
      >
        <div className="nav-container">

          <NavLink to="/" className="nav-logo">
            <img src={logo} alt="Prairie Tech Services" className="logo-full" />
            <img src={logoIcon} alt="Prairie Tech Services" className="logo-icon" />
          </NavLink>

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

          <div className="nav-right">
            <div className={`theme-pill-track ${isDark ? 'is-dark' : 'is-light'}`} onClick={toggle}>
              <div className="pill-icons-bg">
                <Sun size={12} strokeWidth={2.5} />
                <Moon size={12} strokeWidth={2.5} />
              </div>
              <motion.div
                className="pill-knob"
                layout
                transition={{ type: 'spring', stiffness: 700, damping: 35 }}
              >
                {isDark
                  ? <Moon size={14} fill="currentColor" strokeWidth={2} />
                  : <Sun size={14} fill="currentColor" strokeWidth={2} />
                }
              </motion.div>
            </div>

            <NavLink to="/contact" className="hide-mobile" onClick={handleQuoteClick}>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} className="nav-cta-btn">
                Get a Quote
              </motion.div>
            </NavLink>

            <button className="mobile-trigger hide-desktop" onClick={() => setOpen(!open)}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                {pathname === '/contact' ? (
                  <button className="m-cta" onClick={handleQuoteClick}>Get a Quote</button>
                ) : (
                  <NavLink to="/contact" className="m-cta" onClick={() => setOpen(false)}>
                    Get a Quote
                  </NavLink>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* KEY FIX: margin: 0, top: 0 explicitly, no gap */
        .nav-master {
          position: fixed;
          top: 0; left: 0; right: 0;
          margin: 0;
          z-index: 1000;
          padding: 14px 0;
          /* iOS safe area — content nahi jayega status bar de piche */
          padding-top: max(14px, env(safe-area-inset-top));
          transition: padding 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-master.is-scrolled {
          padding: 8px 0;
          padding-top: max(8px, env(safe-area-inset-top));
          background: ${isDark ? 'rgba(3,7,18,0.92)' : 'rgba(248,250,252,0.92)'};
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--b1);
        }

        .nav-container {
          max-width: 1200px; margin: 0 auto; padding: 0 40px;
          display: flex; align-items: center; justify-content: space-between; gap: 24px;
        }

        .nav-logo { display: flex; align-items: center; text-decoration: none; flex-shrink: 0; }

        .logo-full {
          height: auto;
          width: 200px;
          max-height: 52px;
          object-fit: contain;
          display: block;
          transition: opacity 0.2s, filter 0.3s;
          filter: ${isDark ? 'none' : 'invert(1) hue-rotate(180deg)'};
        }
        .logo-full:hover { opacity: 0.85; }

        .logo-icon {
          height: 44px;
          width: auto;
          object-fit: contain;
          display: none;
          transition: opacity 0.2s;
        }
        .logo-icon:hover { opacity: 0.85; }

        .nav-links-desktop {
          display: flex; gap: 6px;
          background: var(--bg2); padding: 5px;
          border-radius: 16px; border: 1px solid var(--b1);
        }
        .nav-item {
          padding: 8px 18px; border-radius: 12px;
          font-size: 14px; font-weight: 500;
          color: var(--t2); text-decoration: none; transition: 0.2s;
        }
        .nav-item:hover { color: var(--t1); background: var(--hover); }
        .nav-item.active { background: var(--card); color: var(--accent); }

        .nav-right { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }

        .theme-pill-track {
          width: 58px; height: 30px; border-radius: 100px;
          background: var(--card); border: 1px solid var(--b2);
          position: relative; cursor: pointer;
          display: flex; align-items: center; padding: 3px;
          transition: border-color 0.2s;
        }
        .theme-pill-track:hover { border-color: var(--accent); }
        .pill-icons-bg {
          position: absolute; inset: 0;
          display: flex; justify-content: space-between; align-items: center;
          padding: 0 8px; color: var(--t3); opacity: 0.5; pointer-events: none;
        }
        .pill-knob {
          width: 22px; height: 22px; border-radius: 50%;
          background: var(--t1); color: var(--bg);
          display: flex; align-items: center; justify-content: center; z-index: 2;
        }
        .is-light { justify-content: flex-start; }
        .is-dark  { justify-content: flex-end; }
        .is-dark .pill-knob { background: var(--accent); color: #fff; }

        .nav-cta-btn {
          background: var(--t1); color: var(--bg);
          padding: 10px 22px; border-radius: 12px;
          font-size: 14px; font-weight: 600; cursor: pointer;
          white-space: nowrap; transition: opacity 0.2s;
        }
        .nav-cta-btn:hover { opacity: 0.85; }

        .mobile-overlay {
          position: fixed; inset: 0; z-index: 999;
          background: var(--bg);
          display: flex; align-items: center; justify-content: center;
        }
        .mobile-nav-content { text-align: center; }
        .m-link {
          display: block; font-family: var(--font-display);
          font-size: clamp(36px, 10vw, 56px);
          font-weight: 800; color: var(--t1);
          text-decoration: none; padding: 10px 0;
          letter-spacing: -2px; transition: color 0.2s;
        }
        .m-link:hover { color: var(--accent); }
        .m-link.active { color: var(--accent); }
        .m-cta {
          margin-top: 32px; display: inline-block;
          background: linear-gradient(135deg, var(--accent), var(--accent-dim));
          color: #fff; padding: 16px 40px; border-radius: 100px;
          font-weight: 600; font-size: 15px;
          text-decoration: none; border: none; cursor: pointer;
          font-family: var(--font-body);
        }
        .mobile-trigger {
          background: transparent; border: none;
          color: var(--t1); cursor: pointer; z-index: 1001;
          display: flex; align-items: center;
        }

        /* KEY FIX: html/body no margin/padding */
        html, body {
          margin: 0 !important;
          padding: 0 !important;
        }

        @media (max-width: 768px) {
          .nav-container { padding: 0 20px; }
          .hide-mobile { display: none !important; }
          .logo-full { display: none !important; }
          .logo-icon { display: block !important; }
        }
        @media (min-width: 769px) {
          .hide-desktop { display: none !important; }
        }
      `}</style>
    </>
  )
}