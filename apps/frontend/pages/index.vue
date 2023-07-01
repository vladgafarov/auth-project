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
	<div class="py-6 scroll-smooth">
		<div class="hero min-h-screen bg-base-100">
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

		<section id="best">
			<h2 class="font-semibold text-2xl">Best coffee</h2>

			<div class="flex gap-10 justify-between flex-wrap lg:flex-nowrap mt-8">
				<div
					v-for="coffee in coffeeList"
					class="card card-compact w-96 bg-base-100 shadow-xl flex-grow"
				>
					<figure>
						<img src="/coffee.jpg" :alt="coffee.name" />
					</figure>
					<div class="card-body">
						<h2 class="card-title">{{ coffee.name }}</h2>
						<div class="card-actions justify-end">
							<button class="btn btn-primary">Buy Now</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
