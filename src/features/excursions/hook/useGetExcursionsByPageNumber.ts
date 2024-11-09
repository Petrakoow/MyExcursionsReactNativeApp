import {TourTypeRequest, fetchTours} from '@/shared/api/sputnik8';

import {useState} from 'react';

export const useGetExcursionsByPageNumber = () => {
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState<string | null>(null);
    const [tours, setTours] = useState<TourTypeRequest[]>([]);
    const [retryCount, setRetryCount] = useState(0);
    const getToursByPage = async (page: number) => {
        try {
            setIsFetching(true);
            const toursData = await fetchTours('ru', page);
            setTours(toursData);
            setError(null);
            setRetryCount(0);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'An unexpected error occurred',
            );
            setRetryCount(prev => prev + 1);
        } finally {
            setIsFetching(false);
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        setIsFetching(true);
        setPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setIsFetching(true);
        setPage(prevPage => prevPage - 1);
    };

    return {
        isFetching,
        isLoading,
        hasMore: tours.length > 0,
        isError,
        tours,
        page,
        retryCount,
        getToursByPage,
        handleNextPage,
        handlePreviousPage,
    };
};
