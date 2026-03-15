import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, MapPin, Globe, Clock, Mail, Send } from 'lucide-react'
import SEO from '../components/SEO.jsx'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: 'Business Website', budget: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const handle = e => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    setErrors(p => ({ ...p, [e.target.name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Required'
    return e
  }

  const submit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSent(true)
  }

  const field = (name) => ({
    style: {
      width: '100%',
      background: 'var(--card)',
      border: `1px solid ${errors[name] ? '#F87171' : 'var(--b2)'}`,
      borderRadius: 12, padding: '14px 16px',
      color: 'var(--t1)', fontSize: 14,
      fontFamily: 'var(--font-body)', outline: 'none',
      transition: 'border-color 0.2s ease'
    }
  })

  return (
    <>
      <SEO
        title="Our Projects"
        description="Check out our latest web development and IT projects in High Prairie, Alberta."
        path="/projects"
      />
      <div className="page-wrap" style={{ paddingTop: 80, background: 'var(--bg)' }}>
        <section className="contact-section">
          <div className="container">

            {/* TITLE SECTION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="contact-header"
            >
              <div className="sec-tag">Get In Touch</div>
              <h1 className="sec-title">
                Let's Build<br />
                <span className="grad-text">Something</span>
              </h1>
            </motion.div>

            <div className="contact-grid-wrapper">

              {/* LEFT SIDE: INFO */}
              <motion.div
                className="info-side"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="info-p">
                  Tell us about your project. We'll respond within 48 hours with a plan and a fixed-price quote. First consultation is always free.
                </p>

                <div className="info-items-list">
                  {[
                    { Icon: MapPin, label: 'Location', val: 'High Prairie, Alberta' },
                    { Icon: Globe, label: 'Website', val: 'prairietechs.com' },
                    { Icon: Mail, label: 'Email', val: 'info@prairietechs.com' },
                    { Icon: Clock, label: 'Response', val: 'Within 48 hours' },
                  ].map(({ Icon, label, val }) => (
                    <div key={label} className="info-item-row">
                      <div className="icon-box">
                        <Icon size={16} />
                      </div>
                      <div>
                        <div className="item-label">{label}</div>
                        <div className="item-val">{val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT SIDE: FORM */}
              <motion.div
                className="form-side"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div key="ty" className="success-box" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                      <CheckCircle size={52} color="var(--accent)" strokeWidth={1.5} />
                      <h3>Message Sent!</h3>
                      <p>We'll get back to you within 48 hours.</p>
                      <button className="reset-btn" onClick={() => setSent(false)}>Send Another</button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" className="form-stack">
                      <div className="form-row-2">
                        <div className="field-group">
                          <label className="label-style">Name</label>
                          <input name="name" value={form.name} onChange={handle} placeholder="John Smith" {...field('name')} />
                          {errors.name && <span className="err-txt">{errors.name}</span>}
                        </div>
                        <div className="field-group">
                          <label className="label-style">Email</label>
                          <input name="email" type="email" value={form.email} onChange={handle} placeholder="john@company.com" {...field('email')} />
                          {errors.email && <span className="err-txt">{errors.email}</span>}
                        </div>
                      </div>

                      <div className="form-row-2">
                        <div className="field-group">
                          <label className="label-style">Project Type</label>
                          <select name="type" value={form.type} onChange={handle} {...field('type')}>
                            {['Business Website', 'E-Commerce Store', 'Custom Web App', 'Landing Page', 'Maintenance', 'Other'].map(o => <option key={o}>{o}</option>)}
                          </select>
                        </div>
                        <div className="field-group">
                          <label className="label-style">Budget</label>
                          <select name="budget" value={form.budget} onChange={handle} {...field('budget')}>
                            <option value="">Select range</option>
                            {['Under $1,000', '$1,000–$2,500', '$2,500–$5,000', '$10,000+'].map(o => <option key={o}>{o}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="field-group">
                        <label className="label-style">Project Details</label>
                        <textarea name="message" value={form.message} onChange={handle}
                          placeholder="What are you building? Timeline?"
                          rows={5} {...field('message')} style={{ ...field('message').style, resize: 'none' }}
                        />
                        {errors.message && <span className="err-txt">{errors.message}</span>}
                      </div>

                      <motion.button
                        onClick={submit}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="submit-btn-main"
                      >
                        Send Message <Send size={16} style={{ marginLeft: 8 }} />
                      </motion.button>
                      <p className="footer-note">No obligations. Free first consultation.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

        <style>{`
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .contact-section { padding: 80px 0 120px; }
        .contact-header { margin-bottom: 64px; }
        .sec-title { font-size: clamp(44px, 7vw, 84px); font-weight: 800; line-height: 1; color: var(--t1); letter-spacing: -3px; }
        
        .contact-grid-wrapper { display: grid; grid-template-columns: 1fr 1.6fr; gap: 80px; align-items: start; }
        
        /* Info Styling */
        .info-p { fontSize: 16px; color: var(--t2); line-height: 1.8; margin-bottom: 48px; font-weight: 300; }
        .info-items-list { display: flex; flex-direction: column; gap: 28px; }
        .info-item-row { display: flex; gap: 16px; align-items: flex-start; }
        .icon-box { width: 40px; height: 40px; background: var(--bg2); border: 1px solid var(--b2); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--accent); flex-shrink: 0; }
        .item-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--t3); margin-bottom: 4px; }
        .item-val { font-size: 15px; color: var(--t1); font-weight: 500; }

        /* Form Styling */
        .form-stack { display: flex; flex-direction: column; gap: 24px; }
        .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .field-group { display: flex; flex-direction: column; }
        .label-style { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--t3); margin-bottom: 8px; }
        .err-txt { font-size: 11px; color: #F87171; margin-top: 6px; }
        
        .submit-btn-main {
          background: var(--t1); color: var(--bg); padding: 16px; border-radius: 12px; 
          border: none; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: 0.2s;
        }
        .footer-note { font-size: 12px; color: var(--t3); text-align: center; margin-top: 12px; }

        /* Success Card */
        .success-box { background: var(--card); border: 1px solid var(--b2); border-radius: 24px; padding: 60px; text-align: center; }
        .success-box h3 { font-size: 28px; color: var(--t1); margin: 16px 0 8px; }
        .reset-btn { background: transparent; border: 1px solid var(--b2); color: var(--t3); padding: 8px 16px; border-radius: 8px; margin-top: 20px; cursor: pointer; }

        /* RESPONSIVE LAYOUT */
        @media (max-width: 900px) {
          .contact-grid-wrapper { grid-template-columns: 1fr; gap: 60px; }
          .contact-header { text-align: center; }
          .info-side { order: 2; text-align: center; display: flex; flex-direction: column; align-items: center; }
          .info-item-row { text-align: left; }
          .form-side { order: 1; }
        }

        @media (max-width: 600px) {
          .form-row-2 { grid-template-columns: 1fr; gap: 24px; }
          .contact-section { padding: 40px 0; }
          .sec-title { font-size: 52px; }
        }
      `}</style>
      </div>
    </>
  )
}