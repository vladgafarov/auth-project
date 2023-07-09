<script setup lang="ts">
const activeForm = ref<'login' | 'signup'>('login')

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
		>
			<VCardItem>
				<VCardText>
					<NuxtLink to="/">
						<VBtn variant="text">
							<VIcon icon="mdi-chevron-left" start />
							Back home
						</VBtn>
					</NuxtLink>

					<LoginForm v-if="activeForm === 'login'" />
					<SignupForm v-else />

					<p
						v-if="activeForm === 'login'"
						@click="activeForm = 'signup'"
						class="text-slate-500 mt-3 text-center cursor-pointer"
					>
						Already have an account?
					</p>
					<p
						v-else-if="activeForm === 'signup'"
						@click="activeForm = 'login'"
						class="text-slate-500 mt-3 text-center cursor-pointer"
					>
						I don't have an account
					</p>
				</VCardText>
			</VCardItem>
		</VCard>
	</div>
</template>
