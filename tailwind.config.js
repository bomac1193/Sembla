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
        white: "#FFFFFF"
      },
      spacing: {
        gutter: "8.75rem", // 140px desktop
        "gutter-sm": "5rem" // 80px mobile
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
        rain: {
          "0%": { transform: "translateY(-20%)" },
          "100%": { transform: "translateY(100%)" }
        }
      },
      animation: {
        pulseOpacity: "pulseOpacity 4s ease-in-out infinite",
        drawLine: "drawLine 2s ease forwards",
        rain: "rain 8s linear infinite"
      }
    }
  },
  plugins: []
};
