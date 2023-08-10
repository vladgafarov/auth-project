<script setup lang="ts">
import { css } from 'styled-system/css'
import { flex, grid } from 'styled-system/patterns'
import { button } from 'styled-system/recipes'

const activeForm = ref<'login' | 'signup'>('login')

useHead({
	title: 'Login',
	script: [{ src: 'https://accounts.google.com/gsi/client', async: true }],
})
definePageMeta({
	layout: false,
	middleware: ['auth'],
})
</script>

<template>
	<div
		:class="[
			css({
				h: 'full',
				placeItems: 'center',
				p: '10',
			}),
			grid({ columns: 1 }),
		]"
	>
		<div
			:class="
				css({
					w: 'full',
					md: { w: '2/3' },
					lg: { w: '1/3' },
					ml: 'auto',
					mr: 'auto',
					bgColor: 'slate.200',
					p: '6',
					rounded: 'xl',
				})
			"
		>
			<div :class="flex({ direction: 'column', gap: '4' })">
				<div :class="flex()">
					<NuxtLink to="/"> Back home </NuxtLink>
				</div>

				<LoginForm v-if="activeForm === 'login'" />
				<SignupForm v-else />

				<div :class="grid({ columns: 2 })">
					<!-- <button :class="button({ visual: 'outline' })">
						Login with Google
					</button> -->
					<GoogleAuth />
					<button :class="button({ visual: 'outline' })">
						Login with passkey
					</button>
				</div>

				<p
					v-if="activeForm === 'login'"
					@click="activeForm = 'signup'"
					:class="
						css({
							color: 'slate.500',
							textAlign: 'center',
							cursor: 'pointer',
						})
					"
				>
					Already have an account?
				</p>
				<p
					v-else-if="activeForm === 'signup'"
					@click="activeForm = 'login'"
					:class="
						css({
							color: 'slate.500',
							textAlign: 'center',
							cursor: 'pointer',
						})
					"
				>
					I don't have an account
				</p>
			</div>
		</div>
	</div>
</template>
