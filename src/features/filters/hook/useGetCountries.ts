import {useState, useEffect, useCallback} from 'react';
import {CountryTypeRequest} from '@/shared/api';
import {fetchCountries} from '@/entities/api';

export const useGetCountries = () => {
    const [countries, setCountries] = useState<CountryTypeRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getCountries = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedCountries = await fetchCountries();
            setCountries(fetchedCountries);
        } catch (err) {
            setError('Error fetching countries');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getCountries();
    }, [getCountries]);

    return {countries, loading, error, refetch: getCountries};
};
