import { css, cx } from 'styled-system/css'
import { flex } from 'styled-system/patterns'
import { InputVariantProps, input } from 'styled-system/recipes'
import type { SetupContext } from 'vue'

type Props = {
	modelValue: string
	label?: string
	errorMessage?: string
}

export default function Input(
	props: InputVariantProps & Omit<Partial<HTMLInputElement>, 'size'> & Props,
	context: SetupContext,
) {
	const { disabled, size, error, label, errorMessage, modelValue, ...rest } =
		props
	const recipeProps: InputVariantProps = {
		disabled,
		size,
		error,
	}

	return (
		<div>
			{label && (
				<div class={css({ mb: '1' })}>
					<label for={rest.name}>{label}</label>
				</div>
			)}

			<div class={css({ pos: 'relative' })}>
				{/* @ts-ignore */}
				<input
					class={cx(
						input(recipeProps),
						css({
							w: 'full',
							pr: context.slots.rightSection ? '11' : undefined,
						}),
					)}
					id={rest.name}
					disabled={Boolean(disabled)}
					{...rest}
					onInput={e => {
						const target = e.target as HTMLInputElement
						context.emit('update:modelValue', target.value)
					}}
				/>

				{context.slots.rightSection && (
					<div
						class={cx(
							css({
								pos: 'absolute',
								right: 0,
								top: 0,
								bottom: 0,
								w: '10',
								borderWidth: '1px',
								borderColor: 'red.500',
							}),
							flex({ justifyContent: 'center', alignItems: 'center' }),
						)}
					>
						{context.slots.rightSection()}
					</div>
				)}
			</div>

			{errorMessage && (
				<span class={css({ color: 'red.400', fontSize: 'sm' })}>
					{errorMessage}
				</span>
			)}
		</div>
	)
}
