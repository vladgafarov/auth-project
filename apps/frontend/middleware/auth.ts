export default defineNuxtRouteMiddleware((to, from) => {
	const auth = useAuth()
	const refreshTokenCookie = useCookie('refresh-token')
	const authenticated = auth.value.authenticated
	const refreshToken = refreshTokenCookie.value

	// if (authenticated) {
	// 	if (to.path === '/login') return '/profile'
	// 	return
	// } else {
	// 	if (to.path === '/login') {
	// 		if (refreshToken) {
	// 			auth.value.authenticated = true
	// 			return '/profile'
	// 		}
	// 		return
	// 	}
	// 	if (to.path !== '/login') return '/login'
	// }
})
