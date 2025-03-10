/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#030014",
                accent: "#AB8BFF",
                light: {
                    100: "#d6c6ff",
                    200: "#b399ff",
                    300: "#916dff",
                    400: "#6e40ff",
                    500: "#4b14ff",
                    600: "#3a0ecc",
                    700: "#290a99",
                    800: "#180666",
                    900: "#070233"
                },
                dark: {
                    100: "#070233",
                    200: "#180666",
                    300: "#290a99",
                    400: "#3a0ecc",
                    500: "#4b14ff",
                    600: "#6e40ff",
                    700: "#916dff",
                    800: "#b399ff",
                    900: "#d6c6ff"
                }
            }
        }
    },
    plugins: []
};
