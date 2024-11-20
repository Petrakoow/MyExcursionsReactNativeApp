import React from 'react';
import {Modal, ModalProps, StyleSheet, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {TextWeight, TextSize} from '@/shared/config/font';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {CustomText} from '@/shared/ui/customText';
import {palette} from '@/shared/config/colors';
import {
    CONTENT_RADIUS,
    GAP_BASE,
    MODAL_WIDTH,
    moderateScale,
} from '@/shared/config/dimensions';
import {CustomInput} from '@/shared/ui/customInput';

type ReviewModalType =  ModalProps & {
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

const validationSchema = Yup.object().shape({
    rating: Yup.number()
        .required('Рейтинг обязателен')
        .min(1, 'Рейтинг должен быть не менее 1')
        .max(5, 'Рейтинг должен быть не более 5'),
    reviewText: Yup.string()
        .trim()
        .min(10, 'Текст отзыва слишком короткий (мин. 10 символов)')
        .max(500, 'Текст отзыва слишком длинный (макс. 500 символов)')
        .optional(),
});

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

    const initialValues = {
        rating: existingReview?.rating.toString() || '',
        reviewText: existingReview?.content || '',
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
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log(values);
                            onReviewSubmit(Number(values.rating), values.reviewText);
                        }}>
                        {({
                            handleChange,
                            handleSubmit,
                            errors,
                            values,
                            touched,
                        }) => (
                            <>
                                <CustomInput
                                    label="Рейтинг"
                                    labelSize={TextSize.S_BASE}
                                    style={styles.input}
                                    keyboardType="numeric"
                                    placeholder="Оценка (1-5)"
                                    value={values.rating}
                                    onChangeText={handleChange('rating')}
                                />
                                {touched.rating && errors.rating && (
                                    <CustomText
                                        size={TextSize.S_BASE}
                                        style={styles.errorText}>
                                        {errors.rating}
                                    </CustomText>
                                )}

                                <CustomInput
                                    label="Текст отзыва"
                                    labelSize={TextSize.S_BASE}
                                    style={[styles.input, styles.textArea]}
                                    multiline
                                    placeholder="Очень понравилась поездка..."
                                    value={values.reviewText}
                                    onChangeText={handleChange('reviewText')}
                                />
                                {touched.reviewText && errors.reviewText && (
                                    <CustomText
                                        size={TextSize.S_BASE}
                                        style={styles.errorText}>
                                        {errors.reviewText}
                                    </CustomText>
                                )}

                                <View style={styles.buttonContainer}>
                                    <CustomButton
                                        textButton="Сохранить"
                                        textSize={TextSize.S_BASE}
                                        onPress={() => handleSubmit()}
                                        style={styleButton.primaryTypeButton}
                                    />
                                    {existingReview && (
                                        <CustomButton
                                            textButton="Удалить"
                                            textSize={TextSize.S_BASE}
                                            onPress={onReviewDelete}
                                            style={styleButton.warningTypeButton}
                                        />
                                    )}
                                    <CustomButton
                                        textButton="Отменить"
                                        textSize={TextSize.S_BASE}
                                        onPress={onClose}
                                        style={styleButton.secondaryTypeButton}
                                        textColor={palette.light.textPrimary}
                                    />
                                </View>
                            </>
                        )}
                    </Formik>
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
        gap: GAP_BASE,
    },
    title: {
        marginBottom: moderateScale(10),
    },
    input: {
        paddingVertical: 3,
        paddingHorizontal: moderateScale(12),
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
        borderRadius: CONTENT_RADIUS - 20,
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
