import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {FavoriteExcursion} from '@/shared/db/models';
import {fetchTourInfo, TourTypeRequest} from '@/shared/api/sputnik8';
import {PreviewExcursionCard} from '@/widgets/previewExcursionCard';
import {NavigationStackList} from '@/shared/config/navigation';
import {SplashScreen} from '@/shared/ui/splashScreen';
import {ErrorText} from '@/shared/ui/errorText';
import {ScreenContent} from '@/shared/ui/screenContent';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {CONTENT_PADDING_HORIZONTAL, CONTENT_PADDING_VERTICAL, GAP_BASE, moderateScale} from '@/shared/config/dimensions';
import {useDatabase} from '@/app/providers';
import {getUserSession} from '@/shared/db/models/user';
import { deleteAllFavoriteExcursions, getAllFavoriteExcursions } from '@/entities/excursion';
import {AppNavigation} from '@/shared/config/navigation';
import { TextSize } from '@/shared/config/font';

export const ExcursionFavoritesListPageScreen = () => {
    const navigation = useNavigation<NavigationProp<NavigationStackList>>();
    const [favorites, setFavorites] = useState<FavoriteExcursion[]>([]);
    const [tours, setTours] = useState<TourTypeRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState<string | null>(null);

    const realm = useDatabase();
    const [userId, setUserId] = useState<string | null>(null);

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

        const favoriteExcursions = realm.objects<FavoriteExcursion>('FavoriteExcursion');
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
                        const tourInfo = await fetchTourInfo(favorite.excursionId);
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
        }
    }, [favorites]);

    const handleClearFavorites = () => {
        if (userId) {
            deleteAllFavoriteExcursions(realm, userId);
            setFavorites([]);
            setTours([]);
        }
    };

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

    if (isLoading) {
        return (
            <SplashScreen
                showLogotype={false}
                titleIndicator="Загружаем избранное..."
            />
        );
    }

    return (
        <ScreenContent>
            <View style={styles.content}>
                {isError && (
                    <ErrorText title="Ошибка загрузки" description={isError} />
                )}
                <CustomButton
                    textButton={'Удалить всё избранное'}
                    style={[styleButton.firstTypeButton, styles.buttonPadding]}
                    onPress={handleClearFavorites}
                    textSize={TextSize.S_BASE}
                />
                <FlatList
                    data={tours}
                    renderItem={renderTourCard}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                />
            </View>
        </ScreenContent>
    );
};

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: CONTENT_PADDING_HORIZONTAL,
        paddingVertical: CONTENT_PADDING_VERTICAL,
        gap: GAP_BASE,
    },
    buttonPadding: {
        padding: moderateScale(4),
    },
});
