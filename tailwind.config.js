/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yirsa: {
          'light-yellow': 'var(--yirsa-light-yellow)',
          'yellow': 'var(--yirsa-yellow)',
          'deep-yellow': 'var(--yirsa-deep-yellow)',
          'yellow-hover': 'var(--yirsa-yellow-hover)',
          'dark-grey': 'var(--yirsa-dark-grey)',
          'light-grey': 'var(--yirsa-light-grey)',
          'mage': 'var(--yirsa-mage)',
          'druide': 'var(--yirsa-druide)',
          'sorcier': 'var(--yirsa-sorcier)',
        },
      },
      fontFamily: {
      oswald: ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [],
};


