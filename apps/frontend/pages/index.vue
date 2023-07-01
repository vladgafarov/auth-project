<script setup lang="ts">
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
		<div :class="['hero min-h-screen', $style['hero-bg']]">
			<div class="hero-content text-center">
				<div class="max-w-md">
					<h1 class="text-5xl font-bold">Best coffees</h1>
					<p class="py-6">
						Provident cupiditate voluptatem et in. Quaerat fugiat ut
						assumenda excepturi exercitationem quasi. In deleniti eaque
						aut repudiandae et a id nisi.
					</p>
					<a href="#best">
						<button class="btn btn-primary">See menu</button>
					</a>
				</div>
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
					class="card card-compact w-96 bg-base-100 shadow-xl flex-grow"
				/>
			</div>

			<div class="flex justify-center mt-8">
				<NuxtLink to="/menu">
					<button class="btn btn-accent">View all coffees</button>
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
