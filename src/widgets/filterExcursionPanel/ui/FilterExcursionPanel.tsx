import {View, Modal} from 'react-native';
import React, {useState} from 'react';
import {ExcursionFilterType} from '@/features/excursions';
import {useFilters, useGetCities, useGetCountries} from '@/features/filters';
import {ErrorText} from '@/shared/ui/errorText';
import {CustomIndicator} from '@/shared/ui/customIndicator';
import {ToggleButtonGroup} from '@/shared/ui/toggleButton';
import {styles} from './FilterExcursionPanelStyle';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {TextSize, TextWeight} from '@/shared/config/font';
import {CustomText} from '@/shared/ui/customText';
import * as Icons from '@/shared/assets/icons';
import {SearchFilterComponent} from '@/shared/ui/filterPanel';
import {useExcursionFilters} from '../hook/useExcursionFilters';
import {useToggleFilters} from '../hook/useToggleFilters';

type FilterExcursionPanelProps = {
    animationType?: 'none' | 'fade' | 'slide';
    transparent?: boolean;
};

export const FilterExcursionPanel = (props: FilterExcursionPanelProps) => {
    const {transparent = true, animationType = 'fade'} = props;
    const {
        countries,
        loading: countriesLoading,
        error: countriesError,
    } = useGetCountries();
    const {cities, loading: citiesLoading, error: citiesError} = useGetCities();

    const {setSelectedFilters} = useFilters();

    const [modalVisible, setModalVisible] = useState(false);

    const handleFilterChange = (filters: ExcursionFilterType) => {
        setSelectedFilters(filters);
    };

    const {filters, setFilter} = useExcursionFilters(handleFilterChange);
    const {
        sortOrder,
        handleOrderSelectionChange,
        sortField,
        handleFieldSelectionChange,
    } = useToggleFilters(setFilter, filters);

    if (countriesLoading || citiesLoading) {
        return <CustomIndicator />;
    }
    if (countriesError || citiesError) {
        return (
            <ErrorText
                title="Error loading filters"
                description="Failed to load countries or cities."
            />
        );
    }

    return (
        <View>
            <CustomButton
                textButton="Открыть фильтры"
                textSize={TextSize.S_BASE}
                onPress={() => setModalVisible(true)}
                style={[styleButton.primaryTypeButton, styles.buttonPadding]}
            />
            <Modal
                animationType={animationType}
                transparent={transparent}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <CustomText
                            style={styles.titleWindow}
                            size={TextSize.S_XL}
                            weight={TextWeight.NORMAL}>
                            Фильтры для экскурсий
                        </CustomText>
                        <View style={styles.filterSearchContainer}>
                            <SearchFilterComponent
                                title="Город"
                                hasDropdownList
                                itemsList={cities}
                                selectedFilterItem={filters.city}
                                onSelectionChange={city =>
                                    setFilter('city', city)
                                }
                            />
                            <SearchFilterComponent
                                title="Страна"
                                hasDropdownList
                                itemsList={countries}
                                selectedFilterItem={filters.country}
                                onSelectionChange={country =>
                                    setFilter('country', country)
                                }
                            />
                        </View>
                        <View style={styles.toggleContainer}>
                            <ToggleButtonGroup
                                group="sortFields"
                                state={sortField}>
                                <ToggleButtonGroup.ToggleButtonContextWrapper
                                    name="product_id"
                                    Icon={Icons.Product}
                                    style={styles.toggleButton}
                                    onPress={() =>
                                        handleFieldSelectionChange('product_id')
                                    }
                                />
                                <ToggleButtonGroup.ToggleButtonContextWrapper
                                    name="rating"
                                    Icon={Icons.Rating}
                                    style={styles.toggleButton}
                                    onPress={() =>
                                        handleFieldSelectionChange('rating')
                                    }
                                />
                            </ToggleButtonGroup>
                            <ToggleButtonGroup
                                group="sortOrder"
                                state={sortOrder}>
                                <ToggleButtonGroup.ToggleButtonContextWrapper
                                    name="asc"
                                    Icon={Icons.Asc}
                                    style={styles.toggleButton}
                                    onPress={() =>
                                        handleOrderSelectionChange('asc')
                                    }
                                />
                                <ToggleButtonGroup.ToggleButtonContextWrapper
                                    name="desc"
                                    Icon={Icons.Desc}
                                    style={styles.toggleButton}
                                    onPress={() =>
                                        handleOrderSelectionChange('desc')
                                    }
                                />
                            </ToggleButtonGroup>
                        </View>
                        <CustomButton
                            textButton="Закрыть"
                            textSize={TextSize.S_BASE}
                            onPress={() => setModalVisible(false)}
                            style={[
                                styleButton.primaryTypeButton,
                                styles.buttonPadding,
                            ]}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};
