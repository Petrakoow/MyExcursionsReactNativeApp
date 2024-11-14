import {StyleSheet, View, Modal, Button, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FilterPanel } from '@/shared/ui/filterPanel';
import { ExcursionFilterType, FilterAscDesc, FilterByNameAndId, FilterByQualityProduct } from '@/features/excursions';
import { useGetCities, useGetCountries } from '@/features/filters';
import { ErrorText } from '@/shared/ui/errorText';
import { CustomIndicator } from '@/shared/ui/customIndicator';
import { ToggleButtonGroup } from '@/shared/ui/toggleButton';

type FilterExcursionPanelProps = {
  onFiltersChange: (filters: ExcursionFilterType) => void;
};

export const FilterExcursionPanel = (props: FilterExcursionPanelProps) => {
  const { onFiltersChange } = props;

  const [selectedCountry, setSelectedCountry] = useState<FilterByNameAndId>();
  const [selectedCity, setSelectedCity] = useState<FilterByNameAndId>();

  const [sortField, setSortField] = useState<FilterByQualityProduct>(undefined);
  const [sortOrder, setSortOrder] = useState<FilterAscDesc>(undefined);

  const [modalVisible, setModalVisible] = useState(false);

  const { countries, loading: countriesLoading, error: countriesError } = useGetCountries();
  const { cities, loading: citiesLoading, error: citiesError } = useGetCities();

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
      <Button title="Open Filters" onPress={() => setModalVisible(true)} />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Filter Options</Text>
            
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
                    setSortField(prev => (prev === 'product_id' ? undefined : 'product_id'))
                  }
                />
                <ToggleButtonGroup.ToggleButtonContextWrapper
                  name="rating"
                  title="Rating"
                  callback={() =>
                    setSortField(prev => (prev === 'rating' ? undefined : 'rating'))
                  }
                />
              </ToggleButtonGroup>
              <ToggleButtonGroup group="sortOrder">
                <ToggleButtonGroup.ToggleButtonContextWrapper
                  name="asc"
                  title="Ascending"
                  callback={() =>
                    setSortOrder(prev => (prev === 'asc' ? undefined : 'asc'))
                  }
                />
                <ToggleButtonGroup.ToggleButtonContextWrapper
                  name="desc"
                  title="Descending"
                  callback={() =>
                    setSortOrder(prev => (prev === 'desc' ? undefined : 'desc'))
                  }
                />
              </ToggleButtonGroup>
            </View>

            <Button title="Close Filters" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  toggleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

