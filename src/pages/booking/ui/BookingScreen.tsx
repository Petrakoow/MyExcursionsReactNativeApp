import React from 'react';
import {FlatList, View} from 'react-native';
import {CustomText} from '@/shared/ui/customText';
import {Reservation} from '@/shared/db/models';
import {styles} from './BookingScreenStyle';
import {ScreenContent} from '@/shared/ui/screenContent';
import BookingCard from './BookingCard';
import {TextSize} from '@/shared/config/font';
import {useBookingExcursions} from '@/features/booking';
import {useDatabase} from '@/provider';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NavigationStackList} from '@/shared/config/navigation';

export const BookingPageScreen = () => {
    const database = useDatabase();
    const navigation = useNavigation<NavigationProp<NavigationStackList>>();
    const {bookings, isVerified} = useBookingExcursions();

    const renderBookingCard = ({item}: {item: Reservation}) => (
        <BookingCard
            booking={item}
            database={database}
            navigation={navigation}
        />
    );

    return (
        <ScreenContent>
            <View>
                {!isVerified ? (
                    <View style={styles.content}>
                        <CustomText
                            style={styles.notVerifiedText}
                            size={TextSize.S_LG}>
                            Пожалуйста, заполните контактные данные для доступа
                            к бронированиям
                        </CustomText>
                    </View>
                ) : bookings.length === 0 ? (
                    <View style={styles.content}>
                        <CustomText
                            style={[styles.noBookings]}
                            size={TextSize.S_LG}>
                            Бронирований на данный момент нету
                        </CustomText>
                    </View>
                ) : (
                    <FlatList
                        data={bookings}
                        keyExtractor={item => item.id}
                        renderItem={renderBookingCard}
                        contentContainerStyle={styles.content}
                    />
                )}
            </View>
        </ScreenContent>
    );
};
