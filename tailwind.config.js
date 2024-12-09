/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "meida",
    content: [
      "./src/**/*.{html,js}",
    ],
    theme: {
      extend: {
        colors: {
          background: '#1f2937',  // Scuro
          text: '#e5e7eb',        // Chiaro
        },
      },
    },
    plugins: [],
  }