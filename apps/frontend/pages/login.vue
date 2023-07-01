<script setup lang="ts">
const email = ref('')
const password = ref('')

useHead({
	title: 'Login',
})
definePageMeta({
	layout: false,
})
</script>

<template>
	<div class="grid grid-cols-1 grid-rows-1 place-items-center h-full">
		<div class="max-w-lg mx-auto bg-slate-200 p-6 rounded-xl shadow">
			<NuxtLink to="/">
				<Icon name="tabler:chevron-left" />
				Back home</NuxtLink
			>

			<form class="mt-3">
				<label class="label" for="email">
					<span class="label-text">Email</span>
				</label>
				<input
					class="input input-bordered input-primary"
					name="email"
					id="email"
					type="text"
					v-model="email"
					required
				/>

				<label class="label" for="password">
					<span class="label-text">Password</span>
				</label>
				<input
					class="input input-bordered input-primary"
					name="password"
					id="password"
					type="password"
					v-model="password"
					required
				/>
				<button class="btn btn-primary block w-full mt-5">Login</button>
			</form>
		</div>
	</div>
</template>
