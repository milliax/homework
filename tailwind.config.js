module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        running:{
          "from": {transform: "translateX(0%)"},
          "to": {transform: "translateX(100%)"},
        },
        point: {
          '0%': {top: '-0.25rem',left: '-1.25rem'},
          '100%': {top: '-0.5rem',left: '-1.5rem'},
        },
      },
      hola:{
        wo: {transform: "translateX(+10px)"}
      },
      animation:{
        running: "running 1s linear infinite",
        point: 'point 0.6s linear infinite',
      }
    },
  },
  plugins: [],
}
