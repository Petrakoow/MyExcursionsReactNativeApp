import {useState, useEffect, useCallback} from 'react';
import {
    ExcursionFilterType,
    FilterAscDesc,
    FilterByNameAndId,
    FilterByQualityProduct,
} from '@/features/excursions';

export const useFilterExcursionPanel = (
    onFiltersChange: (filters: ExcursionFilterType) => void,
) => {
    const [selectedCountry, setSelectedCountry] =
        useState<FilterByNameAndId>(undefined);
    const [selectedCity, setSelectedCity] =
        useState<FilterByNameAndId>(undefined);

    const [sortField, setSortField] =
        useState<FilterByQualityProduct>(undefined);
    const [sortOrder, setSortOrder] = useState<FilterAscDesc>(undefined);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        onFiltersChange({
            country: selectedCountry,
            city: selectedCity,
            product: sortField,
            ascDesc: sortOrder,
        });
    }, [selectedCountry, selectedCity, sortField, sortOrder]);

    const toggleModal = useCallback(() => setModalVisible(prev => !prev), []);

    const handleOrderSelectionChange = useCallback((name: FilterAscDesc) => {
        setSortOrder(prev => (prev === name ? undefined : name));
    }, []);

    const handleFieldSelectionChange = useCallback(
        (name: FilterByQualityProduct) => {
            setSortField(prev => (prev === name ? undefined : name));
        },
        [],
    );

    return {
        selectedCountry,
        setSelectedCountry,
        selectedCity,
        setSelectedCity,
        sortField,
        setSortField,
        sortOrder,
        setSortOrder,
        modalVisible,
        toggleModal,
        handleOrderSelectionChange,
        handleFieldSelectionChange,
    };
};
