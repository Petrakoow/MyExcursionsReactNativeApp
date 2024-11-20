import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList} from 'react-native';
import {CustomText} from '@/shared/ui/customText';
import {TextSize, TextWeight} from '@/shared/config/font';
import {SplashScreen} from '@/shared/ui/splashScreen';
import {ReviewExcursionCard} from '@/widgets/reviewExcursionCard';
import {styles} from './InformationExcursionReviewsCardStyle';
import {PaginationPanel} from '@/widgets/paginationPanel';
import {useGetReviewsByTokenString} from '@/features/excursions';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {ReviewModal} from '@/widgets/reviewModal';

type InformationReviewsType = {
    uid: number;
    customersReviewRating: number;
    reviews: number;
    reviewsWithText: number;
};

export const InformationExcursionReviewsCard = (
    props: InformationReviewsType,
) => {
    const {customersReviewRating, reviews, reviewsWithText, uid} = props;
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

    const [isModalVisible, setModalVisible] = useState(false);

    const handleAddOrUpdateReview = (rating: number, text: string) => {
        addOrUpdateReview(rating, text);
    };

    if (isLoading) {
        return (
            <SplashScreen
                showLogotype={false}
                titleIndicator="Загрузка отзывов..."
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
                        {customersReviewRating.toFixed(1)} / 5
                    </CustomText>
                </CustomText>
                <CustomText size={TextSize.S_XL} style={styles.summary}>
                    Всего отзывов: {reviews} ({reviewsWithText} с текстом)
                </CustomText>
                <CustomButton
                    style={[styleButton.firstTypeButton, styles.reviewButton]}
                    textButton="Оставить отзыв"
                    textSize={TextSize.S_BASE}
                    onPress={() => setModalVisible(true)}
                />
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
            <ReviewModal
                
            />
        </View>
    );
};
