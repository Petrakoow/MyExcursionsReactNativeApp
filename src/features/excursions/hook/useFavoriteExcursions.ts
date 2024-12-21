import {useEffect, useState} from 'react';
import {TourTypeRequest} from '@/shared/api';
import {useDatabase} from '@/provider';
import {getUserSession} from '@/shared/db/models/user';
import {getAllFavoriteExcursions} from '@/entities/excursion';
import {FavoriteExcursion} from '@/shared/db/models';
import {fetchTourInfo} from '@/entities/api';

export const useFavoriteExcursions = () => {
    const [favorites, setFavorites] = useState<FavoriteExcursion[]>([]);
    const [tours, setTours] = useState<TourTypeRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState<string | null>(null);

    const realm = useDatabase();

    useEffect(() => {
        const userId = getUserSession()?.userId;

        if (!userId) {
            return;
        }

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
    }, [realm]);

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

    return {
        favorites,
        tours,
        isLoading,
        isError,
    };
};
