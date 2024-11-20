import React, {useEffect, useState} from 'react';
import {Modal, ModalProps, StyleSheet, TextInput, View} from 'react-native';
import {TextWeight, TextSize} from '@/shared/config/font';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {CustomText} from '@/shared/ui/customText';
import {palette} from '@/shared/config/colors';
import {MODAL_WIDTH, moderateScale} from '@/shared/config/dimensions';
import {Review} from '@/shared/db/models';

type ReviewModalType = ModalProps & {
    userId: string;
    excursionId: number;
    userInitials: string;
    existingReview?: Review; // Passing existingReview as a prop
    onClose: () => void;
    onReviewSubmit: (rating: number, reviewText: string) => void;
    onReviewDelete: () => void;
};

export const ReviewModal = (props: ReviewModalType) => {
    const {
        userId,
        excursionId,
        userInitials,
        visible,
        onClose,
        onReviewSubmit,
        onReviewDelete,
        existingReview, // Use existingReview directly as a prop
        ...res
    } = props;

    // Form state
    const [rating, setRating] = useState<string>('');
    const [reviewText, setReviewText] = useState<string>('');
    const [error, setError] = useState<string>(''); // State for error messages

    // Update form state when `existingReview` changes
    useEffect(() => {
        if (existingReview) {
            setRating(existingReview.rating.toString());
            setReviewText(existingReview.reviewText);
        } else {
            setRating('');
            setReviewText('');
        }
        setError(''); // Clear errors when modal resets
    }, [existingReview]);

    const validateForm = (): boolean => {
        const parsedRating = parseInt(rating, 10);
        if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
            setError('Рейтинг должен быть числом от 1 до 5.');
            return false;
        }
        if (reviewText.trim().length === 0) {
            setError('Текст отзыва не может быть пустым.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onReviewSubmit(parseInt(rating, 10), reviewText.trim());
        }
    };

    const handleDelete = () => {
        onReviewDelete(); // Call the parent's delete handler
    };

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
                    <View>
                        <CustomText
                            size={TextSize.S_BASE}
                            weight={TextWeight.BOLD}>
                            Рейтинг:
                        </CustomText>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Оценка (1-5)"
                            value={rating}
                            onChangeText={value => {
                                const numericValue = value.replace(
                                    /[^0-9]/g,
                                    '',
                                );
                                setRating(numericValue.slice(0, 1));
                            }}
                        />
                    </View>
                    <View>
                        <CustomText
                            size={TextSize.S_BASE}
                            weight={TextWeight.BOLD}>
                            Текст отзыва:
                        </CustomText>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            multiline
                            placeholder="Текст отзыва"
                            value={reviewText}
                            onChangeText={setReviewText}
                        />
                    </View>
                    {error ? (
                        <CustomText
                            size={TextSize.S_BASE}
                            style={styles.errorText}>
                            {error}
                        </CustomText>
                    ) : null}
                    <View style={styles.buttonContainer}>
                        {existingReview && (
                            <CustomButton
                                textButton="Удалить"
                                onPress={handleDelete}
                                style={styleButton.firstTypeButton}
                            />
                        )}
                        <CustomButton
                            textButton="Сохранить"
                            onPress={handleSubmit}
                            style={styleButton.firstTypeButton}
                        />
                        <CustomButton
                            textButton="Отменить"
                            onPress={onClose}
                            style={styleButton.secondTypeButton}
                            textColor={palette.light.textPrimary}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: palette.light.modalBackground,
    },
    container: {
        width: MODAL_WIDTH,
        padding: moderateScale(20),
        backgroundColor: palette.light.background,
        borderRadius: moderateScale(10),
    },
    title: {
        marginBottom: moderateScale(10),
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    errorText: {
        color: palette.light.warning,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateScale(10),
    },
});
