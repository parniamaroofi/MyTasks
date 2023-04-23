/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./public/**/*.html", "./src/**/*.{vue,js}"],
  purge: ["./public/**/*.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#fed9c7",
        secondary: "#9e664f",
      },
    },
  },
  plugins: [],
};
