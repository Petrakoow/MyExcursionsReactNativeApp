import {useState, useCallback} from 'react';
import {
    FilterAscDesc,
    FilterByQualityProduct,
    ExcursionFilterType,
} from '@/features/excursions';

export const useToggleFilters = (
    updateFilters: (key: keyof ExcursionFilterType, value: any) => void,
    filters: ExcursionFilterType,
) => {
    const [sortOrder, setSortOrder] = useState<FilterAscDesc>(filters.ascDesc);
    const [sortField, setSortField] =
        useState<FilterByQualityProduct>(filters.product);

    const handleOrderSelectionChange = useCallback(
        (name: FilterAscDesc) => {
            const newSortOrder = sortOrder === name ? undefined : name;
            setSortOrder(newSortOrder);
            updateFilters('ascDesc', newSortOrder);
        },
        [sortOrder, updateFilters],
    );

    const handleFieldSelectionChange = useCallback(
        (name: FilterByQualityProduct) => {
            const newSortField = sortField === name ? undefined : name;
            setSortField(newSortField);
            updateFilters('product', newSortField);
        },
        [sortField, updateFilters],
    );

    return {
        sortOrder,
        handleOrderSelectionChange,
        sortField,
        handleFieldSelectionChange,
    };
};
