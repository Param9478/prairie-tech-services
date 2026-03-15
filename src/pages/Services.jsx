import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Layout, ShoppingBag, Terminal, Zap, Settings, Link as LinkIcon } from 'lucide-react'
import SEO from '../components/SEO.JSX'

const services = [
  {
    icon: <Layout size={22} />, title: 'Business Websites',
    desc: 'Professional 5–7 page sites that make a strong first impression. Mobile-first & SEO-ready.',
    price: '$800', tag: 'Popular',
    features: ['5–7 responsive pages', 'Basic SEO setup', 'Contact form integration'],
  },
  {
    icon: <ShoppingBag size={22} />, title: 'E-Commerce Stores',
    desc: 'Full online stores with payment integration and custom delivery zones.',
    price: '$1,500',
    features: ['Stripe / PayPal', 'Inventory tracking', 'Order dashboard'],
  },
  {
    icon: <Terminal size={22} />, title: 'Custom Web Apps',
    desc: 'Booking systems, client portals, and internal tools built for your workflow.',
    price: '$2,000+',
    features: ['User Auth', 'Custom Database', 'Admin Panel'],
  },
  {
    icon: <Zap size={22} />, title: 'Landing Pages',
    desc: 'High-converting single-page sites for campaigns or product launches.',
    price: '$400',
    features: ['Lead capture form', 'Analytics setup', 'Fast turnaround'],
  },
  {
    icon: <Settings size={22} />, title: 'Maintenance',
    desc: 'Monthly retainer to keep your site updated, secure, and performing best.',
    price: '$100/mo',
    features: ['Security monitoring', 'Regular backups', 'Content updates'],
  },
  {
    icon: <LinkIcon size={22} />, title: 'API & Integrations',
    desc: 'Connect your site to CRMs, booking platforms, and third-party services.',
    price: 'Custom',
    features: ['CRM integration', 'Email automation', 'Webhook config'],
  },
]

export default function Services() {
  return (
    <>
      <SEO
        title="Our Projects"
        description="Check out our latest web development and IT projects in High Prairie, Alberta."
        path="/projects"
      />
      <div className="page-wrap" style={{ background: 'var(--bg)', minHeight: '100vh' }}>

        {/* ─── HEADER SECTION ─── */}
        <section style={{ padding: '120px 48px 80px', textAlign: 'center', position: 'relative' }}>
          <div className="orb" style={{ width: 400, height: 400, background: 'var(--accent-glow)', top: -100, left: '50%', transform: 'translateX(-50%)' }} />

          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="sec-tag" style={{ justifyContent: 'center' }}>Capabilities</div>
              <h1 className="sec-title" style={{ fontSize: 'clamp(44px, 7vw, 84px)', marginBottom: 24 }}>
                Our <span className="grad-text">Services</span>
              </h1>
              <p style={{ fontSize: 18, color: 'var(--t2)', fontWeight: 300, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
                Fixed prices. Clear scope. On-time delivery. We build tools that grow your business.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── SERVICES GRID ─── */}
        <section style={{ padding: '0 48px 100px' }}>
          <div style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 24
          }}>
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5, borderColor: 'var(--accent-border)', background: 'var(--card2)' }}
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--b1)',
                  borderRadius: 24,
                  padding: '40px',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                }}
              >
                {s.tag && (
                  <span style={{
                    position: 'absolute', top: 24, right: 24,
                    background: 'var(--accent-glow)', color: 'var(--accent-bright)',
                    fontSize: 10, fontWeight: 600, padding: '4px 12px', borderRadius: 100,
                    border: '1px solid var(--accent-border)', textTransform: 'uppercase', letterSpacing: '0.05em'
                  }}>{s.tag}</span>
                )}

                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: 'var(--bg3)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)', marginBottom: 28
                }}>
                  {s.icon}
                </div>

                <h2 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 600,
                  fontSize: 24, color: 'var(--t1)', marginBottom: 12,
                  letterSpacing: '-0.02em'
                }}>
                  {s.title}
                </h2>

                <p style={{ fontSize: 14, color: 'var(--t2)', lineHeight: 1.6, marginBottom: 28 }}>
                  {s.desc}
                </p>

                <div style={{ marginBottom: 32 }}>
                  {s.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--t2)', marginBottom: 8 }}>
                      <Check size={14} color="var(--accent)" strokeWidth={3} />
                      {f}
                    </div>
                  ))}
                </div>

                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', borderTop: '1px solid var(--b1)',
                  paddingTop: 24
                }}>
                  <div>
                    <div style={{ fontSize: 10, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Investment</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--t1)', fontFamily: 'var(--font-display)' }}>{s.price}</div>
                  </div>

                  <Link to="/contact">
                    <motion.div
                      whileHover={{ x: 5 }}
                      style={{
                        width: 44, height: 44, borderRadius: '50%',
                        background: 'var(--accent)', color: 'var(--accent-t)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}
                    >
                      <ArrowRight size={18} />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section style={{ padding: '0 48px 120px' }}>
          <div style={{
            maxWidth: 1200, margin: '0 auto',
            background: 'var(--card)', border: '1px solid var(--b2)',
            borderRadius: 32, padding: '80px 40px', textAlign: 'center',
            position: 'relative', overflow: 'hidden'
          }}>
            <div className="orb" style={{ width: 300, height: 300, background: 'var(--accent-glow)', bottom: -150, right: -100 }} />

            <h2 className="sec-title" style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: 20 }}>
              Ready to <span className="grad-text">get started?</span>
            </h2>
            <p style={{ color: 'var(--t2)', marginBottom: 40, fontWeight: 300 }}>
              Contact us today for a free consultation and a detailed quote.
            </p>

            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'var(--accent)', color: 'var(--accent-t)',
                  padding: '16px 40px', borderRadius: 12, fontWeight: 600,
                  fontSize: 15, boxShadow: '0 10px 30px var(--accent-glow)'
                }}
              >
                Book a Free Call
              </motion.button>
            </Link>
          </div>
        </section>

        <style>{`
        @media(max-width:768px){
          section { padding-left: 24px !important; padding-right: 24px !important; }
          .grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      </div>
    </>
  )
}