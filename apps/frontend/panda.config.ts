import { defineConfig } from '@pandacss/dev'
import { buttonRecipe } from 'recipes/button.recipe'
import { inputRecipe } from 'recipes/input.recipe'

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: [
		'./components/**/*.{js,jsx,ts,tsx,vue}',
		'./pages/**/*.{js,jsx,ts,tsx,vue}',
		'./recipes/**/*.{ts}',
	],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {
			recipes: {
				button: buttonRecipe,
				input: inputRecipe,
			},
		},
	},

	// The output directory for your css system
	outdir: 'styled-system',
})
