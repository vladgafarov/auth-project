import { defineRecipe } from '@pandacss/dev'

export const inputRecipe = defineRecipe({
	name: 'input',
	description: 'The styles for the input component',
	base: {
		borderRadius: 'md',
	},
	variants: {
		size: {
			sm: { px: '4', py: '2' },
			md: { px: '5', py: '2' },
			lg: { px: '6', py: '3' },
		},
		disabled: {
			true: {
				cursor: 'not-allowed',
			},
		},
	},
	defaultVariants: {
		size: 'md',
	},
})
