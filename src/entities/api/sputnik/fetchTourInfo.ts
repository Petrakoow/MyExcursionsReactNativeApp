import {httpClient} from '@/shared/api';
import {TourTypeRequest} from '@/shared/api';

export const fetchTourInfo = async (
    productId: number,
    lang: string = 'ru',
): Promise<TourTypeRequest> => {
    try {
        const response = await httpClient.request<TourTypeRequest>({
            url: `/products/${productId}`,
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
