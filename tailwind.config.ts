
import { Albert_Sans } from "next/font/google";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/commonComponents/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/assets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/charts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily : {
        albertSans : ['var(--font-albert-sans)'],
        barlow : ['var(--font-barlow)']

      },


      colors : {
        "divider" : "#21252940", 
        "lightestGray" : "#CED4DA",
        "lightGray" : "#F8F9FA", 
        "mediumGray" : "#6C757D",
        "darkGray" : "#212529",
        "borderGray" : "#0000001f",
        "primaryPurple" : "#9A55FF",
        "lightGreen" : "#E1F4CB",  
        "green" : "#C9F19C",
        "secondaryGreen" : "#62912C",
        "blue" : "#47178E",
        "lightBlue" : "#DBEEFF",
        "secondaryBlue" : "#41A5FF",
        "lightPurple" : "#EFE6FF",
        "lightRed" : "#FFE3E6",
        "secondaryRed" : "#ED4D5C"

      },

    },

    screens: {
      'xxs' : '320px',
      'xs' : '428px',
      'sm': '428px',
      'md': '840px',
      'lg': '1194px',
      'xl': '1440px',
      '2xl': '1600px',
    },
  },
  plugins: [],
};
export default config;
