export const useAuth = () =>
	useState<{ authenticated: boolean }>('auth', () => ({
		authenticated: false,
	}))
