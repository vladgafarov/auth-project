<script setup lang="ts">
const email = ref('')
const password = ref('')

const { data, error } = useApiFetch('/coffees')
console.log(data.value)

useHead({
	title: 'Login',
})
definePageMeta({
	layout: false,
})
</script>

<template>
	<div class="grid grid-cols-1 grid-rows-1 place-items-center h-full">
		<VCard
			elevation="6"
			class="w-1/3 mx-auto bg-slate-200 p-6 rounded-xl"
			:loading="false"
		>
			<VCardItem>
				<VCardText>
					<NuxtLink to="/">
						<VBtn variant="text">
							<VIcon icon="mdi-chevron-left" start />
							Back home
						</VBtn>
					</NuxtLink>

					<VForm class="mt-8">
						<VTextField name="email" label="Email" v-model="email" />
						<VTextField
							name="password"
							label="Password"
							type="password"
							v-model="password"
						/>

						<VBtn color="teal" block>Login</VBtn>
					</VForm>
				</VCardText>
			</VCardItem>
		</VCard>
	</div>
</template>
