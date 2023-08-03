import type { SetupContext } from 'vue'
import { InputVariantProps, input } from 'styled-system/recipes'

type Props = {
	modelValue: string
}

export default function Input(
	props: InputVariantProps & Partial<HTMLInputElement> & Props,
	context: SetupContext
) {
	const { disabled, size, ...rest } = props
	const recipeProps = { disabled, size }

	return (
		<div>
			{/* @ts-ignore */}
			<input
				class={input(recipeProps)}
				{...rest}
				onInput={e => {
					const target = e.target as HTMLInputElement
					context.emit('update:modelValue', target.value)
				}}
			/>
		</div>
	)
}
