import React from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import {CustomInput} from '@/shared/ui/customInput';
import {CustomText} from '@/shared/ui/customText';
import {TextSize} from '@/shared/config/font';
import {CustomButton, styleButton} from '@/shared/ui/customButton';
import {styles} from './ReviewFormStyle';
import {validationSchemaReview} from '../model/validation';
import {palette} from '@/shared/config/colors';

type ReviewFormType = {
    existingReview?: {
        rating: number;
        content: string;
    };
    onClose: () => void;
    onReviewSubmit: (rating: number, reviewText: string) => void;
    onReviewDelete: () => void;
};

export const ReviewForm = (props: ReviewFormType) => {
    const {existingReview, onClose, onReviewDelete, onReviewSubmit} = props;
    const initialValues = {
        rating: existingReview?.rating.toString() || '',
        reviewText: existingReview?.content || '',
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchemaReview}
            onSubmit={values => {
                onReviewSubmit(Number(values.rating), values.reviewText);
            }}>
            {({handleChange, handleSubmit, errors, values, touched}) => (
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
    );
};
