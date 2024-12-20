import {FlatList, View} from 'react-native';
import React, {useRef} from 'react';
import {ScreenContent} from '@/shared/ui/screenContent';
import {SplashScreen} from '@/shared/ui/splashScreen';
import {useNavigation} from '@react-navigation/native';
import {PreviewExcursionCard} from '@/widgets/previewExcursionCard';
import {AppNavigation} from '@/shared/config/navigation/types';
import {NavigationProp} from '@react-navigation/native';
import {NavigationStackList} from '@/shared/config/navigation/types';
import {TourTypeRequest} from '@/shared/api/sputnik8';

import {styles} from './ExcursionListPageScreenStyle';
import {ErrorText} from '@/shared/ui/errorText';
import {PaginationPanel} from '@/widgets/paginationPanel';
import {FilterExcursionPanel} from '@/widgets/filterExcursionPanel';
import {useFilters} from '@/features/filters';

// переделать позже сохранение через провайдер

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
                <View>
                    <FilterExcursionPanel />
                </View>
                {isError && (
                    <ErrorText title="Load Error" description={isError} />
                )}
                <FlatList
                    ref={flatListRef}
                    data={tours}
                    renderItem={renderTourCard}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                />
            </View>
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
        </ScreenContent>
    );
};
