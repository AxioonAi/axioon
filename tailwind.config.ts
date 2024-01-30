import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeInWelcomeMessage: "fadeInWelcomeMessage 0.3s ease-in",
        bgSweep: "bgSweep 2s infinite ease",
        bgScrollUp: "bgScrollUp 2s infinite ease",
        bgPulse: "bgPulse 2s infinite ease",
        bgRotate: "bgRotate 2s infinite ease",
      },
      keyframes: {
        bgSweep: {
          "0%": { backgroundPosition: "100% 0%" },
          "50%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 100%" },
        },
        bgScrollUp: {
          "0%": {
            backgroundPosition: "100% 100%",
            backgroundSize: "200% 200%",
          },
          "50%": {
            backgroundPosition: "200% 200%",
            backgroundSize: "150% 150%",
          },
          "100%": {
            backgroundPosition: "100% 100%",
            backgroundSize: "200% 200%",
          },
        },
        bgPulse: {
          "0%": { backgroundSize: "100% 100%", backgroundPosition: "0% 0%" },
          "50%": { backgroundSize: "150% 150%", backgroundPosition: "50% 50%" },
          "100%": { backgroundSize: "100% 100%", backgroundPosition: "0% 0%" },
        },
        bgRotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        custom: "calc(100% - 4rem)",
      },
      left: {
        custom: "calc(100% - 4rem)",
      },
      colors: {
        primary: {
          20: "#CCF0FF",
          40: "#99E0FF",
          60: "#33C1FF",
          80: "#008ECC",
          100: "#004766",
        },
        secondary: {
          20: "#8690A2",
          40: "#646E82",
          60: "#4B5362",
          80: "#383D48",
          100: "#21242B",
        },
        gray: {
          10: "#F4F7FB",
          20: "#EAEEF5",
          30: "#D7DEEA",
          40: "#B7BECD",
          50: "#9DA5B4",
          60: "#8690A2",
          70: "#646E82",
          80: "#4B5362",
          90: "#383D48",
          100: "#21242C",
        },
        red: {
          10: "#FFF5F5",
          20: "#FECDCD",
          30: "#FD9B9B",
          40: "#FF6666",
          50: "#FF3D3D",
          60: "#ED1D1D",
          70: "#C61010",
          80: "#A50D0D",
          90: "#760909",
          100: "#5F0707",
        },
        green: {
          10: "#F2FCF2",
          20: "#BDF5C1",
          30: "#8FEF99",
          40: "#65E673",
          50: "#2BCD3E",
          60: "#25AF36",
          70: "#1F932D",
          80: "#197624",
          90: "#145D1D",
          100: "#104C18",
        },
        yellow: {
          10: "#FFF8E6",
          20: "#FEEFC3",
          30: "#FCD974",
          40: "#FAC734",
          50: "#ECB52B",
          60: "#D6A12E",
          70: "#B7831F",
          80: "#8E6115",
          90: "#70490F",
          100: "#51350B",
        },
        darkBlueAxion: "#0D123C",
        hoverDarkBlueAxion: "#323452",
        lightBlueAxion: "#13AAE3",
        purpleAxion: "#540280",

        purple_light: "#881DB9",
        purple_dark: "#540280",

        brand_blue: "#2f5cfc",
        brand_blue_hover: "#2144bf",
      },
    },
    screens: {
      xs: "390px",
      sm: "550px",
      md: "768px",
      lg: "1024px",
      xl: "1360px",
      "2xl": "1920px",
      "3xl": "2560px",
    },
  },
  plugins: [],
};
export default config;
