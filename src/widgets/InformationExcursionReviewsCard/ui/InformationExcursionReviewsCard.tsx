import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList} from 'react-native';
import {CustomText} from '@/shared/ui/customText';
import {TextSize, TextWeight} from '@/shared/config/font';
import {SplashScreen} from '@/shared/ui/splashScreen';
import {ReviewExcursionCard} from '@/widgets/reviewExcursionCard';
import {styles} from './InformationExcursionReviewsCardStyle';
import {PaginationPanel} from '@/widgets/paginationPanel';
import {useGetReviewsByTokenString, useReviews} from '@/features/reviews';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {ReviewModal} from '@/widgets/reviewModal';
import {getUserSession, getUserStatus} from '@/shared/db/models/user';

type InformationReviewsType = {
    uid: number;
    customersReviewRating: number;
};

export const InformationExcursionReviewsCard = (
    props: InformationReviewsType,
) => {
    const {customersReviewRating, uid} = props;
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

    const [isModalVisible, setModalVisible] = useState(false);
    const userId = getUserSession()?.userId || '';
    const {reviews, existingReview, addOrUpdate, remove} = useReviews(uid, {
        userId: userId,
    });

    const isUser = getUserStatus();

    useEffect(() => {
        getToursByExcursionId(currentToken, uid);
    }, [currentToken, uid]);

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
                {isUser && (
                    <CustomButton
                        style={[
                            styleButton.primaryTypeButton,
                            styles.reviewButton,
                        ]}
                        textButton={
                            existingReview ? 'Изменить отзыв' : 'Оставить отзыв'
                        }
                        textSize={TextSize.S_BASE}
                        onPress={() => setModalVisible(true)}
                    />
                )}
            </View>

            <View style={styles.contentReview}>
                {reviewsList.length > 0 ? (
                    <FlatList
                        ref={flatListRef}
                        data={[
                            ...(existingReview ? [existingReview] : []),
                            ...reviewsList,
                            ...(reviews || []),
                        ]}
                        renderItem={({item}) => {
                            if (!item) return null;
                            return (
                                <ReviewExcursionCard
                                    item={item}
                                    isPrimary={item.userId === userId}
                                />
                            );
                        }}
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
                visible={isModalVisible}
                existingReview={existingReview}
                onClose={() => setModalVisible(false)}
                onReviewSubmit={(rating, text) => {
                    addOrUpdate(rating, text);
                    setModalVisible(false);
                }}
                onReviewDelete={() => {
                    remove();
                    setModalVisible(false);
                }}
                animationType="fade"
            />
        </View>
    );
};
