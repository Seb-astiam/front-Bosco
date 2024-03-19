/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom-shadow': '1px 1px 2px #717171'
      },
      colors: {
        naranjaForm: "#FEB156",
        whiteseñales: '#eee',
        verdelimon: '#c7e755',
        cantaloupe: '#fda172',
        olive: '#8b8e58',
        white: "#fff",
        midnightblue: "#05073c",
        gray: {
          "100": "#757575",
          "200": "rgba(16, 16, 16, 0.3)",
          "300": "rgba(255, 255, 255, 0.15)",
        },
        gainsboro: "#e7e6e6",
        chocolate: {
          "100": "#eb662b",
          "200": "#d14d12",
          "300": "rgba(235, 102, 43, 0.15)",
        },
        black: "#000",
        sandybrown: "#e2ad64",
        dimgray: "#717171",
        salmon: "#f56e6e",
        palegoldenrod: "#dafac0",
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
        custom: ["Inter", "sans-serif"]
      },
      borderRadius: {
        "21xl": "40px",
        "16xl": "35px",
        "181xl": "200px",
        "31xl": "50px",
      },
    },
    fontSize: {
      "mini-5": "14.5px",
      mini: "15px",
      base: "16px",
      "mini-9": "14.9px",
      "lgi-7": "19.7px",
      "mini-6": "14.6px",
      "lgi-5": "19.5px",
      "mini-4": "14.4px",
      "mini-8": "14.8px",
      "lgi-8": "19.8px",
      "mini-3": "14.3px",
      "mini-2": "14.2px",
      xl: "20px",
      "base-2": "16.2px",
      "31xl": "50px",
      "11xl": "30px",
      "21xl": "40px",
      lgi: "19px",
      "base-6": "15.6px",
      "base-9": "15.9px",
      "5xl": "24px",
      "3xl": "22px",
      "4xl": "23px",
      lg: "18px",
      "mid-7": "17.7px",
      sm: "14px",
      "smi-6": "12.6px",
      "smi-5": "12.5px",
      "3xs": "10px",
      "smi-3": "12.3px",
      "base-1": "15.1px",
      smi: "13px",
      "sm-3": "13.3px",
      "40xl-5": "59.5px",
      "17xl": "36px",
      "29xl": "48px",
      inherit: "inherit",
    },
    screens: {
      mq1650: {
        raw: "screen and (max-width: 1650px)",
      },
      mq1300: {
        raw: "screen and (max-width: 1300px)",
      },
      mq900: {
        raw: "screen and (max-width: 900px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
    transform: {
      'hide': 'translateY(-300%)',
      
    },
    zIndex: {
      '10': 10,
    },
  },
  corePlugins: {
    preflight: false,
  },
};


