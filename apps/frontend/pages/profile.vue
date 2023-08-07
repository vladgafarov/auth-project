<script setup lang="ts">
import { container } from 'styled-system/patterns'
import { button } from 'styled-system/recipes'

const { data, refresh } = await ProfileService.getProfile()

useHead({
	title: 'Profile',
})
</script>

<template>
	<div :class="container({ pt: '20' })">
		<h1>Profile</h1>

		<button @click="refresh()" :class="button()">refresh</button>
	</div>
</template>
