import * as Yup from 'yup';

export const validationSchemaReview = Yup.object().shape({
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
