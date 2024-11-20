import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import {CustomText} from '@/shared/ui/customText';
import {TextSize, TextWeight} from '@/shared/config/font';
import {SplashScreen} from '@/shared/ui/splashScreen';
import {ReviewExcursionCard} from '@/widgets/reviewExcursionCard';
import {styles} from './InformationExcursionReviewsCardStyle';
import {PaginationPanel} from '@/widgets/paginationPanel';
import {useGetReviewsByTokenString} from '@/features/excursions';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {ReviewModal} from '@/widgets/reviewModal';
import {getUserSession} from '@/shared/db/models/user';
import {Review} from '@/shared/db/models';
import {
    addReview,
    deleteReview,
    getReviews,
    updateReview,
} from '@/entities/reviews';
import {useDatabase} from '@/app/providers';
import { TourReviewTypeRequest } from '@/shared/api/sputnik8';

type InformationReviewsType = {
    uid: number;
    customersReviewRating: number;
    reviews: number;
    reviewsWithText: number;
};

const convertToTourReviewRequest = (review: Review) : TourReviewTypeRequest['reviews'][number] => {
    return review && {
        content: review?.reviewText,
        name: review?.userInitials || '',
        date: review?.reviewDate.toDateString(),
        rating: review?.rating,
    }
}

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

    const [isModalVisible, setModalVisible] = useState(false);
    const [userId, setUserId] = useState<string>(''); // State for userId
    const [existingReview, setExistingReview] = useState<Review | undefined>(
        undefined,
    );

    const database = useDatabase();

    useEffect(() => {
        const fetchUserSession = async () => {
            const session = await getUserSession();
            if (session) {
                setUserId(session.userId); // Set userId from session
            }
        };

        fetchUserSession(); // Fetch user session on component mount
        getToursByExcursionId(currentToken, uid);

        if (userId) {
            const reviews = getReviews(database, uid);
            const userReview = reviews.find(review => review.userId === userId);
            if (userReview) setExistingReview(userReview);
        }
    }, [currentToken, uid, userId]);

    const handleAddOrUpdateReview = (rating: number, text: string) => {
        if (existingReview) {
            updateReview(database, userId, uid, rating, text); // Update review if it exists
        } else {
            addReview(database, userId, uid, 'AA', rating, text); // Add new review
        }
        const updatedReviews = getReviews(database, uid);
        const userReview = updatedReviews.find(
            review => review.userId === userId,
        );
        setExistingReview(userReview);
        setModalVisible(false);
    };

    const handleDeleteReview = async () => {
        if (existingReview) {
            try {
                await deleteReview(database, userId);
                setExistingReview(undefined);
            } catch (error) {
                console.error('Ошибка при удалении отзыва:', error);
            }
        }
        setModalVisible(false);
    };

    if (isLoading || userId === null) {
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
                    textButton={existingReview ? "Изменить отзыв" : "Оставить отзыв"}
                    textSize={TextSize.S_BASE}
                    onPress={() => setModalVisible(true)}
                />
            </View>

            <View style={styles.contentReview}>
                {/* {existingReview && (
                    <View style={styles.contentDatabaseReviews}>
                        <ReviewExcursionCard
                            item={{
                                name: existingReview?.userInitials,
                                date: existingReview?.reviewDate.toDateString(),
                                rating: existingReview?.rating,
                                content: existingReview?.reviewText,
                            }}
                        />
                    </View>
                )} */}
                {reviewsList.length > 0 ? (
                    <FlatList
                        ref={flatListRef}
                        data={[
                            ...(existingReview ? [convertToTourReviewRequest(existingReview)] : []),
                            ...reviewsList,
                        ]}
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
                userId={userId}
                excursionId={uid}
                userInitials={'AA'}
                visible={isModalVisible}
                existingReview={existingReview}
                onClose={() => setModalVisible(false)}
                onReviewSubmit={handleAddOrUpdateReview}
                onReviewDelete={handleDeleteReview} // Add function for deleting review
                animationType="fade"
            />
        </View>
    );
};
