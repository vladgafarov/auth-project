<script setup lang="ts">
import { css } from 'styled-system/css'
import { container } from 'styled-system/patterns'
import { button } from 'styled-system/recipes'
import { startRegistration } from '@simplewebauthn/browser'

const { data, refresh } = await ProfileService.getProfile()

useHead({
	title: 'Profile',
})
definePageMeta({
	middleware: ['auth'],
})
</script>

<template>
	<div :class="container({ pt: '20' })">
		<h1>Profile</h1>

		<div>
			{{ data?.email }}
		</div>

		<WebauthnProfile
			:email="data.email"
			:webauthn-devices="data.webauthnDevices"
		/>

		<button @click="refresh()" :class="button()">refresh</button>
	</div>
</template>
