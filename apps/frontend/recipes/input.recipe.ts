import { defineRecipe } from '@pandacss/dev'

export const inputRecipe = defineRecipe({
	name: 'input',
	description: 'The styles for the input component',
	base: {
		borderRadius: 'md',
		borderWidth: '1px',
		borderColor: 'slate.400',
		_hover: {
			borderColor: 'slate.500',
		},
		_focus: {
			outlineWidth: '1px',
			outlineColor: 'slate.500',
			outlineOffset: '2px',
		},
	},
	variants: {
		error: {
			true: {
				borderColor: 'red.400',
			},
		},
		size: {
			sm: { px: '0', py: '2' },
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
