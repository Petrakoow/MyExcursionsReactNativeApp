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
    const [userId, setUserId] = useState<string | undefined>(undefined);

    const realm = useDatabase();

    useEffect(() => {
        setUserId(getUserSession()?.userId)
    }, []);

    useEffect(() => {
        if (!userId) return;

        const favoriteExcursions = realm.objects<FavoriteExcursion>(
            FavoriteExcursion.schema.name,
        );

        const handleChange = () => {
            const updatedFavorites = getAllFavoriteExcursions(realm, userId);
            setFavorites(updatedFavorites);
        };

        favoriteExcursions.addListener(handleChange);

        return () => {
            favoriteExcursions.removeListener(handleChange);
        };
    }, [realm, userId]);

    useEffect(() => {
        const fetchTours = async () => {
            setIsLoading(true);

            try {
                if (favorites.length > 0) {
                    const tourData = await Promise.all(
                        favorites.map(async favorite => {
                            const tourInfo = await fetchTourInfo(
                                favorite.excursionId,
                            );
                            return tourInfo;
                        }),
                    );
                    setTours(tourData);
                } else {
                    setTours([]);
                }
            } catch (error) {
                setIsError('Не удалось загрузить экскурсии.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchTours();
    }, [favorites]);

    // убрать отсюда (вынести в отдельный виджет)
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
