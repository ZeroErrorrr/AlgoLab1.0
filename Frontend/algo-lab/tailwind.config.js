/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0E17",
        surface: "#10161F",
        surface2: "#161D2B",
        edge: "#232C3D",
        ink: "#E4E8F1",
        dim: "#7C8699",
        cyan: "#5EEAD4",
        amber: "#F5B85C",
        violet: "#8B7FF0",
        signal: "#F2748C"
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"]
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(94,234,212,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,0.06) 1px, transparent 1px)"
      },
      backgroundSize: {
        grid: "36px 36px"
      }
    },
  },
  plugins: [],
}
