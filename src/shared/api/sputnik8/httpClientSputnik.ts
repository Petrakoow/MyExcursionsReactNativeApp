import {API_KEY, BASE_URL, USERNAME} from '@/shared/config/api/sputnik8';
import {HttpClient, HttpRequestParams} from '../http/httpClient';

export class HttpClientSputnik extends HttpClient {
    constructor(baseURL: string, headers?: Record<string, string>) {
        super({
            baseURL,
            headers: {
                ...headers,
                Authorization: `Bearer ${API_KEY}`,
            },
        });
    }

    async request<T>({
        params = {},
        headers = {},
        ...restConfig
    }: HttpRequestParams): Promise<T> {
        const enhancedParams = {
            ...params,
            api_key: API_KEY,
            username: USERNAME,
        };

        const enhancedHeaders = {
            ...headers,
            'Content-Type': 'application/json',
        };

        return super.request<T>({
            ...restConfig,
            params: enhancedParams,
            headers: enhancedHeaders,
        });
    }
}

export const httpClient = new HttpClientSputnik(BASE_URL);
