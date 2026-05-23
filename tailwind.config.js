/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Sora"', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      colors: {
        bg: '#faf7f2',
        surface: '#ffffff',
        border: '#ede8df',
        primary: '#c2693a',
        'primary-light': '#fdf0e8',
        dark: '#1c1410',
        muted: '#9a8b7c',
        confirmada: '#2d8a55',
        espera: '#b07d1a',
        finalizada: '#6b7280',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.06)',
        modal: '0 24px 64px rgba(0,0,0,0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(10px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
