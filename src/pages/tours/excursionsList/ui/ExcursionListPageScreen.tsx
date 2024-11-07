import {StyleSheet, FlatList, View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {ScreenContent} from '@/shared/ui/screenContent';
import {getAllTours} from '@/shared/api/sputnik8';
import {SplashScreen} from '@/shared/ui/splashScreen';
import {useNavigation} from '@react-navigation/native';
import {PreviewExcursionCard} from '@/widgets/previewExcursionCard';
import {AppNavigation} from '@/shared/config/navigation/types';
import {NavigationProp} from '@react-navigation/native';
import {NavigationStackList} from '@/shared/config/navigation/types';
import {TourTypeRequest} from '@/shared/api/sputnik8';

import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {TextSize, TextWeight} from '@/shared/config/font';
import {CustomText} from '@/shared/ui/customText';
import {styles} from './ExcursionListPageScreenStyle';

export const ToursPageScreen = () => {
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [isFirstLoading, setFirstLoading] = useState(true);
    const [tours, setTours] = useState<TourTypeRequest[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigation = useNavigation<NavigationProp<NavigationStackList>>();
    const flatListRef = useRef<FlatList>(null);

    const fetchTours = async (page: number) => {
        setLoading(true);
        try {
            const toursData = await getAllTours('ru', page);
            setTours(toursData);
            setHasMore(toursData.length > 0);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchTours(page);
    }, [page]);

    const handleLoadNextPage = useCallback(() => {
        if (!loading && hasMore && !isFetching) {
            setIsFetching(true);
            setPage(prevPage => prevPage + 1);
            flatListRef.current?.scrollToOffset({offset: 0, animated: true});
            setFirstLoading(false);
        }
    }, [loading, hasMore, isFetching]);

    const handleLoadPreviousPage = useCallback(() => {
        if (page > 1 && !isFetching) {
            setIsFetching(true);
            setPage(prevPage => prevPage - 1);
            flatListRef.current?.scrollToOffset({offset: 0, animated: true});
        }
    }, [page, isFetching]);

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

    if (loading && isFirstLoading) {
        return (
            <SplashScreen
                showLogotype={false}
                titleIndicator="We receive information about excursions..."
            />
        );
    }

    return (
        <ScreenContent
            contentStyle={styles.screenContainer}
            scrollActivation={false}>
            <FlatList
                ref={flatListRef}
                data={tours}
                renderItem={renderTourCard}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                contentContainerStyle={styles.flatList}
            />
            <View style={styles.pagination}>
                <CustomButton
                    style={[styleButton.firstTypeButton, styles.pageButton]}
                    onPress={handleLoadPreviousPage}
                    disabled={page === 1 || loading || isFetching}
                    textButton="Назад"
                    textSize={TextSize.S_BASE}
                />
                <CustomText
                    size={TextSize.S_BASE}
                    weight={TextWeight.LIGHT}>{`Стр. ${page}`}</CustomText>
                <CustomButton
                    style={[styleButton.firstTypeButton, styles.pageButton]}
                    onPress={handleLoadNextPage}
                    disabled={!hasMore || loading || isFetching}
                    textButton="Далее"
                    textSize={TextSize.S_BASE}
                />
            </View>
        </ScreenContent>
    );
};
