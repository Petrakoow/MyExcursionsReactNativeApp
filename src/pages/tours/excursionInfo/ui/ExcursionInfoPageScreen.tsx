import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
    NavigationStackList,
    AppNavigation,
} from '@/shared/config/navigation/types';
import {
    getActivityTypeLabel,
    getPayTypeLabel,
    getProductTypeLabel,
} from '@/shared/api/sputnik8';
import {ScreenContent} from '@/shared/ui/screenContent';
import {CONTENT_RADIUS, moderateScale} from '@/shared/config/dimensions';
import {CustomText} from '@/shared/ui/customText';
import {TextSize, TextWeight} from '@/shared/config/font';
import {Colors} from '@/shared/config/colors';
import * as Images from '@/shared/assets/images';

export const ExcursionInfoPageScreen = () => {
    const route =
        useRoute<
            RouteProp<NavigationStackList, AppNavigation.EXCURSION_INFO>
        >();
    const {excursion} = route.params;

    return (
        <ScreenContent>
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

            <View style={styles.infoSectionContainer}>
                <Image source={Images.Info} style={styles.imageSection} />
                <View style={styles.infoSection}>
                    <CustomText
                        style={[styles.infoPrice, styles.infoBase]}
                        weight={TextWeight.BOLD}
                        size={TextSize.S_3XL}>
                        Price: {excursion.price}
                    </CustomText>
                    <CustomText
                        size={TextSize.S_XL}
                        style={[styles.infoDuration, styles.infoBase]}>
                        Duration: {excursion.duration}
                    </CustomText>
                    <CustomText
                        size={TextSize.S_XL}
                        style={[styles.infoLanguages, styles.infoBase]}>
                        Languages: {excursion.languages.join(', ')}
                    </CustomText>
                    <CustomText
                        size={TextSize.S_LG}
                        weight={TextWeight.BOLD}
                        style={[styles.infoPaymentType, styles.infoBase]}>
                        Payment Type: {getPayTypeLabel(excursion.pay_type)}
                    </CustomText>
                    <CustomText
                        size={TextSize.S_LG}
                        weight={TextWeight.BOLD}
                        style={[styles.infoProductType, styles.infoBase]}>
                        Product Type:{' '}
                        {getProductTypeLabel(excursion.product_type)}
                    </CustomText>
                </View>
            </View>
            {excursion.host && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Guide Information</Text>
                    <Text style={styles.sectionContent}>
                        Name: {excursion.host.name}
                    </Text>
                    <Text style={styles.sectionContent}>
                        Rating: {excursion.host.review_rating.toFixed(1)} / 5
                    </Text>
                    <Image
                        source={{uri: excursion.host.photo}}
                        style={styles.hostImage}
                    />
                </View>
            )}
            {/* Description */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.sectionContent}>
                    {excursion.description}
                </Text>
            </View>

            {/* What's Included */}
            {excursion.what_included && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>What's Included</Text>
                    <Text style={styles.sectionContent}>
                        {excursion.what_included}
                    </Text>
                </View>
            )}
        </ScreenContent>
    );
};

const styles = StyleSheet.create({
    coverImage: {
        width: '100%',
        height: 300,
        borderRadius: CONTENT_RADIUS,
        marginBottom: moderateScale(16),
    },
    title: {
        color: Colors.widget.informationTourCard.title,
        textAlign: 'left',
        marginBottom: moderateScale(10),
    },
    activityType: {
        color: Colors.widget.informationTourCard.activityType,
        marginBottom: moderateScale(20),
        paddingBottom: moderateScale(10),
        borderBottomWidth: 1,
        borderBottomColor: Colors.widget.informationTourCard.activityType,
    },
    imageSection: {
        height: 80,
        width: 80,
    },
    infoSectionContainer: {
        flexDirection: 'row',
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.widget.informationTourCard.activityType,
    },
    infoSection: {
        gap: moderateScale(8),
        marginBottom: moderateScale(24),
        paddingBottom: moderateScale(10),
    },
    infoBase: {
        textAlign: 'right',
    },
    infoPrice: {
        color: Colors.widget.informationTourCard.price,
    },
    infoDuration: {},
    infoRating: {},
    infoLanguages: {},
    infoPaymentType: {
        color: Colors.widget.informationTourCard.paymentType,
    },
    infoProductType: {
        color: Colors.widget.informationTourCard.productType,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    infoValue: {
        fontSize: 16,
        color: '#555',
    },
    section: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    sectionContent: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
    },
    hostInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    hostImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 12,
    },
    hostDetails: {
        flexDirection: 'column',
    },
    hostName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    hostRating: {
        fontSize: 16,
        color: '#555',
        marginTop: 4,
    },
});
