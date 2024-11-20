import React from 'react';
import {Modal, ModalProps, View} from 'react-native';
import {TextWeight, TextSize} from '@/shared/config/font';
import {CustomText} from '@/shared/ui/customText';
import {styles} from './ReviewModalStyle';
import {ReviewForm} from '@/features/reviews';

type ReviewModalType = ModalProps & {
    userInitials: string;
    existingReview?: {
        rating: number;
        content: string;
    };
    visible: boolean;
    onClose: () => void;
    onReviewSubmit: (rating: number, reviewText: string) => void;
    onReviewDelete: () => void;
};

export const ReviewModal = (props: ReviewModalType) => {
    const {
        userInitials,
        visible,
        existingReview,
        onClose,
        onReviewSubmit,
        onReviewDelete,
        ...res
    } = props;

    return (
        <Modal {...res} transparent visible={visible} onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <CustomText
                        weight={TextWeight.BOLD}
                        size={TextSize.S_LG}
                        style={styles.title}>
                        {existingReview
                            ? 'Редактировать отзыв'
                            : 'Оставить отзыв'}
                    </CustomText>
                    <ReviewForm
                        existingReview={existingReview}
                        onClose={onClose}
                        onReviewDelete={onReviewDelete}
                        onReviewSubmit={onReviewSubmit}
                    />
                </View>
            </View>
        </Modal>
    );
};
