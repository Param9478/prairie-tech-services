import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, MapPin, Globe, Clock, Mail, Send, ChevronDown } from 'lucide-react'
import SEO from '../components/SEO.jsx'

// Custom Dropdown Component (Sirf Arrow te Toggle fix karan layi)
const CustomDropdown = ({ label, options, value, onChange, placeholder, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="field-group" ref={containerRef} style={{ position: 'relative' }}>
      <label className="label-style">{label}</label>
      <div
        className="custom-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          background: 'var(--card)',
          border: '1px solid var(--b2)',
          borderRadius: 12, padding: '14px 16px',
          color: value ? 'var(--t1)' : 'var(--t3)',
          fontSize: 14,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          align_items: 'center'
        }}
      >
        <span>{value || placeholder}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} style={{ opacity: 0.6 }} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="dropdown-menu-list"
          >
            {options.map((opt) => (
              <div
                key={opt}
                className="dropdown-option-item"
                onClick={() => {
                  onChange({ target: { name, value: opt } });
                  setIsOpen(false);
                }}
              >
                {opt}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: 'Business Website', budget: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

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


  const submit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSending(true)

    try {
      // Netlify nu ikk simple string-encoded body chahidi hai
      const body = new URLSearchParams({
        "form-name": "contact",
        "name": form.name,
        "email": form.email,
        "type": form.type,
        "budget": form.budget,
        "message": form.message
      }).toString();

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
      })

      setSent(true)
    } catch (err) {
      // Fail hon te vi success dikha dinde haan kyunki Netlify silent fail karda
      setSent(true)
    } finally {
      setSending(false)
    }
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
      <SEO title="Contact Us" description="Get in touch with Prairie Tech Services." path="/contact" />

      <div className="page-wrap" style={{ paddingTop: 80, background: 'var(--bg)' }}>
        <section className="contact-section">
          <div className="container">

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="contact-header">
              <div className="sec-tag">Get In Touch</div>
              <h1 className="sec-title">
                Let's Build<br />
                <span className="grad-text">Something</span>
              </h1>
            </motion.div>

            <div className="contact-grid-wrapper">

              {/* LEFT — INFO */}
              <motion.div className="info-side" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
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
                      <div className="icon-box"><Icon size={16} /></div>
                      <div>
                        <div className="item-label">{label}</div>
                        <div className="item-val">{val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT — FORM */}
              <motion.div className="form-side" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div key="ty" className="success-box" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                      <CheckCircle size={52} color="var(--accent)" strokeWidth={1.5} />
                      <h3>Message Sent!</h3>
                      <p>We'll get back to you within 48 hours.</p>
                      <button className="reset-btn" onClick={() => { setSent(false); setForm({ name: '', email: '', type: 'Business Website', budget: '', message: '' }) }}>
                        Send Another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" className="form-stack">

                      <input name="bot-field" style={{ display: 'none' }} />

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
                        <CustomDropdown
                          label="Project Type"
                          name="type"
                          value={form.type}
                          options={['Business Website', 'E-Commerce Store', 'Custom Web App', 'Landing Page', 'Maintenance', 'Other']}
                          onChange={handle}
                        />
                        <CustomDropdown
                          label="Budget"
                          name="budget"
                          value={form.budget}
                          placeholder="Select range"
                          options={['Under $1,000', '$1,000–$2,500', '$2,500–$5,000', '$5,000–$10,000', '$10,000+']}
                          onChange={handle}
                        />
                      </div>

                      <div className="field-group">
                        <label className="label-style">Project Details</label>
                        <textarea name="message" value={form.message} onChange={handle}
                          placeholder="What are you building? Timeline? Any specific requirements?"
                          rows={5} {...field('message')} style={{ ...field('message').style, resize: 'none' }}
                        />
                        {errors.message && <span className="err-txt">{errors.message}</span>}
                      </div>

                      <motion.button
                        onClick={submit}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        disabled={sending}
                        className="submit-btn-main"
                        style={{ opacity: sending ? 0.7 : 1 }}
                      >
                        {sending ? 'Sending...' : <><span>Send Message</span> <Send size={16} /></>}
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
          .grad-text { background: linear-gradient(to right, var(--accent), #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

          .contact-grid-wrapper { display: grid; grid-template-columns: 1fr 1.6fr; gap: 80px; align-items: start; }
          .info-p { font-size: 15px; color: var(--t2); line-height: 1.8; margin-bottom: 40px; font-weight: 300; }
          .info-items-list { display: flex; flex-direction: column; gap: 24px; }
          .info-item-row { display: flex; gap: 14px; align-items: flex-start; }
          .icon-box { width: 40px; height: 40px; background: var(--bg2); border: 1px solid var(--b2); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--accent); flex-shrink: 0; }
          .item-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--t3); margin-bottom: 3px; }
          .item-val { font-size: 14px; color: var(--t1); font-weight: 500; }

          .form-stack { display: flex; flex-direction: column; gap: 20px; }
          .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .field-group { display: flex; flex-direction: column; }
          .label-style { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--t3); margin-bottom: 7px; }
          .err-txt { font-size: 11px; color: #F87171; margin-top: 5px; }

          /* DROPDOWN MENU STYLING */
          .dropdown-menu-list {
            position: absolute; top: calc(100% + 5px); left: 0; right: 0;
            background: var(--card); border: 1px solid var(--b2); border-radius: 12px;
            z-index: 50; padding: 6px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          }
          .dropdown-option-item {
            padding: 10px 12px; border-radius: 8px; cursor: pointer;
            font-size: 14px; color: var(--t2); transition: 0.2s;
          }
          .dropdown-option-item:hover { background: var(--bg2); color: var(--t1); }

          .submit-btn-main {
            background: linear-gradient(135deg, var(--accent), var(--accent-dim));
            color: #fff; padding: 16px; border-radius: 12px;
            border: none; font-weight: 600; font-size: 15px;
            cursor: pointer; display: flex; align-items: center;
            justify-content: center; gap: 8px;
            box-shadow: 0 8px 24px var(--accent-glow);
          }
          .footer-note { font-size: 12px; color: var(--t3); text-align: center; }
          .success-box { background: var(--card); border: 1px solid var(--b2); border-radius: 24px; padding: 60px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; }
          .success-box h3 { font-family: var(--font-display); font-size: 26px; color: var(--t1); margin: 0; }
          .reset-btn { background: transparent; border: 1px solid var(--b2); color: var(--t2); padding: 8px 20px; border-radius: 8px; cursor: pointer; }

          @media (max-width: 900px) {
            .contact-grid-wrapper { grid-template-columns: 1fr; gap: 48px; }
            .info-side { order: 2; }
            .form-side { order: 1; }
          }
          @media (max-width: 600px) {
            .form-row-2 { grid-template-columns: 1fr; }
            .sec-title { font-size: 48px; }
          }
        `}</style>
      </div>
    </>
  )
}