import {useState, useEffect, useCallback} from 'react';
import {CityTypeRequest} from '@/shared/api';
import {fetchCities} from '@/entities/api';

export const useGetCities = () => {
    const [cities, setCities] = useState<CityTypeRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getCities = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedCities = await fetchCities();
            setCities(fetchedCities);
        } catch (err) {
            setError('Error fetching cities');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getCities();
    }, [getCities]);

    return {cities, loading, error, refetch: getCities};
};
