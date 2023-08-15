<script setup lang="ts">
import { startAuthentication } from '@simplewebauthn/browser'
import { button } from 'styled-system/recipes'

async function webauthnLogin() {
	const res = await AuthService.webauthnLoginOptions()

	let attResp
	try {
		attResp = await startAuthentication(res)
	} catch (error) {
		throw createError({ message: 'Webauthn login failed' })
	}

	const verificationResp = await AuthService.webauthnLoginVerification({
		...attResp,
		challenge: res.challenge,
	})

	if (verificationResp) {
		navigateTo('/profile')
	}
}
</script>

<template>
	<button @click="webauthnLogin()" :class="button({ visual: 'outline' })">
		Login with passkey
	</button>

	<NuxtErrorBoundary>
		<template #error="{ error }"> Error: {{ error }} </template>
	</NuxtErrorBoundary>
</template>
