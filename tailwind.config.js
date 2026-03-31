/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        echo: {
          bg: "#111628",
          accent: "#4CA5A6",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
