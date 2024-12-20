import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react';
import {
    useGetExcursionsByPageNumber,
} from '@/features/excursions';
import {ExcursionFilterType} from '@/features/excursions';
import {PAGE_LANGUAGE, PAGE_LIMIT} from '@/shared/config/constants';

type FilterContextType = {
    selectedFilters: ExcursionFilterType | undefined;
    setSelectedFilters: (filters: ExcursionFilterType) => void;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    getToursByPageContext: () => Promise<void>;
    handleNextPage: () => void;
    handlePreviousPage: () => void;
    isFetching: boolean;
    isLoading: boolean;
    isError: string | null;
    tours: any[];
    hasMore: boolean;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

type FilterProviderType = {
    children: ReactNode;
};

export const FilterProvider = (props: FilterProviderType) => {
    const {children} = props;
    const [selectedFilters, setSelectedFilters] = useState<
        ExcursionFilterType | undefined
    >(undefined);

    const {
        isFetching,
        isLoading,
        hasMore,
        isError,
        tours,
        page,
        getToursByPage,
        handleNextPage,
        handlePreviousPage,
        setPage,
    } = useGetExcursionsByPageNumber();

    const getToursByPageContext = async () => {
        await getToursByPage({
            language: PAGE_LANGUAGE,
            limit: PAGE_LIMIT,
            filters: selectedFilters,
        });
    };

    const contextValue = {
        isLoading,
        selectedFilters,
        page,
        isFetching,
        isError,
        tours,
        hasMore,
        getToursByPageContext,
        setPage,
        handleNextPage,
        handlePreviousPage,
        setSelectedFilters,
    };

    useEffect(() => {
        if (selectedFilters) {
            setPage(1);
        }
    }, [selectedFilters, setPage]);

    useEffect(() => {
        getToursByPageContext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, selectedFilters]);

    return (
        <FilterContext.Provider value={contextValue}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilters = (): FilterContextType => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilters must be used within a FilterProvider');
    }
    return context;
};
