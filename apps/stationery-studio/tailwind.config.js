/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        amiri: ['Amiri', 'serif'],
        tajawal: ['Tajawal', 'sans-serif'],
        aref: ['"Aref Ruqaa"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        greatvibes: ['"Great Vibes"', 'cursive'],
      },
      colors: {
        gold: {
          50: '#FAF6EE',
          100: '#F5ECD7',
          200: '#EBD8AE',
          300: '#DEC081',
          400: '#D4AF37', // Classic metallic gold
          500: '#C29826',
          600: '#A17A1B',
          700: '#7E5B15',
          800: '#5F4412',
          900: '#43300E',
        },
        burgundy: {
          50: '#FBF2F4',
          100: '#F5E1E6',
          200: '#ECC3CC',
          300: '#DE99A8',
          400: '#CA657B',
          500: '#B03B56',
          600: '#942943',
          700: '#791E34',
          800: '#5F1929',
          900: '#46131F',
          950: '#2C0812',
        },
        parchment: {
          50: '#FCFBF7',
          100: '#F8F5EC',
          200: '#F0EADC',
          300: '#E5DCB8',
          400: '#D5C79E',
          500: '#C1AF7F',
        }
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(67, 48, 14, 0.12), 0 0 15px 1px rgba(212, 175, 55, 0.15)',
        'luxury-lg': '0 25px 50px -12px rgba(44, 8, 18, 0.25), 0 0 25px 3px rgba(212, 175, 55, 0.2)',
        'gold-glow': '0 0 25px -3px rgba(212, 175, 55, 0.45), 0 0 10px 0 rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
}
