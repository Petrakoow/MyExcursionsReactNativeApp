import {StyleSheet, View, Modal, Button, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FilterPanel} from '@/shared/ui/filterPanel';
import {
    ExcursionFilterType,
    FilterAscDesc,
    FilterByNameAndId,
    FilterByQualityProduct,
} from '@/features/excursions';
import {useGetCities, useGetCountries} from '@/features/filters';
import {ErrorText} from '@/shared/ui/errorText';
import {CustomIndicator} from '@/shared/ui/customIndicator';
import {ToggleButtonGroup} from '@/shared/ui/toggleButton';
import {
    CONTENT_PADDING_HORIZONTAL,
    CONTENT_PADDING_VERTICAL,
    CONTENT_RADIUS,
    moderateScale,
} from '@/shared/config/dimensions';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {TextSize, TextWeight} from '@/shared/config/font';
import {CustomText} from '@/shared/ui/customText';
import {Colors} from '@/shared/config/colors';

type FilterExcursionPanelProps = {
    onFiltersChange: (filters: ExcursionFilterType) => void;
};

export const FilterExcursionPanel = (props: FilterExcursionPanelProps) => {
    const {onFiltersChange} = props;

    const [selectedCountry, setSelectedCountry] = useState<FilterByNameAndId>();
    const [selectedCity, setSelectedCity] = useState<FilterByNameAndId>();

    const [sortField, setSortField] =
        useState<FilterByQualityProduct>(undefined);
    const [sortOrder, setSortOrder] = useState<FilterAscDesc>(undefined);

    const [modalVisible, setModalVisible] = useState(false);

    const {
        countries,
        loading: countriesLoading,
        error: countriesError,
    } = useGetCountries();
    const {cities, loading: citiesLoading, error: citiesError} = useGetCities();

    useEffect(() => {
        onFiltersChange({
            country: selectedCountry,
            city: selectedCity,
            product: sortField,
            ascDesc: sortOrder,
        });
    }, [selectedCountry, selectedCity, sortField, sortOrder]);

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
                onPress={() => setModalVisible(true)}
                style={[styleButton.firstTypeButton, {paddingVertical: 4}]}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <CustomText
                            size={TextSize.S_XL}
                            weight={TextWeight.BOLD}>
                            Filter Options
                        </CustomText>

                        <FilterPanel>
                            <FilterPanel.SearchFilterComponent
                                title="Поиск по городу"
                                hasDropdownList={true}
                                itemsList={cities}
                                onSelectionChange={setSelectedCity}
                            />
                            <FilterPanel.SearchFilterComponent
                                title="Поиск по стране"
                                hasDropdownList={true}
                                itemsList={countries}
                                onSelectionChange={setSelectedCountry}
                            />
                        </FilterPanel>

                        <View style={styles.toggleContainer}>
                            <ToggleButtonGroup group="sortFields">
                                <ToggleButtonGroup.ToggleButtonContextWrapper
                                    name="product_id"
                                    title="Product ID"
                                    callback={() =>
                                        setSortField(prev =>
                                            prev === 'product_id'
                                                ? undefined
                                                : 'product_id',
                                        )
                                    }
                                />
                                <ToggleButtonGroup.ToggleButtonContextWrapper
                                    name="rating"
                                    title="Rating"
                                    callback={() =>
                                        setSortField(prev =>
                                            prev === 'rating'
                                                ? undefined
                                                : 'rating',
                                        )
                                    }
                                />
                            </ToggleButtonGroup>
                            <ToggleButtonGroup group="sortOrder">
                                <ToggleButtonGroup.ToggleButtonContextWrapper
                                    name="asc"
                                    title="Ascending"
                                    callback={() =>
                                        setSortOrder(prev =>
                                            prev === 'asc' ? undefined : 'asc',
                                        )
                                    }
                                />
                                <ToggleButtonGroup.ToggleButtonContextWrapper
                                    name="desc"
                                    title="Descending"
                                    callback={() =>
                                        setSortOrder(prev =>
                                            prev === 'desc'
                                                ? undefined
                                                : 'desc',
                                        )
                                    }
                                />
                            </ToggleButtonGroup>
                        </View>

                        <CustomButton
                            textButton="Закрыть"
                            textSize={TextSize.S_BASE}
                            onPress={() => setModalVisible(false)}
                            style={[
                                styleButton.firstTypeButton,
                                {paddingHorizontal: 10, paddingVertical: 5},
                            ]}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL - 5,
        paddingVertical: CONTENT_PADDING_VERTICAL - 10,
        backgroundColor: 'white',
        borderRadius: CONTENT_RADIUS - 15,
        gap: moderateScale(10),
        alignItems: 'center',
    },
    toggleContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
