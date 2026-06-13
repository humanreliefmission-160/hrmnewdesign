/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Brand colours ──────────────────────────────────────────────────────
      colors: {
        purple: {
          DEFAULT: '#650199',   // --purple        → bg-purple / text-purple
          dark: '#4a0070',   // --purple-dark    → bg-purple-dark
          light: '#8b01cc',   // --purple-light   → bg-purple-light
          faint: 'rgba(101,1,153,0.08)', // --purple-faint → bg-purple-faint
        },
        yellow: {
          DEFAULT: '#FFD21B',   // --yellow         → bg-yellow / text-yellow
          hover: '#e6c200',   // --yellow-hover   → hover:bg-yellow-hover
        },
        brand: {
          white: '#f5f5f5',     // --white / --bg   → bg-brand-white / text-brand-white
          black: '#1a1a1a',     // --black          → bg-brand-black / text-brand-black
          grey: '#6b6b6b',     // --grey           → text-brand-grey
          lgrey: '#e8e8e8',     // --light-grey     → bg-brand-lgrey / border-brand-lgrey
          red: '#B60000',
        },
      },

      // ── Typography ─────────────────────────────────────────────────────────
      fontFamily: {
        // Usage: font-display  (titles / headings)
        display: ['"Getronde"', 'Georgia', 'serif'],
        // Usage: font-body     (body copy — set on <body>)
        body: ['"Rubik"', 'sans-serif'],
      },
      fontSize: {
        // Fluid hero heading  → text-hero
        hero: ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.05' }],
        // Fluid section title → text-section
        section: ['clamp(2rem,  4vw, 3rem)', { lineHeight: '1.1' }],
      },

      // ── Spacing extras ─────────────────────────────────────────────────────
      maxWidth: {
        content: '1200px',   // .section-inner max-width → max-w-content
      },

      // ── Border radius ──────────────────────────────────────────────────────
      borderRadius: {
        pill: '100px',       // rounded-pill (tags, toggles)
      },

      // ── Min-height ─────────────────────────────────────────────────────────
      minHeight: {
        hero: '88vh',        // min-h-hero
      },

      // ── Box shadows ────────────────────────────────────────────────────────
      boxShadow: {
        nav: '0 2px 20px rgba(0,0,0,0.06)',
        card: '0 2px 20px rgba(0,0,0,0.06)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.12)',
        btn: '0 6px 20px rgba(0,0,0,0.15)',
        'btn-purple': '0 6px 20px rgba(101,1,153,0.3)',
        'step-active': '0 0 0 4px rgba(101,1,153,0.2)',
      },

      // ── Background gradients (used as arbitrary values in the HTML) ─────────
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1a0028 0%, #4a0070 50%, #650199 100%)',
        'page-gradient': 'linear-gradient(135deg, #1a0028, #650199)',
      },

      // ── Animations ─────────────────────────────────────────────────────────
      animation: {
        pulse2: 'pulse2 2s infinite',
        ticker: 'ticker 20s linear infinite',
        fadeIn: 'fadeIn 0.3s ease',
        bounceIn: 'bounceIn 0.6s ease',
      },
      keyframes: {
        pulse2: {
          '0%,100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.5)', opacity: '0.7' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0)' },
          '70%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
