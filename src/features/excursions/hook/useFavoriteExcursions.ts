import {useEffect, useState} from 'react';
import {fetchTourInfo, TourTypeRequest} from '@/shared/api/sputnik8';
import {useDatabase} from '@/app/providers';
import {getUserSession} from '@/shared/db/models/user';
import {
    deleteAllFavoriteExcursions,
    getAllFavoriteExcursions,
} from '@/entities/excursion';
import {FavoriteExcursion} from '@/shared/db/models';

export const useFavoriteExcursions = () => {
    const [favorites, setFavorites] = useState<FavoriteExcursion[]>([]);
    const [tours, setTours] = useState<TourTypeRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    const realm = useDatabase();

    useEffect(() => {
        const fetchUserId = async () => {
            const session = await getUserSession();
            setUserId(session?.userId ?? null);
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        if (!userId) return;

        const fetchFavorites = () => {
            const userFavorites = getAllFavoriteExcursions(realm, userId);
            setFavorites(userFavorites);
        };

        fetchFavorites();

        const favoriteExcursions =
            realm.objects<FavoriteExcursion>('FavoriteExcursion');
        const handleChange = () => fetchFavorites();

        favoriteExcursions.addListener(handleChange);

        return () => favoriteExcursions.removeListener(handleChange);
    }, [realm, userId]);

    useEffect(() => {
        const fetchTours = async () => {
            setIsLoading(true);
            try {
                const tourData = await Promise.all(
                    favorites.map(async favorite => {
                        const tourInfo = await fetchTourInfo(
                            favorite.excursionId,
                        );
                        return tourInfo;
                    }),
                );
                setTours(tourData);
                setIsLoading(false);
            } catch (error) {
                setIsError('Не удалось загрузить экскурсии.');
                setIsLoading(false);
            }
        };

        if (favorites.length > 0) {
            fetchTours();
        } else {
            setTours([]);
        }
    }, [favorites]);

    const clearFavorites = () => {
        if (userId) {
            deleteAllFavoriteExcursions(realm, userId);
            setFavorites([]);
            setTours([]);
        }
    };

    return {
        favorites,
        tours,
        isLoading,
        isError,
        clearFavorites,
    };
};
