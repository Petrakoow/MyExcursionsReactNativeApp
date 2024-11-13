import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FilterPanel, SearchFilterComponent} from '@/shared/ui/filterPanel';
import {moderateScale} from 'react-native-size-matters';
import {CountryTypeRequest, fetchCities, fetchCountries} from '@/shared/api/sputnik8';

type FilterExcursionPanelProps = {
    onFiltersChange: (filters: { countries: { id: number; name: string }[]; cities: { id: number; name: string }[] }) => void;
};

export const FilterExcursionPanel = (props: FilterExcursionPanelProps) => {
    const {onFiltersChange} = props;
    const [countries, setCountries] = useState<{ id: number; name: string }[]>([]);
    const [cities, setCities] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        const getCountries = async () => {
            try {
                const fetchedCountries = await fetchCountries();
                const countryData = fetchedCountries.map(country => ({
                    id: country.id,
                    name: country.name,
                }));
                setCountries(countryData);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        const getCities = async () => {
            try {
                const fetchedCities = await fetchCities();
                const cityData = fetchedCities.map(city => ({
                    id: city.id,
                    name: city.name,
                }));
                setCities(cityData);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        getCountries();
        getCities();
    }, []);

    return (
        <View>
            <FilterPanel>
                <SearchFilterComponent
                    title="Поиск по городу"
                    hasDropdownList={true}
                    itemsList={cities}
                    onSelectionChange={(selectedCities) => onFiltersChange({ countries, cities: selectedCities })}
                />
                <SearchFilterComponent
                    title="Поиск по стране"
                    hasDropdownList={true}
                    itemsList={countries}
                    onSelectionChange={(selectedCountries) => onFiltersChange({ countries: selectedCountries, cities })}
                />
            </FilterPanel>
        </View>
    );
};

const styles = StyleSheet.create({});
