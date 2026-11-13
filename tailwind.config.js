/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef1fb',
          100: '#dbe2f6',
          200: '#b7c5ed',
          300: '#8fa3e0',
          400: '#5f7ad4',
          500: '#2748c8',
          600: '#1e39a8',
          700: '#1a3090',
          800: '#162775',
          900: '#121f5a',
        },
        accent: {
          teal: '#0f766e',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        st: ['cubic-bezier(0.22, 1, 0.36, 1)'],
      },
    },
  },
  plugins: [],
}
