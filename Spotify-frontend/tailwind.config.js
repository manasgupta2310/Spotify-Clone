/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        "poppins":['Poppins', 'sans-serif'],
      },
      height:{
        "12":"12%",
        "88":"88%",
      },
      backgroundColor:{
        "app-black":"#121212",
        "search-bar-color":"#242424",
      },
    },
  },
  plugins: [],
}

