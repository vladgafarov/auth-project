<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
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
	<VAlert
		class="mt-4"
		type="error"
		v-if="error"
		border="start"
		variant="outlined"
		>{{ error }}</VAlert
	>
	<form class="mt-8 flex flex-col gap-3" @submit.prevent="submit">
		<VTextField
			v-model="email.value.value"
			:error-messages="email.errorMessage.value"
			name="email"
			label="Email"
		/>
		<VTextField
			v-model="password.value.value"
			:error-messages="password.errorMessage.value"
			name="password"
			label="Password"
			type="password"
		/>

		<VBtn color="teal" block type="submit" :loading="status === 'pending'"
			>Login</VBtn
		>
	</form>
</template>
