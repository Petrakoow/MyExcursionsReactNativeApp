import {TourTypeRequest, fetchTours} from '@/shared/api/sputnik8';
import {useState} from 'react';
import {ExcursionSettingsType} from '../type/excursionFilterType';

export const useGetExcursionsByPageNumber = () => {
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState<string | null>(null);
    const [tours, setTours] = useState<TourTypeRequest[]>([]);
    const getToursByPage = async (props: ExcursionSettingsType) => {
        const {language, filters, limit} = props;

        try {
            setIsFetching(true);
            const toursData = await fetchTours(
                language,
                page,
                limit,
                filters?.city?.id,
                filters?.country?.id,
                filters?.product,
                filters?.ascDesc,
            );
            setTours(toursData);
            setError(null);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'An unexpected error occurred',
            );
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
        getToursByPage,
        handleNextPage,
        handlePreviousPage,
        setPage,
    };
};
