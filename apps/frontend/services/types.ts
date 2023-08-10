import { AsyncData, UseFetchOptions } from 'nuxt/app'

export type Method = 'get' | 'put' | 'post' | 'delete' | 'patch'

export type FetchOptions<DataT> = UseFetchOptions<DataT> & {
	method: Method | Uppercase<Method>
}
export type FetchResponse<DataT, ErrorT> = AsyncData<DataT, ErrorT>
