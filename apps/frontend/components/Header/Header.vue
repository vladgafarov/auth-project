<script setup lang="ts">
const isLoggedIn = ref(false)

function toggleIsLoggedIn() {
	isLoggedIn.value = !isLoggedIn.value
}
</script>

<template>
	<VAppBar elevation="1">
		<VAppBarTitle>
			<NuxtLink to="/" class="font-semibold text-lg btn btn-ghost">
				Coffee shop
			</NuxtLink>
		</VAppBarTitle>

		<template v-slot:append>
			<div class="flex gap-4">
				<NuxtLink to="/menu">Menu</NuxtLink>
				<NuxtLink to="/profile">Profile</NuxtLink>
				<NuxtLink to="/login">Login</NuxtLink>
			</div>
		</template>
	</VAppBar>
</template>
