import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {TourTypeRequest} from '@/shared/api/sputnik8';
import {CustomText} from '@/shared/ui/customText';
import {moderateScale} from 'react-native-size-matters';
import {TextSize, TextWeight} from '@/shared/config/font';
import {Colors} from '@/shared/config/colors';

type InformationReviewsType = {
    customers_review_rating: number;
    reviews: number;
    reviews_with_text: number;
    reviews_list?: TourTypeRequest['reviews_list'];
};

export const InformationExcursionReviewsCard = (
    props: InformationReviewsType,
) => {
    const {customers_review_rating, reviews, reviews_with_text, reviews_list} =
        props;

    console.log(reviews_list);
    return (
        <View>
            <CustomText size={TextSize.S_4XL} style={styles.header}>
                Отзывы
            </CustomText>
            <CustomText size={TextSize.S_XL} style={styles.rating}>
                <CustomText size={TextSize.S_XL} style={styles.ratingTitle}>
                    Средняя оценка:
                </CustomText>{' '}
                <CustomText size={TextSize.S_XL} style={styles.ratingMark}>
                    {customers_review_rating.toFixed(1)} / 5
                </CustomText>
            </CustomText>
            <CustomText size={TextSize.S_XL} style={styles.summary}>
                Всего отзывов: {reviews} ({reviews_with_text} с текстом)
            </CustomText>

            {reviews_list && reviews_list.length > 0 ? (
                <FlatList
                    data={reviews_list}
                    keyExtractor={item => item.activity_id.toString()}
                    renderItem={({item}) => (
                        <View style={styles.reviewItem}>
                            <CustomText style={styles.reviewerName}>
                                {item.name}
                            </CustomText>
                            <CustomText style={styles.reviewDate}>
                                {item.date}
                            </CustomText>
                            <CustomText style={styles.reviewRating}>
                                Оценка: {item.rating} / 5
                            </CustomText>
                            <CustomText style={styles.reviewContent}>
                                {item.content}
                            </CustomText>
                        </View>
                    )}
                />
            ) : (
                <CustomText size={TextSize.S_LG} style={styles.noReviewsText}>
                    Нет отзывов с текстом
                </CustomText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        color: Colors.widget.informationTourCard.reviews.header,
        marginBottom: moderateScale(12),
        borderBottomColor: Colors.widget.informationTourCard.reviews.header,
    },
    rating: {
        marginBottom: moderateScale(4),
    },
    ratingTitle: {
        color: Colors.widget.informationTourCard.reviews.title,
    },
    ratingMark: {
        color: Colors.widget.informationTourCard.reviews.mark,
    },
    summary: {
        marginBottom: moderateScale(12),
        color: Colors.widget.informationTourCard.reviews.title,
    },
    reviewItem: {
        marginBottom: 16,
        padding: 8,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    reviewDate: {
        color: '#888',
    },
    reviewRating: {
        marginVertical: 4,
    },
    reviewContent: {
        color: '#333',
    },
    noReviewsText: {
        textAlign: 'center',
        marginTop: 16,
        color: Colors.widget.informationTourCard.reviews.noReviews,
    },
});
