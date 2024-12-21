import {TourTypeRequest} from '@/shared/api';
import {useCallback, useRef, useState} from 'react';
import {ExcursionSettingsType} from '../type/excursionFilterType';
import {fetchTours} from '@/entities/api';

export const useGetExcursionsByPageNumber = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState<string | null>(null);
    const [tours, setTours] = useState<TourTypeRequest[]>([]);
    const pageRef = useRef(1);
    const selectedFiltersRef = useRef<ExcursionSettingsType | undefined>();

    const getToursByPage = useCallback(async () => {
        const {language, limit, filters} = selectedFiltersRef.current || {};
        setLoading(true);
        setError(null);

        try {
            setIsFetching(true);
            const toursData = await fetchTours(
                language!,
                pageRef.current,
                limit!,
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
    }, []);

    const handleNextPage = () => {
        if (!isFetching) {
            pageRef.current += 1;
            getToursByPage();
        }
    };

    const handlePreviousPage = () => {
        if (!isFetching && pageRef.current > 1) {
            pageRef.current -= 1;
            getToursByPage();
        }
    };

    const updateFiltersAndFetch = (filters: ExcursionSettingsType) => {
        if (
            JSON.stringify(filters) !==
            JSON.stringify(selectedFiltersRef.current)
        ) {
            selectedFiltersRef.current = filters;
            pageRef.current = 1;
            getToursByPage();
        }
    };

    return {
        isFetching,
        isLoading,
        hasMore: tours.length > 0,
        isError,
        tours,
        page: pageRef.current,
        getToursByPage,
        handleNextPage,
        handlePreviousPage,
        updateFiltersAndFetch,
    };
};
