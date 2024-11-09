import axios from 'axios';
import {API_KEY, USERNAME, BASE_URL} from '@/shared/config/api/sputnik8';
import {TourTypeRequest} from '../requestType/tourTypeRequest';

export const fetchTourInfo = async (productId: number, lang: string = 'ru') => {
    try {
        const requestURL = `${BASE_URL}/${productId}`;
        const response = await axios.get(requestURL, {
            params: {
                api_key: API_KEY,
                username: USERNAME,
                lang,
            },
        });

        return response.data as TourTypeRequest;
    } catch (error) {
        console.error('Failed to fetch tour info:', error);
        throw error;
    }
};
