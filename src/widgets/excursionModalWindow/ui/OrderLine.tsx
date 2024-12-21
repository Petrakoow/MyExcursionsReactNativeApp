import React from 'react';
import {View} from 'react-native';
import {CustomText} from '@/shared/ui/customText';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {TextSize} from '@/shared/config/font';
import {styles} from './BookingModalStyle';
import {TourTypeRequest} from '@/shared/api';
import {formatDate} from '@/shared/utils';

type OrderLineProps = {
    line: TourTypeRequest['order_options'][0]['order_lines'][0];
};

export const OrderLine = ({line}: OrderLineProps) => {
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
            <CustomText>
                Цена рассчитывается {line.price_per}{' '}
            </CustomText>
            <CustomText style={styles.marginText}>
                Дата мероприятия:{' '}
                {formatDate(new Date(parseInt(line.start_date) * 1000))}
            </CustomText>
            <CustomButton
                style={[styleButton.primaryTypeButton, styles.buttonBooking]}
                textSize={TextSize.S_XL}
                textButton="Добавить в лист ожидания"
            />
        </View>
    );
};
