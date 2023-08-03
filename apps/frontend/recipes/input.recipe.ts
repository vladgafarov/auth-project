import { defineRecipe } from '@pandacss/dev'

export const inputRecipe = defineRecipe({
	name: 'input',
	description: 'The styles for the input component',
	base: {
		borderRadius: 'md',
	},
	variants: {
		size: {
			sm: { px: '4', py: '2', fontSize: '14px' },
			md: { px: '5', py: '2', fontSize: '16px' },
			lg: { padding: '8', fontSize: '40px' },
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
