import axios from 'axios';
import {API_KEY, USERNAME, PRODUCT_URL} from '@/shared/config/api/sputnik8';
import {TourTypeRequest} from '../requestType/tourTypeRequest';

import {
    CurrencyType,
    OrderFieldType,
    LanguageType,
    OrderType,
} from '../fetchType/fetchParamsType';

export const fetchTours = async (
    lang: LanguageType = 'ru',
    page = 1,
    limit = 50,
    cityId?: number,
    countryId?: number,
    order?: OrderFieldType,
    order_type?: OrderType,
    categoryId?: number,
    categorySlug?: string,
    currency?: CurrencyType,
) => {
    try {
        if (limit > 100 || limit < 1) {
            throw new Error('the limit can be set in the range from 1 to 100 ');
        }
        const response = await axios.get(PRODUCT_URL, {
            params: {
                api_key: API_KEY,
                username: USERNAME,
                lang,
                page,
                limit,
                ...(cityId && {city_id: cityId}),
                ...(countryId && {country_id: countryId}),
                ...(categoryId && {category_id: categoryId}),
                ...(categorySlug && {category_slug: categorySlug}),
                ...(currency && {currency: currency}),
                ...(order && {order: order}),
                ...(order_type && {order_type: order_type}),
            },
        });
        return response.data as TourTypeRequest[];
    } catch (error) {
        console.error('Error fetching all tours:', error);
        throw error;
    }
};
