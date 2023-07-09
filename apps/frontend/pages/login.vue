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

useHead({
	title: 'Login',
})
definePageMeta({
	layout: false,
})
</script>

<template>
	<div class="grid grid-cols-1 grid-rows-1 place-items-center h-full p-10">
		<VCard
			elevation="6"
			class="w-full lg:w-1/3 mx-auto bg-slate-200 p-6 rounded-xl"
			:loading="status === 'pending'"
		>
			<VCardItem>
				<VCardText>
					<NuxtLink to="/">
						<VBtn variant="text">
							<VIcon icon="mdi-chevron-left" start />
							Back home
						</VBtn>
					</NuxtLink>

					<VAlert
						class="mt-4"
						@click:close="clearError()"
						type="error"
						v-if="error"
						>{{ error }}</VAlert
					>
					<form class="mt-8 flex flex-col gap-6" @submit.prevent="submit">
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

						<VBtn
							color="teal"
							block
							type="submit"
							:disabled="status === 'pending'"
							>Login</VBtn
						>
					</form>
				</VCardText>
			</VCardItem>
		</VCard>
	</div>
</template>
