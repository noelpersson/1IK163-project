/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Sök efter klasser i alla HTML- och TS-filer
  ],
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 0.5s ease-in-out', // Lägg till animation
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-10%)' },
          '50%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
