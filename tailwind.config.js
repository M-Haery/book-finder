/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.jsx",
    "./src/pages/**/*.jsx",
    "./src/App.jsx"
  ],
  theme: {
    extend: {
      colors:{
        "primary":{
          "100" : "#3DC2EC",
          "150" : "#3eb2d6",
          "200" : "#4B70F5",
          "300" : "#4C3BCF",
          "400" : "#402E7A",
        },
        "theme": {
          "100" : "#6B728E",
          "200" : "#50577A",
          "300" : "#474E68",
          "400" : "#404258",
        }
      }
    },
  },
  plugins: [
    function({addVariant}){
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover')
    }
  ],
}

