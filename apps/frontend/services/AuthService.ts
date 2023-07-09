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
}
