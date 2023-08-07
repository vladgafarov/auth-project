import { defineRecipe } from '@pandacss/dev'

export const buttonRecipe = defineRecipe({
	name: 'button',
	description: 'The styles for the Button component',
	base: {
		borderRadius: 'md',
		cursor: 'pointer',
	},
	variants: {
		visual: {
			solid: {
				bg: 'green.400',
				color: 'white',
			},
			outline: {
				bg: 'white',
				borderWidth: '1px',
				borderColor: 'green.400',
				color: 'green.400',
			},
			ghost: {
				bg: 'transparent',
				px: 0,
				py: 0,
			},
		},
		size: {
			sm: { px: '4', py: '2', fontSize: '14px' },
			md: { px: '5', py: '2', fontSize: '16px' },
			lg: { padding: '8', fontSize: '40px' },
		},
		disabled: {
			true: {
				cursor: 'not-allowed',
				opacity: 0.6,
			},
		},
	},
	defaultVariants: {
		visual: 'solid',
		size: 'md',
	},
})
