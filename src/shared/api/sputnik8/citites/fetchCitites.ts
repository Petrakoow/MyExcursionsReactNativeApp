import axios from 'axios';
import {API_KEY, CITIES_URL, USERNAME} from '@/shared/config/api/sputnik8';
import {LanguageType} from '@/shared/api/sputnik8';
import { CityTypeRequest } from '@/shared/api/sputnik8';


export const fetchCities = async (
    lang: LanguageType = 'ru',
    page = 1,
    limit = 50,
    country_id?: number,
) => {
    try {
        if (limit > 100 || limit < 1) {
            throw new Error('The limit must be between 1 and 100.');
        }

        const response = await axios.get(CITIES_URL, {
            params: {
                api_key: API_KEY,
                username: USERNAME,
                page,
                lang,
                limit,
                country_id,
            },
        });

        return response.data as CityTypeRequest[];
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
};
