<script setup lang="ts">
import { startRegistration } from '@simplewebauthn/browser'
import { css } from 'styled-system/css'
import { button } from 'styled-system/recipes'

const props = defineProps<{ email: string; webauthnDevices: [] }>()

async function webauthnRegister() {
	const res = await AuthService.webauthnRegistrationOptions(props.email)

	let attResp
	try {
		attResp = await startRegistration(res)
	} catch (error) {
		if (error.name === 'InvalidStateError') {
			alert('Authenticator was probably already registered')
			throw createError('Authenticator was probably already registered')
		}

		throw error
	}

	const verificationResp = await AuthService.webauthnRegistrationVerification({
		...attResp,
		email: props.email,
	})

	if (verificationResp) {
		alert('Passkey created')
	}
}
</script>

<template>
	<div :class="css({ my: '10' })">
		<button @click="webauthnRegister()" :class="button()">
			Create passkey
		</button>

		<p>Passkeys:</p>

		<ul>
			<li v-for="passkey in props.webauthnDevices" :key="passkey.id">
				{{ passkey.credentialID }}
			</li>
		</ul>
	</div>
</template>
