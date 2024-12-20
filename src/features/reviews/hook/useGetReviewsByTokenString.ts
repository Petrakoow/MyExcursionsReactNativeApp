import {TourReviewTypeRequest, fetchTourReview} from '@/shared/api/sputnik8';
import {useState, useRef} from 'react';

export const useGetReviewsByTokenString = () => {
    const [page, setPage] = useState(1);
    const [reviewsList, setReviewsList] = useState<
        TourReviewTypeRequest['reviews']
    >([]);
    const stackPageToken = useRef<(string | undefined)[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [currentToken, setCurrentToken] = useState<string>();

    const getToursByExcursionId = async (
        pageToken: string | null = null,
        uid: number,
    ) => {
        try {
            const reviewData = await fetchTourReview(uid, 'ru', pageToken);
            setReviewsList(reviewData.reviews);
            setHasMore(!!reviewData.pagination.next_page_token);

            if (
                reviewData.pagination.next_page_token &&
                !stackPageToken.current.includes(
                    reviewData.pagination.next_page_token,
                )
            ) {
                stackPageToken.current = [
                    ...stackPageToken.current,
                    reviewData.pagination.next_page_token,
                ];
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setIsFetching(false);
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        const nextPageToken =
            stackPageToken.current[stackPageToken.current.length - 1];
        setIsFetching(true);
        if (nextPageToken) {
            setCurrentToken(nextPageToken);
            setPage(currentPage => currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        setIsFetching(true);
        if (stackPageToken.current.length > 1) {
            stackPageToken.current = stackPageToken.current.slice(0, -1);
            setCurrentToken(
                stackPageToken.current[stackPageToken.current.length - 2],
            );
            setPage(currentPage => currentPage - 1);
        }
    };

    return {
        currentToken,
        hasMore,
        isFetching,
        isLoading,
        reviewsList,
        page,
        getToursByExcursionId,
        setIsFetching,
        handleNextPage,
        handlePreviousPage,
    };
};
