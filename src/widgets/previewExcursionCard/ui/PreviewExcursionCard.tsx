import React from 'react';
import {CustomText} from '@/shared/ui/customText';
import {
    Image,
    StyleProp,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import {TextWeight, TextSize} from '@/shared/config/font';
import {styles} from './PreviewExcursionCardStyle';
import {TourTypeRequest} from '@/shared/api';

type PreviewExcursionCardType = {
    tour: TourTypeRequest;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    extensionCard?: React.ReactNode;
};

export const PreviewExcursionCard = (props: PreviewExcursionCardType) => {
    const {tour, style, onPress, extensionCard} = props;
    return (
        <TouchableOpacity onPress={onPress} style={[styles.card, style]}>
            <Image
                source={{
                    uri: tour?.main_photo?.big || tour?.image_big,
                }}
                style={styles.image}
            />
            <View style={styles.infoContainer}>
                <CustomText
                    weight={TextWeight.BOLD}
                    size={TextSize.S_LG}
                    numberOfLines={2}
                    style={styles.title}>
                    {tour?.title || 'Без названия'}
                </CustomText>

                <CustomText
                    weight={TextWeight.NORMAL}
                    size={TextSize.S_BASE}
                    numberOfLines={3}
                    style={styles.shortInfo}>
                    {tour?.short_info || 'Нет краткой информации'}
                </CustomText>
                {tour.host && (
                    <View style={styles.ratingContainer}>
                        <CustomText weight={TextWeight.BOLD}>
                            Рейтинг:{' '}
                            <CustomText
                                weight={TextWeight.BOLD}
                                style={styles.rating}>
                                {tour?.customers_review_rating?.toFixed(1) ||
                                    '0.0'}{' '}
                                / 5
                            </CustomText>
                        </CustomText>
                    </View>
                )}
                <CustomText weight={TextWeight.LIGHT} style={styles.duration}>
                    Длительность:{' '}
                    {tour?.order_options?.[0]?.duration?.name || 'Не указано'}
                </CustomText>
                <CustomText weight={TextWeight.LIGHT} style={styles.price}>
                    Цена: {tour?.netto_price || 'Не указано'}
                </CustomText>
                {extensionCard && (
                    <View>
                        {extensionCard}
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};
