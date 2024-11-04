/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "375px",
        "semi-sm": "425px",
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      lora: ["Lora", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    },
  },
  plugins: [require("daisyui")],
};
