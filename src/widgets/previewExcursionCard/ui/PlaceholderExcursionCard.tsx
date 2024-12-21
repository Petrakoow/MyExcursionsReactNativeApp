import React from 'react';
import {View, Image} from 'react-native';
import {CustomText} from '@/shared/ui/customText';
import {styles} from './PreviewExcursionCardStyle';
import {TextWeight, TextSize} from '@/shared/config/font';
import { Placeholder } from '@/shared/assets/images';

export const PlaceholderExcursionCard = () => {
    return (
        <View style={styles.card}>
            <Image
                source={Placeholder}
                style={styles.image}
            />
            <View style={styles.infoContainer}>
                <CustomText
                    weight={TextWeight.BOLD}
                    size={TextSize.S_LG}
                    numberOfLines={2}
                    style={styles.title}>
                    Здесь будут отображаться экскурсии
                </CustomText>

                <CustomText
                    weight={TextWeight.NORMAL}
                    size={TextSize.S_BASE}
                    numberOfLines={3}
                    style={styles.shortInfo}>
                    К сожалению, экскурсии не загрузились. Попробуйте обновить
                    страницу.
                </CustomText>
            </View>
        </View>
    );
};
