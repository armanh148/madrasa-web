import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        madarsa: {
          bg: "#150B08",
          dark: "#1F120E",
          card: "#2A1913",
          cardLight: "#38231B",
          border: "#4E3227",
          brown: {
            DEFAULT: "#2E1B15",
            900: "#1A0F0D",
            800: "#2E1B15",
            700: "#3E2723",
            600: "#4E3227",
            500: "#6D4C41",
            400: "#8D6E63",
          },
          gold: {
            DEFAULT: "#D4AF37",
            50: "#FFFDF0",
            100: "#FEF9C3",
            200: "#FDE68A",
            300: "#F3E5AB",
            400: "#E5C158",
            500: "#D4AF37",
            600: "#C5A059",
            700: "#B8860B",
            800: "#8C6508",
            900: "#5E4204",
          },
          cream: {
            DEFAULT: "#FAF6F0",
            50: "#FFFFFF",
            100: "#FDFBF7",
            200: "#FAF6F0",
            300: "#F5EBE1",
            400: "#EFE2D3",
            500: "#E5D2BE",
          },
        },
      },
      fontFamily: {
        urdu: ["var(--font-amiri)", "var(--font-noto-nastaliq)", "serif"],
        arabic: ["var(--font-amiri)", "serif"],
        heading: ["var(--font-amiri)", "serif"],
        body: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #FFE58F 0%, #D4AF37 50%, #996515 100%)",
        "gold-gradient-soft": "linear-gradient(135deg, #FFF4D0 0%, #E5C158 50%, #B8860B 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(56, 35, 27, 0.8) 0%, rgba(31, 18, 14, 0.95) 100%)",
        "hero-gradient": "radial-gradient(ellipse at top, #3E2723 0%, #23120C 50%, #150B08 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 25px -5px rgba(212, 175, 55, 0.25)",
        "gold-glow-lg": "0 0 40px -5px rgba(212, 175, 55, 0.4)",
        "card-shadow": "0 10px 30px -10px rgba(0, 0, 0, 0.7)",
      },
      animation: {
        "shimmer": "shimmer 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
