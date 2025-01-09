import {View} from 'react-native';
import React from 'react';
import {CustomText} from '@/shared/ui/customText';
import {TextSize, TextWeight} from '@/shared/config/font';
import {styles} from './ReviewExcursionCardStyle';
import {ViewProps} from 'react-native-svg/lib/typescript/fabric/utils';
import { DateHelper } from '@/shared/utils';

type ReviewExcursionCardType = ViewProps & {
    item: {
        name: string;
        date: string | Date;
        rating: number;
        content: string;
    };
    ratingTitle?: string;
    isPrimary?: boolean;
};

export const ReviewExcursionCard = (props: ReviewExcursionCardType) => {
    const {item, ratingTitle = 'Оценка', style, isPrimary = false, ...res} = props;

    const getFormattedDate = (date: string | Date): string => {
        const parsedDate = typeof date === 'string' ? new Date(date) : date;
        return DateHelper.format(parsedDate);
    };
    return (
        <View {...res} style={[style, styles.reviewItem, isPrimary && styles.primaryCard]}>
            <CustomText
                size={TextSize.S_LG}
                weight={TextWeight.BOLD}
                style={styles.reviewTitle}>
                {item.name}
            </CustomText>
            <CustomText style={styles.reviewDate} size={TextSize.S_SM}>
                {DateHelper.format(DateHelper.parse(item.date))}
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
