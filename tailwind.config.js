module.exports = {
  content: ['./src/components/**/*.{js,ts,tsx}', './pages/**/*.{js,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Helvetica Neue', 'Arial', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Meiryo', 'sans-serif'],
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    letterSpacing: {
      xs: '-.1em',
      sm: '-.05em',
      normal: '0',
      lg: '.05em',
      xl: '.1em',
      '2xl': '.15em',
      '3xl': '.2em',
    },
    extend: {
      colors: {
        black: '#333',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  corePlugins: {},
}
