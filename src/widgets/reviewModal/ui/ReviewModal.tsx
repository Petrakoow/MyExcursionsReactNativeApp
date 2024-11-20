import React, {useEffect, useState} from 'react';
import {Modal, ModalProps, StyleSheet, TextInput, View} from 'react-native';
import {TextWeight, TextSize} from '@/shared/config/font';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {CustomText} from '@/shared/ui/customText';
import {palette} from '@/shared/config/colors';
import {MODAL_WIDTH, moderateScale} from '@/shared/config/dimensions';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Review} from '@/shared/db/models';
import {useDatabase} from '@/app/providers';

type ReviewModalType = ModalProps & {
    userId: string;
    excursionId: number;
    userInitials: string;
    onClose: () => void;
    onReviewSubmit: () => void;
};

export const ReviewModal = (props: ReviewModalType) => {
    const {
        userId,
        excursionId,
        userInitials,
        visible,
        onClose,
        onReviewSubmit,
        ...res
    } = props;

    const [existingReview, setExistingReview] = useState<Review | undefined>(
        undefined,
    );

    const database = useDatabase();

    useEffect(() => {
        const review = database.objectForPrimaryKey<Review>('Review', userId);
        setExistingReview(review || undefined);
    }, [database, userId]);

    const formik = useFormik({
        initialValues: {
            rating: existingReview?.rating?.toString() || '0',
            reviewText: existingReview?.reviewText || '',
        },
        validationSchema: Yup.object({
            rating: Yup.number()
                .required('Рейтинг обязателен')
                .min(1, 'Рейтинг должен быть от 1 до 5')
                .max(5, 'Рейтинг должен быть от 1 до 5'),
            reviewText: Yup.string()
                .required('Текст отзыва обязателен')
                .max(500, 'Максимальная длина текста отзыва - 500 символов'),
        }),
        enableReinitialize: true,
        onSubmit: values => {
            database.write(() => {
                database.create(
                    'Review',
                    {
                        userId,
                        excursionId,
                        userInitials,
                        rating: parseInt(values.rating, 10),
                        reviewText: values.reviewText,
                        reviewDate: new Date(),
                    },
                    true,
                );
            });
            onReviewSubmit();
            onClose();
        },
    });

    const handleDelete = () => {
        if (existingReview) {
            database.write(() => {
                database.delete(existingReview);
            });
            onReviewSubmit();
            onClose();
        }
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
                            value={formik.values.rating}
                            onChangeText={value => {
                                const numericValue = Math.max(
                                    1,
                                    Math.min(5, parseInt(value || '0', 10)),
                                );
                                formik.setFieldValue(
                                    'rating',
                                    numericValue.toString(),
                                );
                            }}
                            onBlur={formik.handleBlur('rating')}
                        />
                        {formik.touched.rating && formik.errors.rating && (
                            <CustomText style={styles.errorText}>
                                {formik.errors.rating}
                            </CustomText>
                        )}
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
                            value={formik.values.reviewText}
                            onChangeText={formik.handleChange('reviewText')}
                            onBlur={formik.handleBlur('reviewText')}
                        />
                        {formik.touched.reviewText &&
                            formik.errors.reviewText && (
                                <CustomText style={styles.errorText}>
                                    {formik.errors.reviewText}
                                </CustomText>
                            )}
                    </View>
                    <View style={styles.buttonContainer}>
                        {existingReview && (
                            <CustomButton
                                textButton="Удалить"
                                onPress={handleDelete}
                                style={styleButton.secondTypeButton}
                                textColor={palette.light.warning}
                            />
                        )}
                        <CustomButton
                            textButton="Сохранить"
                            onPress={() => formik.handleSubmit}
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateScale(10),
    },
    errorText: {
        color: palette.light.warning,
        fontSize: 12,
        marginTop: -5,
        marginBottom: 10,
    },
});
