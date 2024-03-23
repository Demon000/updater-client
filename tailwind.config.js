/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#121212',
        'brand-light': '#5c5c5c',
        'brand-dark': '#050505',
        'brand-primary': '#343434'
      }
    }
  },
  plugins: [
    require('@tailwind-plugin/expose-colors')({
      extract: ['brand-primary']
    })
  ]
}
