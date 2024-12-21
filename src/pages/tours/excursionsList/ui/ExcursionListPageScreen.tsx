import {FlatList, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {ScreenContent} from '@/shared/ui/screenContent';
import {SplashScreen} from '@/shared/ui/splashScreen';
import {useNavigation} from '@react-navigation/native';
import {
    PlaceholderExcursionCard,
    PreviewExcursionCard,
} from '@/widgets/previewExcursionCard';
import {AppNavigation} from '@/shared/config/navigation/types';
import {NavigationProp} from '@react-navigation/native';
import {NavigationStackList} from '@/shared/config/navigation/types';
import {TourTypeRequest} from '@/shared/api';
import {styles} from './ExcursionListPageScreenStyle';
import {PaginationPanel} from '@/widgets/paginationPanel';
import {FilterExcursionPanel} from '@/widgets/filterExcursionPanel';
import {useFilters} from '@/provider';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {TextSize} from '@/shared/config/font';

export const ToursPageScreen = () => {
    const navigation = useNavigation<NavigationProp<NavigationStackList>>();

    const flatListRef = useRef<FlatList>(null);

    const {
        isLoading,
        tours,
        page,
        isFetching,
        isError,
        hasMore,
        handleNextPage,
        handlePreviousPage,
        getToursByPageContext,
        reloadFilters,
    } = useFilters();

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

    useEffect(() => {
        getToursByPageContext();
    }, []);

    if (isLoading) {
        return (
            <SplashScreen
                showLogotype={false}
                titleIndicator="Получаем информацию об экскурсиях..."
            />
        );
    }

    return (
        <ScreenContent>
            <View style={styles.content}>
                <FilterExcursionPanel />
                {isError ? (
                    <View style={styles.errorContainer}>
                        <PlaceholderExcursionCard />
                        <CustomButton
                            textButton="Повторить загрузку"
                            onPress={reloadFilters}
                            textSize={TextSize.S_BASE}
                            style={[
                                styleButton.primaryTypeButton,
                                styles.buttonRepeatLoad,
                            ]}
                        />
                    </View>
                ) : (
                    <FlatList
                        ref={flatListRef}
                        data={tours}
                        renderItem={renderTourCard}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                    />
                )}
            </View>
            {!isError && (
                <View style={[styles.content, styles.pagination]}>
                    <PaginationPanel
                        page={page}
                        fetching={isFetching}
                        hasMore={hasMore}
                        callbackPrevious={() => {
                            handlePreviousPage();
                            flatListRef.current?.scrollToOffset({
                                offset: 0,
                                animated: true,
                            });
                        }}
                        callbackNext={() => {
                            handleNextPage();
                            flatListRef.current?.scrollToOffset({
                                offset: 0,
                                animated: true,
                            });
                        }}
                    />
                </View>
            )}
        </ScreenContent>
    );
};
