import {View} from 'react-native';
import React from 'react';
import {CustomText} from '@/shared/ui/customText';
import {TextSize, TextWeight} from '@/shared/config/font';
import {styles} from './ReviewExcursionCardStyle';

type ReviewExcursionCardType = {
    item: {
        name: string;
        date: string;
        rating: number;
        content: string;
    };
    ratingTitle?: string;
};

export const ReviewExcursionCard = (props: ReviewExcursionCardType) => {
    const {item, ratingTitle = 'Оценка'} = props;
    return (
        <View style={styles.reviewItem}>
            <CustomText
                size={TextSize.S_LG}
                weight={TextWeight.BOLD}
                style={styles.reviewTitle}>
                {item.name}
            </CustomText>
            <CustomText style={styles.reviewDate} size={TextSize.S_SM}>
                {item.date}
            </CustomText>
            <CustomText
                weight={TextWeight.BOLD}
                style={styles.reviewRatingTitle}
                size={TextSize.S_BASE}>
                {ratingTitle}:{' '}
                <CustomText
                    weight={TextWeight.BOLD}
                    style={styles.reviewRating}>
                    {item.rating}
                </CustomText>
            </CustomText>
            {item.content != null && item.content.length > 0 && (
                <CustomText style={styles.reviewContent}>
                    {item.content}
                </CustomText>
            )}
        </View>
    );
};
