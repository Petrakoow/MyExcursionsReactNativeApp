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
import {FilterItem} from '@/features/excursions';
import {useDropdownFilter} from '../hook/useDropdownFilter';

type FilterPanelType = {
    children: ReactNode;
};

export const FilterPanel = ({children}: FilterPanelType) => {
    return <View style={stylesFilterPanel.container}>{children}</View>;
};

type SearchFilterComponentType<T = {}> = {
    title?: string;
    labelAdd?: string;
    labelRemove?: string;
    IconLabelDropdownList?: React.FC<SvgProps>;
    IconAdd?: React.FC<SvgProps>;
    IconRemove?: React.FC<SvgProps>;
    hasLabelAddRemove?: boolean;
    hasDropdownList?: boolean;
    itemsList: FilterItem[];
    onSelectionChange: (
        selectedItem: FilterItem<T>,
    ) => void;
};

const ICON_SIZE = moderateScale(20);

FilterPanel.SearchFilterComponent = React.memo(
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
            onSelectionChange,
        } = props;

        const {
            inputValue,
            dropdownVisible,
            isItemInSelected,
            selectedItem,
            filteredItems,
            toggleItemActive,
            handleAddRemove,
            setDropdownVisible,
            setInputValue,
        } = useDropdownFilter(itemsList, onSelectionChange);

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

                {selectedItem && (
                    <View>
                        <ToggleButton
                            title={selectedItem.name}
                            isActive={true}
                            callback={() => toggleItemActive(selectedItem)}
                        />
                    </View>
                )}

                {dropdownVisible && filteredItems.length > 0 && (
                    <FlatList
                        contentContainerStyle={
                            stylesFilterPanel.contentFilterList
                        }
                        style={stylesFilterPanel.contentFilter}
                        data={filteredItems}
                        keyExtractor={item => `${item?.id}-${item?.name}`}
                        renderItem={({item}) => (
                            <ToggleButton
                                title={item?.name}
                                isActive={selectedItem?.id === item?.id}
                                callback={() => toggleItemActive(item)}
                            />
                        )}
                    />
                )}
            </View>
        );
    },
);
