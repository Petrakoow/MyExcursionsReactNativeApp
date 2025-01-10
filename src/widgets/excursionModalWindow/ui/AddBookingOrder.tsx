import React, {useState} from 'react';
import {View} from 'react-native';
import {CustomText} from '@/shared/ui/customText';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {TextSize} from '@/shared/config/font';
import {styles} from './BookingModalStyle';
import {TourTypeRequest} from '@/shared/api';
import {DateHelper} from '@/shared/utils';
import {useDatabase} from '@/provider';
import {getUserSession} from '@/shared/db/models/user';
import {createBookingWithNotifications} from '@/features/booking/service/createBookingWithNotifications';
import {checkStatus} from '@/entities/status';
import {isBookingAdd} from '@/entities/booking';

type OrderLineProps = {
    line: TourTypeRequest['order_options'][0]['order_lines'][0];
    excursionId: number;
    type: string;
    isUser: boolean;
};

export const OrderLine = (props: OrderLineProps) => {
    const realm = useDatabase();
    const userId = getUserSession()?.userId;
    const {line, excursionId, type, isUser} = props;
    const parseDate = DateHelper.parse(parseInt(line.start_date));
    const isEventUpcoming = parseDate > new Date();

    const [alreadyBooked, setAlreadyBooked] = useState(
        userId
            ? isBookingAdd(realm, userId, excursionId, parseDate, type)
            : false,
    );

    const handleBooking = () => {
        if (userId && isEventUpcoming) {
            createBookingWithNotifications(realm, {
                userId: userId,
                excursionId: excursionId,
                eventTitle: type,
                eventDescription: line.offer_type,
                reservationDate: new Date(),
                eventDate: parseDate,
            });

            setAlreadyBooked(true);
        }
    };

    const status = userId ? checkStatus : false;

    return (
        <View style={styles.orderLine}>
            <CustomText>
                <CustomText style={styles.markTitle}>Цена: </CustomText>
                {line.price > 0 ? line.price : 'не указана'}
            </CustomText>
            <CustomText>{line.title}</CustomText>
            {line.discount && Object.keys(line.discount).length > 0 && (
                <CustomText>
                    Скидка: {line.discount.value}% (до{' '}
                    {line.discount.expiration_date})
                </CustomText>
            )}
            <CustomText>Цена рассчитывается {line.price_per}</CustomText>
            <CustomText style={styles.marginText}>
                Дата мероприятия: {DateHelper.format(DateHelper.parse(parseInt(line.start_date)))}
            </CustomText>
            {isUser ? (
                !alreadyBooked ? (
                    <CustomButton
                        style={[
                            styleButton.primaryTypeButton,
                            styles.buttonBooking,
                        ]}
                        textSize={TextSize.S_BASE}
                        textButton={
                            status
                                ? isEventUpcoming
                                    ? 'Забронировать'
                                    : 'Событие прошло'
                                : 'Подтвердите свои данные'
                        }
                        onPress={handleBooking}
                        disabled={!isEventUpcoming || !status}
                    />
                ) : (
                    <CustomText>Вы уже забронировали</CustomText>
                )
            ) : (
                <CustomText>
                    Войдите, чтобы забронировать
                </CustomText>
            )}
        </View>
    );
};
