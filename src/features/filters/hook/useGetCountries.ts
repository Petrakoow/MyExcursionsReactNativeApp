import {useState, useEffect} from 'react';
import {CountryTypeRequest, fetchCountries} from '@/shared/api/sputnik8';

export const useGetCountries = () => {
    const [countries, setCountries] = useState<CountryTypeRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCountries = async () => {
            try {
                const fetchedCountries = await fetchCountries();
                setCountries(fetchedCountries);
            } catch (err) {
                setError('Error fetching countries');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getCountries();
    }, []);

    return {countries, loading, error};
};
