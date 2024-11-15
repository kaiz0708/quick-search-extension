/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {
         fontFamily: {
            sans: ["Open Sans", "Roboto", "Arial", "Helvetica Neue", "sans-serif"],
            serif: ["Merriweather", "Georgia", "serif"],
         },
      },
   },
   plugins: [
      require("tailwind-scrollbar"),
      function ({ addUtilities }) {
         addUtilities({
            ".scrollbar-thin": {
               "scrollbar-width": "thin",
            },
            ".scrollbar-thumb-rounded": {
               "&::-webkit-scrollbar": {
                  width: "8px",
                  height: "8px",
               },
               "&::-webkit-scrollbar-thumb": {
                  "background-color": "rgba(156, 163, 175, 0.3)",
                  "border-radius": "8px",
               },
               "&::-webkit-scrollbar-track": {
                  background: "rgba(229, 231, 235, 0.3)",
               },
            },
         });
      },
   ],
};
