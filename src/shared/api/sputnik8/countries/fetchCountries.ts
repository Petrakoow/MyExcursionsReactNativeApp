import axios from 'axios';
import {CountryTypeRequest, LanguageType} from '@/shared/api/sputnik8';
import {API_KEY, COUNTRIES_URL, USERNAME} from '@/shared/config/api/sputnik8';

export const fetchCountries = async (
    lang: LanguageType = 'ru',
    page = 1,
    limit = 50,
) => {
    try {
        if (limit > 100 || limit < 1) {
            throw new Error('the limit can be set in the range from 1 to 100 ');
        }

        const response = await axios.get(COUNTRIES_URL, {
            params: {
                api_key: API_KEY,
                username: USERNAME,
                page,
                lang,
            },
        });

        return response.data as CountryTypeRequest[];
    } catch (error) {
        console.error('Error fetching all countries', error);
        throw error;
    }
};
