/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        player: {
          DEFAULT: "#31c4be",  // X - Niebieski (Tailwind blue-500)
        },
        agent: {
          DEFAULT: "#ecaf36",  // O - Różowy (Tailwind pink-500)
        },
        cell: {
          DEFAULT: "#1f3540",  // Jasne tło (Tailwind gray-50)
        },
        board: {
          DEFAULT: "#192a32",  // Plansza (Tailwind gray-200)
        },
        text: {
          DEFAULT: "#a8bec9",  // Zielona linia zwycięstwa (Tailwind emerald-500)
        },
        text_shadow: {
          DEFAULT: "#698794"
        },
        cell_shadow: {
          DEFAULT: "#102129"
        }
      },
    },
  },
  plugins: [],
};
