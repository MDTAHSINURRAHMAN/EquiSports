/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        merriweather: ["Merriweather", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
      colors: {
        navColor: "#1B3466",
        btnColor: "#FAB50F",
      },
    },
  },
  plugins: [require("daisyui")],
};
