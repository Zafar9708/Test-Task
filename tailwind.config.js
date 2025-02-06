// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Add a custom utility class to hide scrollbars
      scrollbar: {
        hide: {
          /* Hide scrollbar for Chrome, Safari, and Opera */
          "&::-webkit-scrollbar": {
            display: "none",
          },
          /* Hide scrollbar for IE, Edge, and Firefox */
          "-ms-overflow-style": "none", // IE and Edge
          "scrollbar-width": "none", // Firefox
        },
      },
    },
  },
  plugins: [],
};