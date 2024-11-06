/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF",
        "primary-dark": "#6159e6",
        black: "#1E1E1E",
        gray: {
          DEFAULT: "#555555",
          light: "#DDDDDD",
        },
        light: "#F4F4F4",
        red: "#B81B2C",
      },
      width: {
        sidebar: "324px",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],

  daisyui: {
    themes: [], // Set default theme to 'light'
  },
};
