import { ApiService } from './ApiService'

export class CoffeesService extends ApiService {
	public static baseUrl: string = '/coffees'

	static getAll() {
		return {
			url: this.baseUrl,
		}
	}
}
