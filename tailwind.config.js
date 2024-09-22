/** @type {import('tailwindcss').Config} */
export default {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        serif: ["Exo 2", "sans-serif"],
      },
      backgroundImage: {
        "hero-img-moon": "url('/moon.jpg')",
      },
    },
  },
  plugins: [],
};
