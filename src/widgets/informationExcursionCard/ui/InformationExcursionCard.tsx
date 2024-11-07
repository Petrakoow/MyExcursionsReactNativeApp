import {View, Image} from 'react-native';
import {styles} from './InformationExcursionCardStyle';
import React from 'react';
import {CustomText} from '@/shared/ui/customText';
import {TextSize, TextWeight} from '@/shared/config/font';
import {TourTypeRequest} from '@/shared/api/sputnik8';
import {
    getActivityTypeLabel,
    getPayTypeLabel,
    getProductTypeLabel,
} from '@/shared/api/sputnik8';
import * as Images from '@/shared/assets/images';

type InformationCardType = {
    excursion: TourTypeRequest;
};

export const InformationExcursionCard = (props: InformationCardType) => {
    const {excursion} = props;
    return (
        <View>
            <Image
                source={{uri: excursion.main_photo.big}}
                style={styles.coverImage}
            />

            <CustomText
                style={styles.title}
                size={TextSize.S_3XL}
                weight={TextWeight.BLACK}>
                {excursion.title}
            </CustomText>
            <CustomText style={styles.activityType} size={TextSize.S_BASE}>
                {getActivityTypeLabel(excursion.activity_type)}
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
                            size={TextSize.S_3XL}>
                            Цена: {excursion.price}
                        </CustomText>
                        <CustomText
                            size={TextSize.S_XL}
                            style={[styles.infoDuration, styles.infoBase]}>
                            Продолжительность: {excursion.duration}
                        </CustomText>
                        <CustomText
                            size={TextSize.S_LG}
                            weight={TextWeight.BOLD}
                            style={[styles.infoPaymentType, styles.infoBase]}>
                            Тип оплаты: {getPayTypeLabel(excursion.pay_type)}
                        </CustomText>
                        <CustomText
                            size={TextSize.S_LG}
                            weight={TextWeight.BOLD}
                            style={[styles.infoProductType, styles.infoBase]}>
                            Тип экскурсии:{' '}
                            {getProductTypeLabel(excursion.product_type)}
                        </CustomText>
                    </View>
                </View>
            </View>

            {excursion.host && (
                <View style={styles.sectionContainerGuide}>
                    <CustomText
                        weight={TextWeight.BOLD}
                        size={TextSize.S_3XL}
                        style={styles.sectionTitleGuide}>
                        Информация о гиде
                    </CustomText>
                    <View style={styles.sectionContainerGuideLocal}>
                        <View style={styles.sectionContainerGuideText}>
                            <CustomText size={TextSize.S_LG}>
                                Имя: {excursion.host.name}
                            </CustomText>
                            <CustomText size={TextSize.S_LG}>
                                Рейтинг:{' '}
                                <CustomText
                                    size={TextSize.S_LG}
                                    weight={TextWeight.BOLD}
                                    style={styles.sectionGuideRating}>
                                    {excursion.host.review_rating.toFixed(1)} /
                                    5
                                </CustomText>
                            </CustomText>
                        </View>

                        <Image
                            source={{uri: excursion.host.photo}}
                            style={styles.hostImage}
                        />
                    </View>
                </View>
            )}

            <View style={styles.sectionDescription}>
                <CustomText
                    weight={TextWeight.BOLD}
                    size={TextSize.S_3XL}
                    style={styles.sectionTitleDescrtiption}>
                    Описание экскурсии
                </CustomText>
                <CustomText
                    weight={TextWeight.LIGHT}
                    size={TextSize.S_XL}
                    style={styles.sectionContent}>
                    {excursion.description}
                </CustomText>
            </View>

            {excursion.what_included && (
                <View style={styles.sectionDescription}>
                    <CustomText
                        weight={TextWeight.BOLD}
                        size={TextSize.S_3XL}
                        style={styles.sectionTitleDescrtiption}>
                        Что включено в экскурсию ?
                    </CustomText>
                    <CustomText
                        size={TextSize.S_XL}
                        weight={TextWeight.LIGHT}
                        style={styles.sectionContent}>
                        {excursion.what_included}
                    </CustomText>
                </View>
            )}
            {excursion.what_not_included && (
                <View style={styles.sectionDescription}>
                    <CustomText
                        weight={TextWeight.BOLD}
                        size={TextSize.S_3XL}
                        style={styles.sectionTitleDescrtiption}>
                        Что не предоставляется
                    </CustomText>
                    <CustomText
                        size={TextSize.S_XL}
                        weight={TextWeight.LIGHT}
                        style={styles.sectionContent}>
                        {excursion.what_not_included}
                    </CustomText>
                </View>
            )}
        </View>
    );
};
