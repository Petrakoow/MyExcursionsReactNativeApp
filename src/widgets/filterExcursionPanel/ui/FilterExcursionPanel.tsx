import {View, Modal} from 'react-native';
import React from 'react';
import {ExcursionFilterType} from '@/features/excursions';
import {useGetCities, useGetCountries} from '@/features/filters';
import {ErrorText} from '@/shared/ui/errorText';
import {CustomIndicator} from '@/shared/ui/customIndicator';
import {ToggleButtonGroup} from '@/shared/ui/toggleButton';
import {styles} from './FilterExcursionPanelStyle';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {TextSize, TextWeight} from '@/shared/config/font';
import {CustomText} from '@/shared/ui/customText';
import * as Icons from '@/shared/assets/icons';
import {SearchFilterComponent} from '@/shared/ui/filterPanel';
import {useFilterExcursionPanel} from '../hook/useFilterExcursionPanel';

type FilterExcursionPanelProps = {
    onFiltersChange: (filters: ExcursionFilterType) => void;
};

export const FilterExcursionPanel = (props: FilterExcursionPanelProps) => {
    const {onFiltersChange} = props;

    const {
        countries,
        loading: countriesLoading,
        error: countriesError,
    } = useGetCountries();
    const {cities, loading: citiesLoading, error: citiesError} = useGetCities();

    const {
        selectedCountry,
        setSelectedCountry,
        selectedCity,
        setSelectedCity,
        sortField,
        sortOrder,
        modalVisible,
        toggleModal,
        handleOrderSelectionChange,
        handleFieldSelectionChange,
    } = useFilterExcursionPanel(onFiltersChange);

    if (countriesLoading || citiesLoading) {
        return <CustomIndicator />;
    }

    if (countriesError || citiesError) {
        return (
            <ErrorText
                title="Error loading filters"
                description="Failed to load filters or cities that were applied"
            />
        );
    }

    return (
        <View>
            <CustomButton
                textButton="Открыть фильтры"
                textSize={TextSize.S_BASE}
                onPress={toggleModal}
                style={[styleButton.primaryTypeButton, styles.buttonPadding]}
            />

            <Modal
                animationType="fade"
                transparent={modalVisible}
                visible={modalVisible}
                onRequestClose={toggleModal}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <CustomText
                            style={styles.titleWindow}
                            size={TextSize.S_XL}
                            weight={TextWeight.NORMAL}>
                            Опции для фильтрации
                        </CustomText>

                        <View style={styles.filterSearchContainer}>
                            <SearchFilterComponent
                                title="Поиск по городу"
                                hasDropdownList={true}
                                itemsList={cities}
                                selectedFilterItem={selectedCity}
                                onSelectionChange={newCity =>
                                    setSelectedCity(newCity)
                                }
                            />
                            <SearchFilterComponent
                                title="Поиск по стране"
                                hasDropdownList={true}
                                itemsList={countries}
                                selectedFilterItem={selectedCountry}
                                onSelectionChange={newCountry =>
                                    setSelectedCountry(newCountry)
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
                            onPress={toggleModal}
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
