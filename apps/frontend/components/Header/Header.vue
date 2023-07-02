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
			<NuxtLink to="/menu">Menu</NuxtLink>
		</template>
	</VAppBar>
</template>
