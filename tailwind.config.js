/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        accent: '#06B6D4',
        coral: '#F87171',
      },
    },
  },
  plugins: [],
}
