/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js", // JavaScript ファイル
    "./src/**/*.jsx", // JSX ファイル
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
