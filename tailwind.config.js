/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'homepage-bg': "url('/src/assets/backgroundimg.jpeg')",
      },
      animation: {
        bounce: 'bounce 2s infinite',
      },
      transitionProperty: {
        'transform': 'transform',
      },
    },
  },
  plugins: [],
};
