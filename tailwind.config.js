
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',

  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
  },
}
