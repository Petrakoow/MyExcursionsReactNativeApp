import {StyleSheet, FlatList, View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
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
import {
    ExcursionFilterType,
    useGetExcursionsByPageNumber,
} from '@/features/excursions';
import {FilterExcursionPanel} from '@/widgets/filterExcursionPanel';
import {PAGE_LIMIT} from '@/shared/config/constants';

const PAGE_LANGUAGE = 'ru';

export const ToursPageScreen = () => {
    const navigation = useNavigation<NavigationProp<NavigationStackList>>();

    const [selectedFilters, setSelectedFilters] = useState<
        ExcursionFilterType | undefined
    >(undefined);

    const flatListRef = useRef<FlatList>(null);

    const {
        isError,
        tours,
        hasMore,
        isFetching,
        isLoading,
        page,
        getToursByPage,
        handleNextPage,
        handlePreviousPage,
        setPage,
    } = useGetExcursionsByPageNumber();

    useEffect(() => {
        setPage(page => (page = 1));
    }, [selectedFilters]);

    useEffect(() => {
        getToursByPage({
            language: PAGE_LANGUAGE,
            limit: PAGE_LIMIT,
            filters: selectedFilters,
        });
    }, [page, selectedFilters]);

    console.log(selectedFilters);

    const handleFiltersChange = (props: ExcursionFilterType) => {
        setSelectedFilters(props);
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
            <View style={styles.content}>
                <View>
                    <FilterExcursionPanel
                        onFiltersChange={handleFiltersChange}
                    />
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
