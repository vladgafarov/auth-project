import { ApiService } from './ApiService'

export class AuthService extends ApiService {
	public static baseUrl: string = '/authentication'

	static async signUp({
		email,
		password,
	}: {
		email: Ref<string>
		password: Ref<string>
	}) {
		return useApiFetch<{
			accessToken: string
			refreshToken: string
		}>(this.url('/sign-up'), {
			method: 'POST',
			body: {
				email,
				password,
			},
			immediate: false,
			watch: false,
		})
	}

	static async signIn({
		email,
		password,
	}: {
		email: Ref<string>
		password: Ref<string>
	}) {
		return useApiFetch<{
			accessToken: string
			refreshToken: string
		}>(this.url('/sign-in'), {
			method: 'POST',
			body: {
				email,
				password,
			},
			immediate: false,
			watch: false,
		})
	}

	static async signInGoogle({ token }: { token: Ref<string> }) {
		return useApiFetch<{
			accessToken: string
			refreshToken: string
		}>(this.url('/google'), {
			method: 'POST',
			body: {
				token,
			},
			immediate: false,
			watch: false,
		})
	}

	static async signOut() {
		return useApiFetch(this.url('/sign-out'), {
			method: 'POST',
			immediate: false,
			watch: false,
		})
	}

	static async refreshTokens() {
		const config = useRuntimeConfig()

		return $fetch<{
			accessToken: string
			refreshToken: string
		}>(this.url('/refresh-tokens'), {
			method: 'POST',
			retry: 3,
			baseURL: config.public.baseURL,
			credentials: 'include',
		})
	}
}
