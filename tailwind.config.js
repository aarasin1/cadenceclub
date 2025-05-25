// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bone: "#F4F1EC",
        navy: "#0A1A2F",
        gold: "#C9AA71",
        charcoal: "#3A3A3A",
        slateblue: "#43536D",
        beige: "#D8CAB8",
      },
    },
  },
  plugins: [],
};
