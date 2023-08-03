<script setup lang="ts">
import { css } from 'styled-system/css'
import { flex } from 'styled-system/patterns'
import { button } from 'styled-system/recipes'

// const { data } = useApiFetch(CoffeesService.getAll().url)

const coffeeList = [
	{
		id: 1,
		name: 'Latte',
		price: 1200,
	},
	{
		id: 2,
		name: 'Latte 2',
		price: 1200,
	},
	{
		id: 3,
		name: 'Latte 3',
		price: 1200,
	},
]

useHead({
	title: 'Coffee shop',
})
</script>

<template>
	<div>
		<div
			:class="[
				$style['hero-bg'],
				css({ minH: 'screen', textAlign: 'center' }),
				flex({ alignItems: 'center', justifyContent: 'center' }),
			]"
		>
			<div :class="css({ maxW: 'md' })">
				<h1
					:class="
						css({
							fontSize: '5xl',
							lineHeight: '5xl',
							fontWeight: 'bold',
						})
					"
				>
					Best coffees
				</h1>
				<p :class="css({ pt: '6', pb: '6' })">
					Provident cupiditate voluptatem et in. Quaerat fugiat ut
					assumenda excepturi exercitationem quasi. In deleniti eaque aut
					repudiandae et a id nisi.
				</p>
				<a
					href="#best"
					:class="flex({ justifyContent: 'center', alignItems: 'center' })"
				>
					<button :class="button()">See menu</button>
				</a>
			</div>
		</div>

		<section id="best" class="my-12 container">
			<h2 class="font-semibold text-2xl">Best coffee</h2>

			<div class="flex gap-10 justify-between flex-wrap lg:flex-nowrap mt-8">
				<CoffeeCard
					v-for="coffee in coffeeList"
					:name="coffee.name"
					:price="coffee.price"
					:id="coffee.id"
					:key="coffee.id"
					class="flex-1 min-w-min"
				/>
			</div>

			<div class="flex justify-center mt-8">
				<NuxtLink to="/menu">
					<VBtn>View all coffees</VBtn>
				</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style module>
.hero-bg {
	background-color: #ffdee9;
	background-image: linear-gradient(0deg, #ffdee9 0%, #b5fffc 100%);
}
</style>
