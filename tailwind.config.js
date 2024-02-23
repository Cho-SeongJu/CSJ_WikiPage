/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-100": "#F6F6F6",
        "black-200": "#EEEEEE",
        "blue-100" : "#3080FF"
      },
    },
  },
  plugins: [],
};
