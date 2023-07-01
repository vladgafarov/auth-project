<script setup lang="ts">
const route = useRoute()
</script>

<template>
	<div class="container py-6">hey, {{ route.params['coffeeid'] }}</div>
</template>
