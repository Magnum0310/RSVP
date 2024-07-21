/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Coldiac: ["Coldiac", "sans-serif"],
      Showtime: ["Showtime", "san-serif"],
      MoreLight: ["MoreLight", "san-serif"],
    },

    extend: {
      colors: {
        roseGold: "#D5AAB0",
        ivory: "#EDE8E2",
        champagne: "#EAD5C4",
        mauve: "#B47377",
        barley: "#AB6D3A",
      },
    },
  },
  plugins: [],
};
