<script setup lang="ts">
import { css } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

const isLoggedIn = ref(false)

function toggleIsLoggedIn() {
	isLoggedIn.value = !isLoggedIn.value
}
</script>

<template>
	<header
		:class="[
			flex({ justifyContent: 'space-between', alignItems: 'center' }),
			css({
				px: '4',
				py: '2',
				position: 'fixed',
				top: '8px',
				left: '8px',
				right: '8px',
				bg: 'white',
				borderRadius: '8px',
				shadow: 'sm',
			}),
		]"
	>
		<div>
			<NuxtLink
				to="/"
				:class="css({ fontWeight: 'semibold', fontSize: 'lg' })"
			>
				Coffee shop
			</NuxtLink>
		</div>

		<div :class="flex({ gap: '4' })">
			<NuxtLink to="/menu">Menu</NuxtLink>
			<NuxtLink to="/profile">Profile</NuxtLink>
			<NuxtLink to="/login">Login</NuxtLink>
		</div>
	</header>
</template>
