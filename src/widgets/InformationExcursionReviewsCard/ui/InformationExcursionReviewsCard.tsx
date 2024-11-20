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
    getReviewUser,
    updateReview,
} from '@/entities/reviews';
import {useDatabase} from '@/app/providers';

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
    const [userId, setUserId] = useState<string>('');
    const [existingReview, setExistingReview] = useState<Review | undefined>(
        undefined,
    );
    const [allReviews, setAllReviews] = useState<Review[] | undefined>(
        undefined,
    );

    const database = useDatabase();

    useEffect(() => {
        const fetchUserSession = async () => {
            const session = await getUserSession();
            if (session) {
                setUserId(session.userId);
            }
        };

        fetchUserSession();
        getToursByExcursionId(currentToken, uid);

        if (userId) {
            const userReview = getReviewUser(database, uid, userId);
            if (userReview) setExistingReview(userReview);
        }
        console.log(allReviews);
        setAllReviews(getReviews(database, uid));
    }, [currentToken, uid, userId]);

    const handleAddOrUpdateReview = (rating: number, text: string) => {
        console.log(rating, text, existingReview);
        if (existingReview) {
            updateReview(database, userId, uid, rating, text);
        } else {
            addReview(database, userId, uid, 'AA', rating, text);
        }
        const userReview = getReviewUser(database, uid, userId);
        if (userReview) {
            setExistingReview(userReview);
            setAllReviews(getReviews(database, uid));
        }

        setModalVisible(false);
    };

    const handleDeleteReview = async () => {
        if (existingReview) {
            deleteReview(database, userId);
            setExistingReview(undefined);
            setAllReviews(getReviews(database, uid));
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
                <CustomButton
                    style={[styleButton.primaryTypeButton, styles.reviewButton]}
                    textButton={
                        existingReview ? 'Изменить отзыв' : 'Оставить отзыв'
                    }
                    textSize={TextSize.S_BASE}
                    onPress={() => setModalVisible(true)}
                />
            </View>

            <View style={styles.contentReview}>
                {reviewsList.length > 0 ? (
                    <FlatList
                        ref={flatListRef}
                        data={[
                            ...(existingReview
                                ? [{...existingReview, userId: userId}]
                                : []),
                            ...reviewsList,
                            ...(allReviews || []),
                        ]}
                        renderItem={({item}) => (
                            <ReviewExcursionCard
                                item={item}
                                isPrimary={item?.userId}
                            />
                        )}
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
                userInitials={'AA'}
                visible={isModalVisible}
                existingReview={existingReview}
                onClose={() => setModalVisible(false)}
                onReviewSubmit={handleAddOrUpdateReview}
                onReviewDelete={handleDeleteReview}
                animationType="fade"
            />
        </View>
    );
};
