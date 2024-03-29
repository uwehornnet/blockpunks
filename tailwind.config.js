/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./layout/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			tablet: "767px",
			laptop: "1024px",
			desktop: "1320px",
		},
		container: {
			center: true,
		},
		extend: {
			animation: {
				bounce200: "bounce 1s infinite 200ms",
				bounce400: "bounce 1s infinite 400ms",
			},
			fontFamily: {
				jost: ["Jost"],
				sans: ["Jost", "sans-serif"],
			},
		},
	},
	plugins: [],
};
