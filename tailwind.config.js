const defaultTheme = require("tailwindcss/defaultTheme");

// Colors are CSS variables (see global.css) so one class works in light + dark.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	// Only apply hover styles on devices that can actually hover (no sticky hover on touch).
	future: { hoverOnlyWhenSupported: true },
	content: ["./app/**/*.{js,ts,jsx,tsx}", "./content/**/*.mdx"],
	theme: {
		extend: {
			colors: {
				canvas: token("canvas"),
				alt: token("alt"),
				card: token("card"),
				"card-alt": token("card-alt"),
				fg: token("fg"),
				muted: token("muted"),
				line: token("line"),
				accent: token("accent"),
				brand: token("brand"),
				ok: token("ok"),
			},
			borderColor: {
				DEFAULT: "rgb(var(--line) / 0.1)",
			},
			fontFamily: {
				sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
			},
			typography: {
				DEFAULT: {
					css: {
						"code::before": { content: '""' },
						"code::after": { content: '""' },
					},
				},
				quoteless: {
					css: {
						"blockquote p:first-of-type::before": { content: "none" },
						"blockquote p:first-of-type::after": { content: "none" },
					},
				},
			},
			keyframes: {
				"fade-up": {
					from: { opacity: "0", transform: "translateY(24px)" },
					to: { opacity: "1", transform: "none" },
				},
			},
			animation: {
				"fade-up": "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwindcss-debug-screens"),
	],
};
