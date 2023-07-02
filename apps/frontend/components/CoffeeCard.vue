<script setup lang="ts">
const props = defineProps<{ name: string; price: number; id: number }>()
</script>

<template>
	<VCard>
		<VImg
			src="/coffee.jpg"
			:alt="props.name"
			height="200px"
			cover
			class="align-end text-white"
		>
			<NuxtLink :to="`/menu/${props.id}`">
				<VCardTitle>{{ props.name }}</VCardTitle>
			</NuxtLink>
		</VImg>
		<VCardActions class="card-actions justify-end">
			<VBtn>Buy Now</VBtn>
		</VCardActions>
	</VCard>
</template>
