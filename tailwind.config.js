/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
      "./src/**/*.{html,js}",
    ],
    theme: {
      extend: {
        zIndex:{
          "max": "2147483647"
        },
        colors: {
          background: '#1f2937',  // Scuro
          text: '#e5e7eb',        // Chiaro
        },
      },
    },
    plugins: [],
  }