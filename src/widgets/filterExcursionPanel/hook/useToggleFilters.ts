import {useState, useCallback} from 'react';
import {
    ExcursionFilterType,
} from '@/features/excursions';

import {OrderFieldType, OrderType} from '@/shared/api';

export const useToggleFilters = (
    updateFilters: (key: keyof ExcursionFilterType, value: any) => void,
    filters: ExcursionFilterType,
) => {
    const [sortOrder, setSortOrder] = useState<OrderType | undefined>(filters.ascDesc);
    const [sortField, setSortField] =
        useState<OrderFieldType | undefined>(filters.product);

    const handleOrderSelectionChange = useCallback(
        (name: OrderType) => {
            const newSortOrder = sortOrder === name ? undefined : name;
            setSortOrder(newSortOrder);
            updateFilters('ascDesc', newSortOrder);
        },
        [sortOrder, updateFilters],
    );

    const handleFieldSelectionChange = useCallback(
        (name: OrderFieldType) => {
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
