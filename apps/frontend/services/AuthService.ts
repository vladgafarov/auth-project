import { ApiService } from './ApiService'

export class AuthService extends ApiService {
	public static baseUrl: string = '/authentication'

	static signUp() {
		return {
			url: this.url('/sign-up'),
		}
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
