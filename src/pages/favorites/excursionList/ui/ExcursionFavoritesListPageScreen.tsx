import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {database} from '@/shared/db';
import {FavoriteExcursion} from '@/shared/db/models';
import {fetchTourInfo, TourTypeRequest} from '@/shared/api/sputnik8';
import {PreviewExcursionCard} from '@/widgets/previewExcursionCard';
import {NavigationStackList} from '@/shared/config/navigation';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {AppNavigation} from '@/shared/config/navigation';
import {ErrorText} from '@/shared/ui/errorText';

export const ExcursionFavoritesListPageScreen = () => {
    const navigation = useNavigation<NavigationProp<NavigationStackList>>();
    const [favorites, setFavorites] = useState<FavoriteExcursion[]>([]);
    const [tours, setTours] = useState<TourTypeRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState<string | null>(null);
    useEffect(() => {
        const subscription = database
            .get<FavoriteExcursion>('favorite_excursions')
            .query()
            .observe()
            .subscribe(favoriteExcursions => {
                setFavorites(favoriteExcursions);
            });

        return () => subscription.unsubscribe();
    }, []);

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
                setIsError('Failed to fetch tour details.');
                setIsLoading(false);
            }
        };

        if (favorites.length > 0) {
            fetchTours();
        }
    }, [favorites]);

    const renderTourCard = ({item}: {item: TourTypeRequest}) => (
        <PreviewExcursionCard
            tour={item}
            onPress={() =>
                navigation.navigate(AppNavigation.EXCURSION_INFO, {
                    excursion: item,
                })
            }
        />
    );

    return (
        <View>
            {isError && <ErrorText title="Error load" description={isError} />}
            <FlatList
                data={tours}
                renderItem={renderTourCard}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                contentContainerStyle={{padding: 16}}
            />
        </View>
    );
};
