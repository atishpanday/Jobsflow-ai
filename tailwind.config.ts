import type { Config } from "tailwindcss";

// const { colors: defaultColors } = require("tailwindcss/defaultTheme");

// const colors = {
//   ...defaultColors,
//   ...{
//     customblue: {
//       500: "#0dcaf0",
//     }
//   }
// }

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "blue-green-gradient": "linear-gradient(180deg, #3aadd9 16.88%, #3ad9b6 171.94%) !important",
      },
      colors: {
        "customblue": "#3aadd9",
        "customblack": "#183B56",
      },
      boxShadow: {
        "even": "0 0 10px 5px rgb(0 0 0 / 0.1)",
      }
    },
  },
  plugins: [],
};
export default config;
