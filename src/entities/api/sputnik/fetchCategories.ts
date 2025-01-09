import {CategoryType, httpClient} from '@/shared/api';

export const fetchCategories = async (cityId: number): Promise<CategoryType[]> => {
    try {
        const response = await httpClient.request<CategoryType[]>({
            url: `/cities/${cityId}/categories`,
            method: 'GET',
        });

        return response;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};
