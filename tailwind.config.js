/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
      width: {
        screen: ['100vw /* fallback for Opera, IE and etc. */', '100dvw'],
      },
    }
  },
  plugins: [],
}

