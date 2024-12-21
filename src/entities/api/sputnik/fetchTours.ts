import {HttpClientSputnik} from '@/shared/api';
import {
    LanguageType,
    OrderFieldType,
    OrderType,
    CurrencyType,
    TourTypeRequest,
} from '@/shared/api';
import {PRODUCT_URL} from '@/shared/config/api/sputnik8';

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
): Promise<TourTypeRequest[]> => {
    try {
        if (limit > 100 || limit < 1) {
            throw new Error('The limit must be between 1 and 100.');
        }

        const httpClient = new HttpClientSputnik(PRODUCT_URL);

        const response = await httpClient.request<TourTypeRequest[]>({
            url: '',
            method: 'GET',
            params: {
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

        return response;
    } catch (error) {
        console.error('Error fetching all tours:', error);
        throw error;
    }
};
