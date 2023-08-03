import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	alias: {
		'styled-system': resolve('./styled-system'),
	},
	devtools: { enabled: true },
	modules: [],
	css: ['~/assets/global.css'],
	runtimeConfig: {
		public: {
			baseURL: process.env.NUXT_BACKEND_URL || '',
		},
	},
	postcss: {
		plugins: {
			'@pandacss/dev/postcss': {},
		},
	},
	imports: {
		dirs: ['services'],
	},
})
