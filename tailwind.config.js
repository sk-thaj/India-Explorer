/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#000000",
        border: "#e5e7eb", // Light gray border
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
}
