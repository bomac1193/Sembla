/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Helvetica Neue"', "Satoshi", "Inter", "system-ui", "sans-serif"]
      },
      colors: {
        accent: {
          DEFAULT: "#5AB6FF",
          deep: "#0A84FF"
        },
        ink: "#0C0C0E",
        chrome: "#101116",
        haze: "#C7D2E0"
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
        noise: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"160\" height=\"160\" viewBox=\"0 0 160 160\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"4\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.16\"/></svg>')"
      },
      keyframes: {
        glitch: {
          "0%": { transform: "skew(0deg)" },
          "20%": { transform: "skew(-2deg)" },
          "40%": { transform: "skew(2deg)" },
          "60%": { transform: "skew(-1deg)" },
          "80%": { transform: "skew(1deg)" },
          "100%": { transform: "skew(0deg)" }
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        }
      },
      animation: {
        glitch: "glitch 1s ease-in-out infinite alternate",
        fadeInUp: "fadeInUp 0.6s ease-out forwards"
      }
    }
  },
  plugins: []
};
