import {CityTypeRequest, LanguageType} from '@/shared/api';
import {httpClient} from '@/shared/api';

export const fetchCities = async (
    lang: LanguageType = 'ru',
    page = 1,
    limit = 50,
    country_id?: number,
): Promise<CityTypeRequest[]> => {
    try {
        if (limit > 100 || limit < 1) {
            throw new Error('The limit must be between 1 and 100.');
        }

        const response = await httpClient.request<CityTypeRequest[]>({
            url: '/cities',
            method: 'GET',
            params: {
                lang,
                page,
                limit,
                country_id,
            },
        });

        return response;
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
};
