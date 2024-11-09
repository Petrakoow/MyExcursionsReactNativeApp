import {CustomText} from '@/shared/ui/customText';
import {Image, TouchableOpacity, View} from 'react-native';
import {TextWeight, TextSize} from '@/shared/config/font';
import {styles} from './PreviewExcursionCardStyle';
import {TourTypeRequest} from '@/shared/api/sputnik8';

type PreviewExcursionCardType = {
    tour: TourTypeRequest;
    onPress: () => void;
};

export const PreviewExcursionCard = (props: PreviewExcursionCardType) => {
    const {tour, onPress} = props;
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <Image source={{uri: tour.main_photo.big}} style={styles.image} />
            <View style={styles.infoContainer}>
                <CustomText
                    weight={TextWeight.BOLD}
                    size={TextSize.S_LG}
                    numberOfLines={2}
                    style={styles.title}>
                    {tour.title}
                </CustomText>

                <CustomText
                    weight={TextWeight.NORMAL}
                    size={TextSize.S_BASE}
                    numberOfLines={3}
                    style={styles.shortInfo}>
                    {tour.short_info}
                </CustomText>
                {tour.host && (
                    <View style={styles.ratingContainer}>
                        <CustomText weight={TextWeight.BOLD}>
                            Рейтинг:{' '}
                            <CustomText
                                weight={TextWeight.BOLD}
                                style={styles.rating}>
                                {tour.customers_review_rating.toFixed(1)} / 5
                            </CustomText>
                        </CustomText>
                    </View>
                )}
                <CustomText weight={TextWeight.LIGHT} style={styles.duration}>
                    Длительность: {tour.order_options[0].duration.name}
                </CustomText>
                <CustomText weight={TextWeight.LIGHT} style={styles.price}>
                    Цена: {tour.netto_price}{' '}
                </CustomText>
            </View>
        </TouchableOpacity>
    );
};
