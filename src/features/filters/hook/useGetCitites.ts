import {useState, useEffect} from 'react';
import {CityTypeRequest, fetchCities} from '@/shared/api/sputnik8';

export const useGetCities = () => {
    const [cities, setCities] = useState<CityTypeRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCities = async () => {
            try {
                const fetchedCities = await fetchCities();
                setCities(fetchedCities);
            } catch (error) {
                setError('Error fetching cities');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getCities();
    }, []);

    return {cities, loading, error};
};
