import axios from 'axios';

export type HttpClientConfig = {
    baseURL: string;
    headers?: Record<string, string>;
    requestExecutor?: <T>(config: HttpRequestParams) => Promise<T>;
};

export type HttpRequestParams = {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    params?: Record<string, any>;
    data?: any;
    headers?: Record<string, string>;
};

export class HttpClient {
    private baseURL: string;
    private headers: Record<string, string>;
    private requestExecutor: <T>(config: HttpRequestParams) => Promise<T>;

    constructor({baseURL, headers = {}, requestExecutor}: HttpClientConfig) {
        this.baseURL = baseURL;
        this.headers = headers;

        this.requestExecutor = requestExecutor || this.defaultExecutor;
    }

    private async defaultExecutor<T>({
        url,
        method,
        params,
        data,
        headers,
    }: HttpRequestParams): Promise<T> {
        const response = await axios({
            baseURL: this.baseURL,
            url,
            method,
            params,
            data,
            headers: {
                ...this.headers,
                ...headers,
            },
        });

        return response.data;
    }

    async request<T>(config: HttpRequestParams): Promise<T> {
        return this.requestExecutor<T>(config);
    }
}
