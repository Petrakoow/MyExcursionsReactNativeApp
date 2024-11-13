import {StyleSheet, FlatList, View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {ScreenContent} from '@/shared/ui/screenContent';
import {fetchTours} from '@/shared/api/sputnik8';
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
import {useGetExcursionsByPageNumber} from '@/features/excursions';
import {FilterExcursionPanel} from '@/widgets/filterExcursionPanel';
export const ToursPageScreen = () => {
    const navigation = useNavigation<NavigationProp<NavigationStackList>>();
    const [selectedFilters, setSelectedFilters] = useState({
        countries: [],
        cities: [],
    });
    const flatListRef = useRef<FlatList>(null);

    const {
        isError,
        tours,
        hasMore,
        isFetching,
        isLoading,
        page,
        retryCount,
        getToursByPage,
        handleNextPage,
        handlePreviousPage,
    } = useGetExcursionsByPageNumber();``

    useEffect(() => {
        getToursByPage(page);
    }, [page]);

    const handleFiltersChange = (filters: {
        countries: {id: number; name: string}[];
        cities: {id: number; name: string}[];
    }) => {
        setSelectedFilters(filters);
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
                titleIndicator="We receive information about excursions..."
            />
        );
    }

    return (
        <ScreenContent>
            <FilterExcursionPanel onFiltersChange={handleFiltersChange} />
            {isError && <ErrorText title="Load Error" description={isError} />}
            <FlatList
                ref={flatListRef}
                data={tours}
                renderItem={renderTourCard}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                contentContainerStyle={styles.content}
            />
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
