import {FlatList, View} from 'react-native';
import React from 'react';
import {CustomText} from '@/shared/ui/customText';
import {CustomInput} from '@/shared/ui/customInput';
import {stylesSearchFilter, stylesFilterPanel} from './SearchFilterPanelStyle';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {SvgProps} from 'react-native-svg';
import * as Icons from '@/shared/assets/icons';
import {moderateScale} from 'react-native-size-matters';
import {ToggleButton} from '../../toggleButton';
import {FilterItem} from '@/features/excursions';
import {useDropdownFilter} from '../hook/useDropdownFilter';
import { palette } from '@/shared/config/colors';

type SearchFilterComponentType<T = {}> = {
    title?: string;
    labelAdd?: string;
    labelRemove?: string;
    IconLabelDropdownList?: React.FC<SvgProps>;
    IconAdd?: React.FC<SvgProps>;
    IconRemove?: React.FC<SvgProps>;
    hasDropdownList?: boolean;
    itemsList: FilterItem[];
    selectedFilterItem: FilterItem<T>;
    onSelectionChange: (selectedItem: FilterItem<T>) => void;
};

const ICON_SIZE = moderateScale(20);

export const SearchFilterComponent = (props: SearchFilterComponentType) => {
    const {
        title,
        labelAdd,
        labelRemove,
        hasDropdownList,
        IconLabelDropdownList = Icons.DropdownAction,
        IconAdd = Icons.AddFilterAction,
        IconRemove = Icons.DeleteFilterAction,
        itemsList = [],
        selectedFilterItem,
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
    } = useDropdownFilter(itemsList, selectedFilterItem, onSelectionChange);

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
                {
                    <CustomButton
                        textButton={isItemInSelected ? labelRemove : labelAdd}
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
                }
            </View>

            {selectedItem && (
                <View style={stylesSearchFilter.containerSelectedItem}>
                    <ToggleButton
                        title={selectedItem.name}
                        isActive={true}
                        onPress={() => toggleItemActive(selectedItem)}
                        activeColor={palette.light.primary}
                    />
                </View>
            )}

            {dropdownVisible && filteredItems.length > 0 && (
                <FlatList
                    contentContainerStyle={stylesFilterPanel.contentFilterList}
                    style={stylesFilterPanel.contentFilter}
                    data={filteredItems}
                    keyExtractor={item => `${item?.id}-${item?.name}`}
                    renderItem={({item}) => (
                        <ToggleButton
                            title={item?.name}
                            isActive={selectedItem?.id === item?.id}
                            onPress={() => toggleItemActive(item)}
                        />
                    )}
                />
            )}
        </View>
    );
};
