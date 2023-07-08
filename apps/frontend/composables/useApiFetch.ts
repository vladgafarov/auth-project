export const useApiFetch: typeof useFetch = (url, options) => {
	const config = useRuntimeConfig()

	return useFetch(url, {
		baseURL: config.public.baseURL,
		credentials: 'include',
		...options,
	})
}
