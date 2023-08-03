<script setup lang="ts">
import { css } from 'styled-system/css'
import { flex, grid } from 'styled-system/patterns'
import { button } from 'styled-system/recipes'

const activeForm = ref<'login' | 'signup'>('login')

useHead({
	title: 'Login',
})
definePageMeta({
	layout: false,
})
</script>

<template>
	<div
		:class="[
			css({
				h: 'full',
				placeItems: 'center',
			}),
			grid({ columns: 1 }),
		]"
	>
		<div
			:class="
				css({
					w: 'full',
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
					<NuxtLink to="/">
						<button :class="button({ visual: 'ghost', size: 'sm' })">
							Back home
						</button>
					</NuxtLink>
				</div>

				<LoginForm v-if="activeForm === 'login'" />
				<SignupForm v-else />

				<p
					v-if="activeForm === 'login'"
					@click="activeForm = 'signup'"
					class="text-slate-500 mt-3 text-center cursor-pointer"
				>
					Already have an account?
				</p>
				<p
					v-else-if="activeForm === 'signup'"
					@click="activeForm = 'login'"
					class="text-slate-500 mt-3 text-center cursor-pointer"
				>
					I don't have an account
				</p>
			</div>
		</div>
	</div>
</template>
