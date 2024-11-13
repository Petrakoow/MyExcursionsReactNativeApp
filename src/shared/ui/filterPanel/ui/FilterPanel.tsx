import {FlatList, TouchableOpacity, View} from 'react-native';
import React, {ReactNode, useEffect, useState} from 'react';
import {CustomText} from '@/shared/ui/customText';
import {CustomInput} from '@/shared/ui/customInput';
import {stylesSearchFilter, stylesFilterPanel} from './FilterPanelStyle';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {SvgProps} from 'react-native-svg';
import * as Icons from '@/shared/assets/icons';
import {moderateScale} from 'react-native-size-matters';
import {ToggleButton} from '../../toggleButton';

type FilterPanelType = {
    children: ReactNode;
};

export const FilterPanel = ({children}: FilterPanelType) => {
    return <View style={stylesFilterPanel.container}>{children}</View>;
};

type SearchFilterComponentType = {
    title?: string;
    labelDropdownList?: string;
    labelAdd?: string;
    labelRemove?: string;
    IconLabelDropdownList?: React.FC<SvgProps>;
    IconAdd?: React.FC<SvgProps>;
    IconRemove?: React.FC<SvgProps>;
    hasLabelAddRemove?: boolean;
    hasDropdownList?: boolean;
    itemsList: {id: number; name: string}[];
    onSelectionChange: (selectedItems: { id: number; name: string }[]) => void;
};

const ICON_SIZE = moderateScale(20);

export const SearchFilterComponent = React.memo(
    (props: SearchFilterComponentType) => {
        const {
            title,
            labelAdd = 'Add',
            labelRemove = 'Remove',
            hasLabelAddRemove,
            hasDropdownList,
            IconLabelDropdownList = Icons.DropdownAction,
            IconAdd = Icons.AddFilterAction,
            IconRemove = Icons.DeleteFilterAction,
            itemsList = [],
            onSelectionChange
        } = props;

        const [inputValue, setInputValue] = useState('');
        const [selectedItems, setSelectedItems] = useState<
            {id: number; name: string}[]
        >([]);
        const [filteredItems, setFilteredItems] = useState(itemsList);
        const [dropdownVisible, setDropdownVisible] = useState(false);

        const firstFilteredItem = filteredItems[0];
        const isItemInSelected = firstFilteredItem
            ? selectedItems.includes(firstFilteredItem)
            : false;

        useEffect(() => {
            setFilteredItems(
                itemsList.filter(item =>
                    item.name
                        .toLowerCase()
                        .includes(inputValue.toLowerCase().trim()),
                ),
            );
        }, [inputValue, itemsList]);

        useEffect(() => {
            onSelectionChange(selectedItems);
        }, [selectedItems]);

        const toggleItemActive = (
            item: {id: number; name: string},
            isToggle = false,
        ) => {
            if (isToggle || filteredItems.some(i => i.id === item.id)) {
                setSelectedItems(prev =>
                    prev.some(i => i.id === item.id)
                        ? prev.filter(i => i.id !== item.id)
                        : [...prev, item],
                );
            }
        };

        const handleAddRemove = () => {
            const trimmedInput = inputValue.trim();
            if (trimmedInput && filteredItems.length > 0) {
                const firstMatch = filteredItems[0];
                toggleItemActive(firstMatch);
                setInputValue('');
            }
        };
        console.log(selectedItems);
        return (
            <View>
                {title && (
                    <View style={stylesSearchFilter.titleSearchFilter}>
                        <CustomText>{title}</CustomText>
                    </View>
                )}
                <View style={stylesSearchFilter.containerSearchFilter}>
                    <CustomInput
                        style={stylesSearchFilter.inputSearchFilter}
                        value={inputValue}
                        onChangeText={setInputValue}
                        placeholder="Поиск..."
                    />
                    {hasDropdownList && (
                        <CustomButton
                            style={[
                                styleButton.firstTypeButton,
                                stylesSearchFilter.buttonSearchFilter,
                            ]}
                            Icon={IconLabelDropdownList}
                            iconSize={ICON_SIZE}
                            onPress={() => setDropdownVisible(!dropdownVisible)}
                        />
                    )}
                    <CustomButton
                        textButton={
                            hasLabelAddRemove
                                ? isItemInSelected
                                    ? labelRemove
                                    : labelAdd
                                : undefined
                        }
                        style={[
                            styleButton.firstTypeButton,
                            stylesSearchFilter.buttonSearchFilter,
                        ]}
                        Icon={
                            isItemInSelected && inputValue.length > 0
                                ? IconRemove
                                : IconAdd
                        }
                        iconSize={ICON_SIZE}
                        onPress={handleAddRemove}
                    />
                </View>

                {dropdownVisible && filteredItems.length > 0 && (
                    <FlatList
                        contentContainerStyle={
                            stylesFilterPanel.contentFilterList
                        }
                        style={stylesFilterPanel.contentFilter}
                        data={filteredItems}
                        keyExtractor={item => `${item.id}-${item.name}`}
                        renderItem={({item}) => (
                            <ToggleButton
                                title={item.name}
                                isActive={selectedItems.some(
                                    i => i.id === item.id,
                                )}
                                callback={() => toggleItemActive(item, true)}
                            />
                        )}
                    />
                )}
            </View>
        );
    },
);
