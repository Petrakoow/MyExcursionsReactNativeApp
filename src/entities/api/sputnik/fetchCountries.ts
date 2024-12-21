import {CountryTypeRequest, LanguageType} from '@/shared/api';
import {COUNTRIES_URL} from '@/shared/config/api/sputnik8';
import {HttpClientSputnik} from '@/shared/api';

export const fetchCountries = async (
    lang: LanguageType = 'ru',
    page = 1,
    limit = 50,
): Promise<CountryTypeRequest[]> => {
    try {
        if (limit > 100 || limit < 1) {
            throw new Error('The limit can be set in the range from 1 to 100.');
        }

        const httpClient = new HttpClientSputnik(COUNTRIES_URL);

        const response = await httpClient.request<CountryTypeRequest[]>({
            url: '',
            method: 'GET',
            params: {
                lang,
                page,
                limit,
            },
        });

        return response;
    } catch (error) {
        console.error('Error fetching all countries', error);
        throw error;
    }
};
