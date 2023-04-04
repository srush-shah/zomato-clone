/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        zomatoPink: {
          50: "#ffe5eb",
          100: "#fabac6",
          200: "#f18f9d",
          300: "#e96271",
          400: "#e23744",
          500: "#c81d35",
          600: "#9d1533",
          700: "#700d2a",
          800: "#46061d",
          900: "#1e000c",
        },
      },
    },
  },
  plugins: [],
};
