import {FilterItem} from '@/features/excursions';
import {useMemo, useEffect, useState, useCallback} from 'react';

export const useDropdownFilter = <T = {}>(
    itemsList: FilterItem<T>[],
    selectedFilterItem: FilterItem<T>,
    onSelectionChange: (selectedItem: FilterItem<T>) => void,
) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedItem, setSelectedItem] =
        useState<FilterItem<T>>(selectedFilterItem);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const filteredItems = useMemo(() => {
        const trimmedInput = inputValue.toLowerCase().trim();
        return itemsList.filter(item =>
            item?.name.toLowerCase().startsWith(trimmedInput),
        );
    }, [inputValue, itemsList]);

    const isItemInSelected = useMemo(() => {
        return selectedItem
            ? filteredItems.some(item => item?.id === selectedItem.id)
            : false;
    }, [selectedItem, filteredItems]);

    const addItem = useCallback(() => {
        const trimmedInput = inputValue.trim();
        if (trimmedInput && filteredItems.length > 0) {
            const firstMatch = filteredItems[0];
            setSelectedItem(firstMatch);
            setInputValue('');
        }
    }, [inputValue, filteredItems]);

    const toggleItemActive = useCallback((item: FilterItem<T>) => {
        setSelectedItem(prev => (prev?.id === item?.id ? undefined : item));
    }, []);

    const removeItem = useCallback(() => {
        setSelectedItem(undefined);
    }, []);

    useEffect(() => {
        onSelectionChange(selectedItem);
    }, [selectedItem, onSelectionChange]);

    return {
        inputValue,
        selectedItem,
        filteredItems,
        dropdownVisible,
        isItemInSelected,
        setInputValue,
        setDropdownVisible,
        addItem,
        removeItem,
        toggleItemActive,
    };
};
