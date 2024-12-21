import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { styles } from './InformationExcursionCardStyle';
import { CustomText } from '@/shared/ui/customText';
import { TextSize, TextWeight } from '@/shared/config/font';
import { TourTypeRequest } from '@/shared/api';
import { getActivityTypeLabel, getPayTypeLabel } from '@/shared/api';
import * as Images from '@/shared/assets/images';

type InformationCardType = {
    excursion: TourTypeRequest;
};

export const InformationExcursionCard = (props: InformationCardType) => {
    const { excursion } = props;

    return (
        <ScrollView>
            <View style={styles.content}>
                <Image
                    source={{ uri: excursion?.main_photo?.big || excursion?.image_big }}
                    style={styles.coverImage}
                />
                <CustomText
                    style={styles.title}
                    size={TextSize.S_3XL}
                    weight={TextWeight.BLACK}
                >
                    {excursion?.title || 'Без названия'} 
                </CustomText>
                <CustomText style={styles.activityType}>
                    Последнее обновление: {excursion?.updated_at || 'Не указано'}
                </CustomText>
                <CustomText style={styles.activityType} size={TextSize.S_BASE}>
                    {getActivityTypeLabel(excursion?.activity_type) || 'Не указано'}
                </CustomText>

                <View style={styles.infoSectionMainContainer}>
                    <View style={styles.infoSectionContainer}>
                        <View style={styles.infoSectionContainerImage}>
                            <Image
                                source={Images.Info}
                                style={styles.imageSection}
                            />
                        </View>

                        <View style={styles.infoSection}>
                            <CustomText
                                style={[styles.infoPrice, styles.infoBase]}
                                weight={TextWeight.BOLD}
                                size={TextSize.S_3XL}
                            >
                                Цена: {excursion?.netto_price || 'Не указано'}
                            </CustomText>
                            <CustomText
                                size={TextSize.S_XL}
                                style={[styles.infoDuration, styles.infoBase]}
                            >
                                Продолжительность:{' '}
                                {excursion?.order_options?.[0]?.duration?.name || 'Не указано'}
                            </CustomText>
                            <CustomText
                                size={TextSize.S_LG}
                                weight={TextWeight.BOLD}
                                style={[styles.infoPaymentType, styles.infoBase]}
                            >
                                Тип оплаты:{' '}
                                {getPayTypeLabel(excursion?.pay_type) || 'Не указано'}
                            </CustomText>
                        </View>
                    </View>
                </View>

                {excursion?.host && (
                    <View style={styles.sectionContainerGuide}>
                        <CustomText
                            weight={TextWeight.BOLD}
                            size={TextSize.S_3XL}
                            style={styles.sectionTitleGuide}
                        >
                            Информация о гиде
                        </CustomText>
                        <View style={styles.sectionContainerGuideLocal}>
                            <View style={styles.sectionContainerGuideText}>
                                <CustomText size={TextSize.S_LG}>
                                    Имя: {excursion?.host?.name || 'Не указано'}
                                </CustomText>
                                <CustomText size={TextSize.S_LG}>
                                    Рейтинг:{' '}
                                    <CustomText
                                        size={TextSize.S_LG}
                                        weight={TextWeight.BOLD}
                                        style={styles.sectionGuideRating}
                                    >
                                        {excursion?.host?.review_rating?.toFixed(1) || '0.0'} / 5
                                    </CustomText>
                                </CustomText>
                            </View>

                            <Image
                                source={{ uri: excursion?.host?.photo }}
                                style={styles.hostImage}
                            />
                        </View>
                    </View>
                )}

                <View style={styles.sectionDescription}>
                    <CustomText
                        weight={TextWeight.BOLD}
                        size={TextSize.S_3XL}
                        style={styles.sectionTitleDescrtiption}
                    >
                        Описание экскурсии
                    </CustomText>
                    <CustomText
                        weight={TextWeight.LIGHT}
                        size={TextSize.S_XL}
                        style={styles.sectionContent}
                    >
                        {excursion?.description || 'Нет описания'}
                    </CustomText>
                </View>

                {excursion?.what_included && (
                    <View style={styles.sectionDescription}>
                        <CustomText
                            weight={TextWeight.BOLD}
                            size={TextSize.S_3XL}
                            style={styles.sectionTitleDescrtiption}
                        >
                            Что включено в экскурсию ?
                        </CustomText>
                        <CustomText
                            size={TextSize.S_XL}
                            weight={TextWeight.LIGHT}
                            style={styles.sectionContent}
                        >
                            {excursion?.what_included || 'Не указано'}
                        </CustomText>
                    </View>
                )}

                {excursion?.what_not_included && (
                    <View style={styles.sectionDescription}>
                        <CustomText
                            weight={TextWeight.BOLD}
                            size={TextSize.S_3XL}
                            style={styles.sectionTitleDescrtiption}
                        >
                            Что не предоставляется
                        </CustomText>
                        <CustomText
                            size={TextSize.S_XL}
                            weight={TextWeight.LIGHT}
                            style={styles.sectionContent}
                        >
                            {excursion?.what_not_included || 'Не указано'}
                        </CustomText>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};
