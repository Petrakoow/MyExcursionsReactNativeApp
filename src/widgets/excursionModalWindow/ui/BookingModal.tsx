import React from 'react';
import { Modal, View, ModalProps, ScrollView } from 'react-native';
import { TourTypeRequest } from '@/shared/api';
import { styles } from './BookingModalStyle';

import { OrderOption } from './OrderOption';
import { CustomText } from '@/shared/ui/customText';
import { CloseButton } from './CloseButton';
import { getUserStatus } from '@/shared/db/models/user';

type BookingModalProps = ModalProps & {
    options: TourTypeRequest;
    onClose: () => void;
};

export const BookingModal = ({
    visible,
    onClose,
    options,
    ...res
}: BookingModalProps) => {
    const isUser = getUserStatus();
    return (
        <Modal transparent visible={visible} onRequestClose={onClose} {...res}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <CloseButton onClose={onClose} />
                    <ScrollView style={[styles.content, styles.contentScroll]}>
                        {options.order_options.length > 0 ? (
                            options.order_options.map((orderOption, index) => (
                                <OrderOption key={index} orderOption={orderOption} excursionId={options.id} isUser={isUser}/>
                            ))
                        ) : (
                            <CustomText>Нет доступных опций для бронирования</CustomText>
                        )}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};
