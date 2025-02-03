/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#ccff01",
        "primary-500": "#cdfe02a1",
        backgroundPrimary: "#1f1f1f",
        secondPrimary: "#e0e3e2",
        secondBg: "#424242",
        thirdBg: "#f6f6f6",
        textPrimary: "#7f8a92",
        textSecond: "#afbec9",
        shadow: "#e0dede",
      },
      fontFamily: {
        Nunito: ["Nunito-Light"],
        NunitoMedium: ["Nunito-Medium"],
        NunitoSemiBold: ["Nunito-SemiBold"],
        NunitoBold: ["Nunito-Bold"],
        NunitoRegular: ["Nunito-Regular"],
        NunitoLight: ["Nunito-Light"],
        NunitoBlack: ["Nunito-Black"],
      },
    },
  },
  plugins: [],
};
