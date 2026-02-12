/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Uttarakhand Government Theme Colors
        'gov-primary': '#1e40af',
        'gov-secondary': '#0369a1',
        'gov-accent': '#059669',
        'gov-warning': '#ea580c',
        'gov-danger': '#dc2626',
        'gov-success': '#16a34a',
        'gov-dark': '#1e293b',
        'gov-light': '#f1f5f9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
