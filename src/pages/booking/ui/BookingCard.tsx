import React from 'react';
import {View} from 'react-native';
import {CustomText} from '@/shared/ui/customText';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {TextSize, TextWeight} from '@/shared/config/font';
import {Reservation} from '@/shared/db/models';
import {styles} from './BookingScreenStyle';
import {getActivityTypeLabel} from '@/shared/api';
import {useBookingCard} from '@/features/booking';
import {PreviewExcursionCard} from '@/widgets/previewExcursionCard';
import Realm from 'realm';
import { NavigationProp } from '@react-navigation/native';
import { AppNavigation, NavigationStackList } from '@/shared/config/navigation';
import { DateHelper } from '@/shared/utils';

type BookingCardProps = {
    booking: Reservation;
    database: Realm;
    navigation: NavigationProp<NavigationStackList>;
};

const BookingCard = (props: BookingCardProps) => {
    const {database, booking, navigation} = props;

    const {remainingTime, excursion, formatTime, handleDeleteBooking} =
        useBookingCard({
            booking,
            database,
        });

    const renderExtension = () => (
        <View>
            <CustomText style={styles.date}>
                Дата события: {DateHelper.format(booking.eventDate)}
            </CustomText>
            <CustomText style={styles.countdown} weight={TextWeight.BOLD}>
                Время до события:{' '}
                {remainingTime > 0
                    ? formatTime(remainingTime)
                    : 'Событие началось'}
            </CustomText>

            {excursion && (
                <>
                    <CustomText
                        style={styles.activityType}
                        weight={TextWeight.BOLD}>
                        Тип экскурсии:{' '}
                        {getActivityTypeLabel(excursion.activity_type)}
                    </CustomText>
                    <CustomText
                        style={styles.paymentType}
                        weight={TextWeight.BOLD}>
                        Тип оплаты: {excursion.pay_type_in_text}
                    </CustomText>
                    <CustomText
                        style={styles.paymentType}
                        weight={TextWeight.BOLD}>
                        Ваш тип бронирования: {booking.eventTitle}
                    </CustomText>
                </>
            )}
        </View>
    );

    return (
        <View style={styles.card}>
            {excursion && (
                <>
                    <PreviewExcursionCard
                        tour={excursion}
                        onPress={() =>
                            navigation.navigate(AppNavigation.EXCURSION_INFO, {
                                excursion: excursion,
                            })
                        }
                        extensionCard={renderExtension()}
                    />
                    <CustomButton
                        textButton="Перестать отслеживать"
                        style={[styleButton.primaryTypeButton, styles.button]}
                        textSize={TextSize.S_BASE}
                        onPress={handleDeleteBooking}
                    />
                </>
            )}
        </View>
    );
};

export default BookingCard;
