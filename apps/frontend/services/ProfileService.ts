import { ApiService } from './ApiService'

export class ProfileService extends ApiService {
	static getProfile() {
		return useApiFetch('/users/me', {
			retry: 3
		})
	}
}
