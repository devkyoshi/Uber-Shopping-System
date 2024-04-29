const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}","node_modules/flowbite-react/lib/esm/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"),
   // require('tailwind-scrollbar')
  ],
});

// Define the custom Tailwind CSS configuration
const customConfig = {
  theme: {
    extend: {
      colors: {
        'custom-green-start': 'var(--logo-green1)',
        'custom-green-end': 'var(--logo-green2)',
      },
      backgroundImage: theme => ({
        'custom-gradient': `linear-gradient(to right, ${theme('colors.custom-green-start')}, ${theme('colors.custom-green-end')})`,
      }),
    },
  },
  variants: {},
  plugins: [],
};

// Merge the custom configuration with withMT
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}","node_modules/flowbite-react/lib/esm/**/*.js"],
  theme: customConfig.theme,
  plugins: [
    require("flowbite/plugin"),
   // require('tailwind-scrollbar')
  ].concat(customConfig.plugins),
});