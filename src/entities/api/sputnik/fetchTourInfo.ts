import {HttpClientSputnik} from '@/shared/api';
import {TourTypeRequest} from '@/shared/api';
import {PRODUCT_URL} from '@/shared/config/api/sputnik8';

export const fetchTourInfo = async (
    productId: number,
    lang: string = 'ru',
): Promise<TourTypeRequest> => {
    try {
        const httpClient = new HttpClientSputnik(PRODUCT_URL);

        const response = await httpClient.request<TourTypeRequest>({
            url: `/${productId}`,
            method: 'GET',
            params: {
                lang,
            },
        });

        return response;
    } catch (error) {
        console.error('Failed to fetch tour info:', error);
        throw error;
    }
};
