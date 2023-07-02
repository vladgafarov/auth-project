import { defineRule } from 'vee-validate'

export default defineNuxtPlugin(nuxtApp => {
	defineRule('required', (value: string) => {
		if (!value) {
			return 'This field is required'
		}
		return true
	})
	defineRule('email', (value: string) => {
		if (!value.includes('@')) {
			return 'This field must be a valid email'
		}
		return true
	})
})
