/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable class-based dark mode

  theme: {
    extend: {
      fontFamily: {
        abril: ['"Abril Fatface"', "cursive"],
        bangers: ["Bangers", "cursive"],
        crimson: ['"Crimson Text"', "serif"],
        zillaSlab: ["zilla slab", "serif"],

        poppins: ["Poppins", "sans-serif"],
        oxygen: ["Oxygen", "sans-serif"],
        // Continue for other fonts
      },
    },
  },
  plugins: [],
};
