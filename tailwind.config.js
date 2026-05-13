/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#F8F5EF",
          dark: "#E8E2D5",
        },
        gold: {
          light: "#D8AD55",
          DEFAULT: "#B8860B",
          dark: "#6B4905",
          darker: "#362400",
        },
        sage: {
          light: "#A4B599",
          DEFAULT: "#4F6B43",
          dark: "#1A3011",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "serif"],
        script: ["'Pinyon Script'", "cursive"],
        body: ["'Outfit'", "sans-serif"],
      },
      animation: {
        'fade-in': 'fadeIn 2s ease-out forwards',
        'slow-zoom': 'slowZoom 20s linear infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
