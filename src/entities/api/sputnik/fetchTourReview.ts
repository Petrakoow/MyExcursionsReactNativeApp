import {httpClient} from '@/shared/api';
import {LanguageType, TourReviewTypeRequest} from '@/shared/api';
import {WithEmptyContent} from '@/shared/api/sputnik8/fetchType/fetchParamsType';

export const fetchTourReview = async (
    productId: number,
    lang: LanguageType = 'ru',
    pageToken: string | null = null,
    maxPageSize: number = 50,
    withEmptyContent: WithEmptyContent = true,
): Promise<TourReviewTypeRequest> => {
    try {
        const response = await httpClient.request<TourReviewTypeRequest>({
            url: `/products/${productId}/reviews`,
            method: 'GET',
            params: {
                lang,
                page_token: pageToken || undefined,
                max_page_size: maxPageSize,
                with_empty_content: withEmptyContent,
            },
        });

        return response;
    } catch (error) {
        console.error('Failed to fetch tour reviews:', error);
        throw error;
    }
};
