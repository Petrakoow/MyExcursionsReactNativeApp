import {useEffect, useState} from 'react';
import {FilterItem} from '@/features/excursions';

export const useDropdownFilter = <T = {}>(
    itemsList: FilterItem<T>[],
    onSelectionChange: (selectedItem: FilterItem<T>) => void,
) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedItem, setSelectedItem] = useState<FilterItem<T>>(
        undefined,
    );
    const [filteredItems, setFilteredItems] =
        useState<FilterItem<T>[]>(itemsList);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        setFilteredItems(
            itemsList.filter(item =>
                item?.name
                    .toLowerCase()
                    .includes(inputValue.toLowerCase().trim()),
            ),
        );
    }, [inputValue, itemsList]);

    useEffect(() => {
        onSelectionChange(selectedItem);
    }, [selectedItem, onSelectionChange]);

    const toggleItemActive = (item: FilterItem<T>) => {
        setSelectedItem(prev => (prev?.id === item?.id ? undefined : item));
    };

    const handleAddRemove = () => {
        const trimmedInput = inputValue.trim();
        if (trimmedInput && filteredItems.length > 0) {
            const firstMatch = filteredItems[0];
            toggleItemActive(firstMatch);
            setInputValue('');
        }
    };

    return {
        inputValue,
        setInputValue,
        selectedItem,
        filteredItems,
        dropdownVisible,
        setDropdownVisible,
        isItemInSelected: selectedItem
            ? filteredItems.some(item => item?.id === selectedItem.id)
            : false,
        toggleItemActive,
        handleAddRemove,
    };
};
