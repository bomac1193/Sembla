/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Helvetica Now Display"', '"Helvetica Now Text"', '"Helvetica Neue"', "sans-serif"],
        legal: ['"Helvetica Now Text"', '"Helvetica Neue"', "sans-serif"],
        mono: ['"GT America Mono"', "SFMono-Regular", "Menlo", "monospace"]
      },
      colors: {
        black: "#000000",
        platinum: "#D8D8D8",
        blood: "#9B0000",
        white: "#FFFFFF",
        ash: "#1A1A1A",
        smoke: "#0D0D0D"
      },
      spacing: {
        gutter: "8.75rem",
        "gutter-sm": "5rem"
      },
      keyframes: {
        pulseOpacity: {
          "0%": { opacity: 0.9 },
          "50%": { opacity: 1.1 },
          "100%": { opacity: 0.9 }
        },
        drawLine: {
          "0%": { width: "0%" },
          "100%": { width: "100%" }
        },
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(60px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        revealRight: {
          "0%": { width: "0%" },
          "100%": { width: "100%" }
        }
      },
      animation: {
        pulseOpacity: "pulseOpacity 4s ease-in-out infinite",
        drawLine: "drawLine 2s ease forwards",
        fadeIn: "fadeIn 1s ease forwards",
        slideUp: "slideUp 1.2s ease forwards",
        revealRight: "revealRight 1.5s ease forwards"
      }
    }
  },
  plugins: []
};
