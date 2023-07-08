// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxtjs/tailwindcss', '@invictus.codes/nuxt-vuetify'],
	css: ['~/assets/global.css'],
	runtimeConfig: {
		public: {
			baseURL: process.env.NUXT_BACKEND_URL || '',
		},
	},
	imports: {
		dirs: ['services'],
	},
})
