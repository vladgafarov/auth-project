import { defineRecipe } from '@pandacss/dev'

export const buttonRecipe = defineRecipe({
	name: 'button',
	description: 'The styles for the Button component',
	base: {
		display: 'flex',
		borderRadius: '8px',
		cursor: 'pointer',
	},
	variants: {
		visual: {
			solid: {
				bg: 'green.400',
				color: 'white',
			},
			funky: { bg: 'red.200', color: 'white' },
			edgy: { border: '1px solid {colors.red.500}' },
		},
		size: {
			sm: { padding: '4', fontSize: '12px' },
			md: { px: '5', py: '2' },
			lg: { padding: '8', fontSize: '40px' },
		},
	},
	defaultVariants: {
		visual: 'solid',
		size: 'md',
	},
})
