<script setup lang="ts">
const { data } = await ProfileService.getProfile()

useHead({
	title: 'Profile',
})
</script>

<template>
	<h1>Profile</h1>
</template>
