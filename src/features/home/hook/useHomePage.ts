import {useState, useEffect} from 'react';
import {fetchCategories, fetchCities} from '@/entities/api';
import {CategoryType, CityTypeRequest} from '@/shared/api';
import {FilterItem} from '@/features/excursions';

export const useHomePage = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [cities, setCities] = useState<CityTypeRequest[]>([]);
    const [selectedCity, setSelectedCity] =
        useState<FilterItem<CityTypeRequest>>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const citiesData = await fetchCities();
                setCities(citiesData);
                if (citiesData.length > 0) {
                    await fetchAndSetCategories(1);
                }
            } catch (err) {
                setError(
                    'Ошибка при загрузке категорий (во время инициализации)',
                );
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadInitialData();
    }, []);

    const fetchAndSetCategories = async (cityId: number) => {
        try {
            setLoading(true);
            const categoriesData = await fetchCategories(cityId);
            setCategories(categoriesData);
        } catch (err) {
            setError('Ошибка при загрузке категорий');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCityChange = (
        selectedCityItem: FilterItem<CityTypeRequest>,
    ) => {
        if (selectedCityItem?.id !== selectedCity?.id) {
            setSelectedCity(selectedCityItem);
            if (selectedCityItem) {
                fetchAndSetCategories(selectedCityItem.id as number);
            } else {
                fetchAndSetCategories(1);
            }
        }
    };

    return {
        categories,
        cities,
        selectedCity,
        setSelectedCity,
        loading,
        error,
        handleCityChange,
    };
};
