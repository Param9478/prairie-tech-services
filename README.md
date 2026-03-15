# Prairie Tech Services — v3

Vite + React · Framer Motion · React Router · Spline 3D · Lucide Icons

## Setup

```bash
npm install
npm run dev
# → http://localhost:5173
```

## Deploy

```bash
npm run build
npx vercel --prod
```

## Customize

- Colors → `src/index.css` → `:root` (dark) and `[data-theme="light"]`
- Spline scene → `src/pages/Home.jsx` → replace the scene URL
- Projects → `src/pages/Projects.jsx` → `projects` array
- Services → `src/pages/Services.jsx` → `services` array
- Contact info → `src/pages/Contact.jsx` + `src/components/Footer.jsx`
