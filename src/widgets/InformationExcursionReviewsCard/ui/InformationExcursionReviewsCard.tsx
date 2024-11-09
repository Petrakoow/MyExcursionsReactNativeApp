import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, FlatList, ScrollView} from 'react-native';
import {fetchTourReview, TourReviewTypeRequest} from '@/shared/api/sputnik8';
import {CustomText} from '@/shared/ui/customText';
import {TextSize, TextWeight} from '@/shared/config/font';
import {SplashScreen} from '@/shared/ui/splashScreen';
import {ReviewExcursionCard} from '@/widgets/reviewExcursionCard';
import {styles} from './InformationExcursionReviewsCardStyle';
import {PaginationPanel} from '@/widgets/paginationPanel';
import {useGetReviewsByTokenString} from '@/features/excursions';

type InformationReviewsType = {
    uid: number;
    customers_review_rating: number;
    reviews: number;
    reviews_with_text: number;
};

export const InformationExcursionReviewsCard = (
    props: InformationReviewsType,
) => {
    const {customers_review_rating, reviews, reviews_with_text, uid} = props;
    const flatListRef = useRef<FlatList>(null);

    const {
        hasMore,
        isFetching,
        isLoading,
        reviewsList,
        currentToken,
        page,
        getToursByExcursionId,
        handleNextPage,
        handlePreviousPage,
    } = useGetReviewsByTokenString();

    useEffect(() => {
        getToursByExcursionId(currentToken, uid);
    }, [currentToken]);

    if (isLoading) {
        return (
            <SplashScreen
                showLogotype={false}
                titleIndicator="Loading reviews..."
            />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentHeader}>
                <CustomText
                    weight={TextWeight.BOLD}
                    size={TextSize.S_4XL}
                    style={styles.header}>
                    Отзывы
                </CustomText>
                <CustomText size={TextSize.S_XL} style={styles.ratingTitle}>
                    Средняя оценка:{' '}
                    <CustomText
                        weight={TextWeight.BOLD}
                        size={TextSize.S_XL}
                        style={styles.rating}>
                        {customers_review_rating.toFixed(1)} / 5
                    </CustomText>
                </CustomText>
                <CustomText size={TextSize.S_XL} style={styles.summary}>
                    Всего отзывов: {reviews} ({reviews_with_text} с текстом)
                </CustomText>
            </View>

            <View style={styles.contentReview}>
                {reviewsList.length > 0 ? (
                    <FlatList
                        ref={flatListRef}
                        data={reviewsList}
                        renderItem={ReviewExcursionCard}
                        keyExtractor={(item, index) => `${item.date}-${index}`}
                        style={styles.contentBottom}
                    />
                ) : (
                    <CustomText
                        size={TextSize.S_LG}
                        style={[styles.noReviewsText, styles.contentBottom]}>
                        Нет отзывов с текстом
                    </CustomText>
                )}
            </View>
            <View style={styles.pagination}>
                <PaginationPanel
                    page={page}
                    fetching={isFetching}
                    hasMore={hasMore}
                    callbackPrevious={() => {
                        flatListRef.current?.scrollToOffset({
                            offset: 0,
                            animated: true,
                        });
                        handlePreviousPage();
                    }}
                    callbackNext={() => {
                        flatListRef.current?.scrollToOffset({
                            offset: 0,
                            animated: true,
                        });
                        handleNextPage();
                    }}
                />
            </View>
        </View>
    );
};
