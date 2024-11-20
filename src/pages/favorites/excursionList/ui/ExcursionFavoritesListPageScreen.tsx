import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {PreviewExcursionCard} from '@/widgets/previewExcursionCard';
import {SplashScreen} from '@/shared/ui/splashScreen';
import {ErrorText} from '@/shared/ui/errorText';
import {ScreenContent} from '@/shared/ui/screenContent';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {CONTENT_PADDING_HORIZONTAL, CONTENT_PADDING_VERTICAL, GAP_BASE, moderateScale} from '@/shared/config/dimensions';
import { useFavoriteExcursions } from '../hook/useFavoriteExcursions';
import {NavigationStackList} from '@/shared/config/navigation';
import {AppNavigation} from '@/shared/config/navigation';
import {TextSize} from '@/shared/config/font';
import { TourTypeRequest } from '@/shared/api/sputnik8';

export const ExcursionFavoritesListPageScreen = () => {
    const navigation = useNavigation<NavigationProp<NavigationStackList>>();
    const {tours, isLoading, isError, clearFavorites} = useFavoriteExcursions();

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
                    onPress={clearFavorites}
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
