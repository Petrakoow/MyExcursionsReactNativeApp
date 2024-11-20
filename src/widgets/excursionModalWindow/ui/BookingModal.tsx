import React from 'react';
import {View, Modal, ScrollView, ModalProps} from 'react-native';
import {TourTypeRequest} from '@/shared/api/sputnik8';
import {styles} from './BookingModalStyle';
import {getTicketTypeLabel} from '@/shared/api/sputnik8';
import {CustomText} from '@/shared/ui/customText';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {TextSize, TextWeight} from '@/shared/config/font';
type BookingModalProps = ModalProps & {
    orderOptions: TourTypeRequest['order_options'];
    onClose: () => void;
};

export const BookingModal = (props: BookingModalProps) => {
    const {visible, onClose, orderOptions, ...res} = props;
    return (
        <Modal transparent visible={visible} onRequestClose={onClose} {...res}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={[styles.content, styles.closeContent]}>
                        <CustomButton
                            textButton="Закрыть"
                            onPress={onClose}
                            style={[
                                styleButton.primaryTypeButton,
                                styles.closeButton,
                            ]}
                            textSize={TextSize.S_BASE}
                        />
                    </View>
                    <ScrollView style={[styles.content, styles.contentScroll]}>
                        {orderOptions.map((option, index) => (
                            <View key={index} style={styles.optionContainer}>
                                <CustomText
                                    size={TextSize.S_2XL}
                                    weight={TextWeight.BOLD}
                                    style={[
                                        styles.optionTitle,
                                        styles.markHeaderTitle,
                                    ]}>
                                    Вариант: {option.title}
                                </CustomText>
                                <CustomText>
                                    <CustomText style={styles.markTitle}>
                                        Тип билета:{' '}
                                    </CustomText>
                                    {getTicketTypeLabel(option.ticket_type)}
                                </CustomText>
                                <CustomText>
                                    <CustomText style={styles.markTitle}>
                                        Продолжительность:{' '}
                                    </CustomText>
                                    {option.duration.name}
                                </CustomText>
                                {option.order_lines.map((line, lineIndex) => (
                                    <View
                                        key={lineIndex}
                                        style={styles.orderLine}>
                                        <CustomText>
                                            <CustomText
                                                style={styles.markTitle}>
                                                Цена:{' '}
                                            </CustomText>
                                            {line.price > 0
                                                ? line.price
                                                : 'не указана'}
                                        </CustomText>
                                        <CustomText>{line.title}</CustomText>

                                        {line.discount &&
                                            Object.keys(line.discount).length >
                                                0 && (
                                                <CustomText>
                                                    Скидка:{' '}
                                                    {line.discount.value}% (до{' '}
                                                    {
                                                        line.discount
                                                            .expiration_date
                                                    }
                                                    )
                                                </CustomText>
                                            )}
                                        <CustomText style={styles.marginText}>
                                            Цена рассчитывается {line.price_per}
                                        </CustomText>
                                        <CustomButton
                                            style={[
                                                styleButton.primaryTypeButton,
                                                styles.buttonBooking,
                                            ]}
                                            textSize={TextSize.S_XL}
                                            textButton="Забронировать"
                                        />
                                    </View>
                                ))}
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};
