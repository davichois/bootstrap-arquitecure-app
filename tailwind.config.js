/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#1B1F23",
        "bg-primary-live": "#262A2D",
        line: "#4A5053",
      },
    },
  },
  plugins: [],
};

// npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
