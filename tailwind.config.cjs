/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Source Sans Pro", "ui-sans-serif", "system-ui"],
      },
      colors: {
        red: "#dc3535",
        cyan: "#205295",
      },
      animation: {
        "zoom-in": "zoom-in 0.15s ease-out",
      },
      keyframes: {
        appear: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "zoom-in": {
          "0%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1.0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
