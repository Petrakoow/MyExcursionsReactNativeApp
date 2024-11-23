import {useState, useEffect, useCallback, useMemo} from 'react';
import {ExcursionFilterType, FilterByNameAndId} from '@/features/excursions';
import {getFilterSession, saveFilterSession} from '@/shared/db/models/filters';

export const useExcursionFilters = (
    onFiltersChange?: (filters: ExcursionFilterType) => void,
) => {
    const data = useMemo(() => getFilterSession(), []);

    const [filters, setFilters] = useState<ExcursionFilterType>(
        () => data || {},
    );

    useEffect(() => {
        saveFilterSession(filters);
        onFiltersChange?.(filters);
        console.log(filters);
    }, [filters]);

    const setFilter = useCallback(
        (key: keyof ExcursionFilterType, value: any) => {
            setFilters(prev => {
                if (prev[key] === value) return prev;
                return {...prev, [key]: value};
            });
        },
        [],
    );

    return {
        filters,
        setFilter,
    };
};
