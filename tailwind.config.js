/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      height: {
        'calc-90vh-72px': 'calc(90vh - 72px)',
      },
    },
  },
  plugins: [],
}

