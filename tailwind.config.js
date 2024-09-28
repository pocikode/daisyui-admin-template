import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{html,twig,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}

