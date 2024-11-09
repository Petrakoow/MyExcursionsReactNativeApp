import axios from 'axios';
import {API_KEY, USERNAME, BASE_URL} from '@/shared/config/api/sputnik8';
import {LanguageType, WithEmptyContent} from './fetchParamsType';
import { TourReviewTypeRequest } from '../requestType/tourReviewTypeRequest';
export const fetchTourReview = async (
    productId: number,
    lang: LanguageType = 'ru',
    pageToken: string | null = null,
    maxPageSize: number = 50,
    withEmptyContent: WithEmptyContent = true,
) => {
    try {
        const requestURL = `${BASE_URL}/${productId}/reviews`;
        const response = await axios.get(requestURL, {
            params: {
                api_key: API_KEY,
                username: USERNAME,
                lang,
                page_token: pageToken || undefined,
                max_page_size: maxPageSize,
                with_empty_content: withEmptyContent,
            },
        });

        return response.data as TourReviewTypeRequest; 
    } catch (error) {
        console.error('Failed to fetch tour reviews:', error);
        throw error;
    }
};
