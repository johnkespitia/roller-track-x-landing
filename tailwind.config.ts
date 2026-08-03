import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E63946",
        dark: "#1C1C1C",
        neon: {
          purple: "#9D4EDD",
          green: "#06D6A0",
        },
      },
      fontFamily: {
        heading: ["Montserrat", "Bebas Neue", "sans-serif"],
        body: ["Roboto", "Open Sans", "sans-serif"],
      },
      typography: {
        rtx: {
          css: {
            "--tw-prose-body": "#374151",
            "--tw-prose-headings": "#1C1C1C",
            "--tw-prose-lead": "#4B5563",
            "--tw-prose-links": "#E63946",
            "--tw-prose-bold": "#1C1C1C",
            "--tw-prose-quotes": "#1C1C1C",
            "--tw-prose-quote-borders": "#E63946",
            "--tw-prose-bullets": "#E63946",
            "--tw-prose-counters": "#E63946",
            "--tw-prose-hr": "#E5E7EB",
            "--tw-prose-th-borders": "#D1D5DB",
            "--tw-prose-td-borders": "#E5E7EB",
            maxWidth: "none",
            fontSize: "1.125rem",
            lineHeight: "1.8",
            a: {
              fontWeight: "600",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            h2: {
              fontFamily: "Montserrat, Bebas Neue, sans-serif",
              fontWeight: "700",
              letterSpacing: "-0.02em",
              marginTop: "2.25em",
              marginBottom: "0.75em",
            },
            h3: {
              fontFamily: "Montserrat, Bebas Neue, sans-serif",
              fontWeight: "700",
              marginTop: "1.75em",
              marginBottom: "0.5em",
            },
            p: {
              marginTop: "1.15em",
              marginBottom: "1.15em",
            },
            "ul > li": {
              paddingLeft: "0.35em",
              marginTop: "0.45em",
              marginBottom: "0.45em",
            },
            "ol > li": {
              paddingLeft: "0.35em",
              marginTop: "0.45em",
              marginBottom: "0.45em",
            },
            blockquote: {
              fontWeight: "500",
              fontStyle: "normal",
              borderLeftWidth: "4px",
              borderLeftColor: "#E63946",
              backgroundColor: "rgba(230, 57, 70, 0.04)",
              paddingTop: "0.85rem",
              paddingBottom: "0.85rem",
              paddingRight: "1rem",
              borderRadius: "0 0.5rem 0.5rem 0",
              quotes: "none",
              p: {
                marginTop: "0.35em",
                marginBottom: "0.35em",
              },
              "p:first-of-type::before": { content: "none" },
              "p:last-of-type::after": { content: "none" },
            },
            hr: {
              borderColor: "#E5E7EB",
              marginTop: "2.5em",
              marginBottom: "2.5em",
            },
            strong: {
              fontWeight: "700",
              color: "#1C1C1C",
            },
            table: {
              fontSize: "0.95em",
            },
            "thead th": {
              fontWeight: "700",
              color: "#1C1C1C",
            },
          },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "float-delayed": "float 5s ease-in-out 1s infinite",
        orbit: "orbit 20s linear infinite",
        "orbit-reverse": "orbit 25s linear infinite reverse",
        "slide-in-left": "slideInLeft 0.7s ease-out forwards",
        "slide-in-right": "slideInRight 0.7s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        dash: "dash 1.5s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(230, 57, 70, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(230, 57, 70, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        dash: {
          "0%": { strokeDashoffset: "24" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [typography],
};
export default config;
