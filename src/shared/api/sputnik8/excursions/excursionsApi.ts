import axios from 'axios';
import {API_KEY, USERNAME, BASE_URL} from '@/shared/config/api/sputnik8';
import {TourTypeRequest} from '../requestType/excursionType';

export const getAllTours = async (lang = 'ru', page = 1, limit = 50) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                api_key: API_KEY,
                username: USERNAME,
                lang,
                page,
                limit,
            },
        });
        return response.data as TourTypeRequest[];
    } catch (error) {
        console.error('Error fetching all tours:', error);
        throw error;
    }
};

export const getToursByCity = async (
    cityId: number,
    lang = 'ru',
    page = 1,
    limit = 50,
) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                api_key: API_KEY,
                username: USERNAME,
                city_id: cityId,
                lang,
                page,
                limit,
            },
        });
        return response.data as TourTypeRequest[];
    } catch (error) {
        console.error('Error fetching tours by city:', error);
        throw error;
    }
};
