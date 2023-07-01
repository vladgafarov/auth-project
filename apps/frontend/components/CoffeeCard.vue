<script setup lang="ts">
const props = defineProps<{ name: string; price: number; id: number }>()
</script>

<template>
	<div class="card card-compact w-96 bg-base-100 shadow-xl flex-grow">
		<figure>
			<img src="/coffee.jpg" :alt="props.name" />
		</figure>
		<div class="card-body">
			<NuxtLink :to="`/menu/${props.id}`">
				<h2 class="card-title">{{ props.name }}</h2>
			</NuxtLink>
			<div class="card-actions justify-end">
				<button class="btn btn-primary">Buy Now</button>
			</div>
		</div>
	</div>
</template>
