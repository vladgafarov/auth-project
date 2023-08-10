<script setup lang="ts">
const token = ref('')
const googleRef = ref()
const auth = useAuth()

const { execute, data } = await AuthService.signInGoogle({ token })

function handleGoogleRes(data) {
	token.value = data.credential
	execute()
}

onMounted(() => {
	if (!google) throw new Error('no google oauth')

	google.accounts.id.initialize({
		client_id:
			'200021557345-iqs3gmoc997rk0h76ln33c6tkch2v3ae.apps.googleusercontent.com',
		callback: handleGoogleRes,
		context: 'signin',
	})

	google.accounts.id.renderButton(googleRef.value, {
		type: 'standard',
		shape: 'rectangular',
		theme: 'outline',
		text: 'signin',
		size: 'large',
		logo_alignment: 'left',
	})
})

watch(data, async newData => {
	if (newData) {
		auth.value.authenticated = true
		await navigateTo('/profile')
	}
})
</script>

<template>
	<div ref="googleRef"></div>
</template>
