<template>
	<div class="flex flex-col h-full">
		<Header />

		<div class="container mt-16 flex-1">
			<slot />
		</div>

		<Footer />
	</div>
</template>
