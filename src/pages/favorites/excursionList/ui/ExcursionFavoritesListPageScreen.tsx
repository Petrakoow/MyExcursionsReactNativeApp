import React from 'react';
import {FlatList, View} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {PreviewExcursionCard} from '@/widgets/previewExcursionCard';
import {SplashScreen} from '@/shared/ui/splashScreen';
import {ErrorText} from '@/shared/ui/errorText';
import {ScreenContent} from '@/shared/ui/screenContent';

import {NavigationStackList} from '@/shared/config/navigation';
import {AppNavigation} from '@/shared/config/navigation';
import {TourTypeRequest} from '@/shared/api';
import {styles} from './ExcursionFavoritesListPageScreenStyle';
import {ExcursionNotFoundCard} from './ExcursionNotFoundCard';
import {useFavoriteExcursions} from '@/features/excursions';

export const ExcursionFavoritesListPageScreen = () => {
    const navigation = useNavigation<NavigationProp<NavigationStackList>>();
    const {tours, isLoading, isError} = useFavoriteExcursions();

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

    if (tours.length <= 0) {
        return <ExcursionNotFoundCard />;
    }

    return (
        <ScreenContent>
            <View style={styles.content}>
                {isError && (
                    <ErrorText title="Ошибка загрузки" description={isError} />
                )}
                <FlatList
                    data={tours}
                    renderItem={renderTourCard}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                />
            </View>
        </ScreenContent>
    );
};
