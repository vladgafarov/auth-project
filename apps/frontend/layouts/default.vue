<script setup>
import { css } from 'styled-system/css'
import { flex } from 'styled-system/patterns'
</script>

<template>
	<div :class="flex({ direction: 'column', h: 'full' })">
		<Header />

		<div :class="css({ mt: '16', flexGrow: '1' })">
			<slot />
		</div>

		<Footer />
	</div>
</template>
