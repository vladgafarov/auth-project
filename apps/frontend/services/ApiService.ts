import { FetchOptions, FetchResponse, Method } from './types'

export abstract class ApiService {
	public static baseUrl: string = ''
	protected static url(endpoint?: string): string {
		if (!endpoint) return this.baseUrl
		return this.baseUrl + endpoint
	}

	static fetch<Res, Err>(
		url: string,
		options: FetchOptions<Res>,
	): Promise<FetchResponse<Res, Err>> {
		return useApiFetch<Res>(url, options)
	}
}
