import React from 'react';
import {View} from 'react-native';
import {CustomText} from '@/shared/ui/customText';
import {getTicketTypeLabel, TourTypeRequest} from '@/shared/api';
import {OrderLine} from './AddBookingOrder';
import {styles} from './BookingModalStyle';
import {TextSize, TextWeight} from '@/shared/config/font';

type OrderOptionProps = {
    orderOption: TourTypeRequest['order_options'][0];
    excursionId: number;
    isUser: boolean;
};

export const OrderOption = (props: OrderOptionProps) => {
    const {orderOption, excursionId, isUser} = props;
    return (
        <View style={styles.optionContainer}>
            <CustomText
                size={TextSize.S_2XL}
                weight={TextWeight.BOLD}
                style={[styles.optionTitle, styles.markHeaderTitle]}>
                Вариант: {orderOption.title}
            </CustomText>
            <CustomText>
                <CustomText style={styles.markTitle}>Тип билета: </CustomText>
                {getTicketTypeLabel(orderOption.ticket_type)}
            </CustomText>
            <CustomText>
                <CustomText style={styles.markTitle}>
                    Продолжительность:{' '}
                </CustomText>
                {orderOption.duration.name}
            </CustomText>
            {orderOption.order_lines.map((line, lineIndex) => (
                <OrderLine key={lineIndex} line={line} excursionId={excursionId} type={orderOption.title} isUser={isUser}/>
            ))}
        </View>
    );
};
