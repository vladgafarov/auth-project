<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { css } from 'styled-system/css'
import { flex } from 'styled-system/patterns'
import { button, input } from 'styled-system/recipes'
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'

const schema = toTypedSchema(
	z.object({
		email: z.string().email(),
		password: z.string().min(6),
	})
)
const { handleSubmit } = useForm({
	validationSchema: schema,
})

const email = useField<string>('email')
const password = useField<string>('password')

const submit = handleSubmit(() => {
	execute()
})

const { execute, status, error } = await AuthService.signIn({
	email: email.value,
	password: password.value,
})
</script>

<template>
	<h2 :class="css({ fontWeight: 'semibold', fontSize: 'lg' })">Login</h2>

	<p :class="css({ color: 'red.400' })" v-if="error">{{ error }}</p>

	<form
		:class="flex({ direction: 'column', gap: '3' })"
		@submit.prevent="submit"
	>
		<Input
			v-model="email.value.value"
			label="Email"
			name="email"
			type="email"
			autocomplete="username"
			required
			:error="Boolean(email.errorMessage.value)"
			:errorMessage="email.errorMessage.value"
		/>

		<Input
			v-model="password.value.value"
			label="Password"
			name="password"
			type="password"
			autocomplete="current-password"
			required
			:error="Boolean(password.errorMessage.value)"
			:errorMessage="password.errorMessage.value"
		/>

		<button
			type="submit"
			:disabled="status === 'pending'"
			:class="[css({ mt: '3' }), button({ disabled: status === 'pending' })]"
		>
			Login
		</button>
	</form>
</template>
