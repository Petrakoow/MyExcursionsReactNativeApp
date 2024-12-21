import React, {createContext, useContext, ReactNode, useMemo} from 'react';
import {useGetExcursionsByPageNumber} from '@/features/excursions';
import {ExcursionFilterType} from '@/features/excursions';
import {PAGE_LANGUAGE, PAGE_LIMIT} from '@/shared/config/constants';
import {useGetCities, useGetCountries} from '@/features/filters';

type FilterContextType = {
    selectedFilters: ExcursionFilterType | undefined;
    setSelectedFilters: (filters: ExcursionFilterType) => void;
    page: number;
    handleNextPage: () => void;
    handlePreviousPage: () => void;
    getToursByPageContext: () => void;
    isFetching: boolean;
    isLoading: boolean;
    isError: string | null;
    tours: any[];
    hasMore: boolean;
    countries: any[];
    cities: any[];
    reloadFilters: () => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

type FilterProviderType = {
    children: ReactNode;
};

export const FilterProvider = ({children}: FilterProviderType) => {
    const {
        isFetching,
        isLoading,
        hasMore,
        isError,
        tours,
        page,
        handleNextPage,
        handlePreviousPage,
        updateFiltersAndFetch,
        getToursByPage,
    } = useGetExcursionsByPageNumber();

    const {
        countries,
        loading: countriesLoading,
        error: countriesError,
        refetch: refetchCountries,
    } = useGetCountries();

    const {
        cities,
        loading: citiesLoading,
        error: citiesError,
        refetch: refetchCities,
    } = useGetCities();

    const setSelectedFilters = (filters: ExcursionFilterType) => {
        updateFiltersAndFetch({
            language: PAGE_LANGUAGE,
            limit: PAGE_LIMIT,
            filters,
        });
    };

    const getToursByPageContext = () => {
        getToursByPage();
    };

    const reloadFilters = () => {
        refetchCountries();
        refetchCities();
        getToursByPageContext();
    };

    const contextValue = useMemo(
        () => ({
            isLoading: isLoading || countriesLoading || citiesLoading,
            isFetching,
            isError: isError || countriesError || citiesError,
            tours,
            page,
            hasMore,
            selectedFilters: undefined,
            countries,
            cities,
            handleNextPage,
            handlePreviousPage,
            setSelectedFilters,
            getToursByPageContext,
            reloadFilters,
        }),
        [
            isLoading,
            countriesLoading,
            citiesLoading,
            isError,
            countriesError,
            citiesError,
            tours,
            page,
            hasMore,
            countries,
            cities,
            isFetching,
        ],
    );

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
