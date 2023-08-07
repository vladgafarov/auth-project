export const useApiFetch: typeof useFetch = (url, options) => {
	const config = useRuntimeConfig()

	return useFetch(url, {
		baseURL: config.public.baseURL,
		credentials: 'include',
		async onResponseError(context) {
			if (context.response.status === 401) {
				await AuthService.refreshTokens()
				await $fetch(context.request, {
					credentials: 'include',
				})
			}

			const err = context.response._data?.message
			const errorMessage = Array.isArray(err) ? err.join(', ') : err
			throw createError({ message: errorMessage })
		},
		...options,
	})
}
