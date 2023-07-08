export abstract class ApiService {
	public static baseUrl: string = ''
	protected static url(endpoint?: string): string {
		if (!endpoint) return this.baseUrl
		return this.baseUrl + endpoint
	}
}
