import * as Yup from 'yup';

export const validationSchemaContact = Yup.object().shape({
    name: Yup.string()
        .trim()
        .required('Имя обязательно для заполнения')
        .matches(/^[a-zA-Zа-яА-Я\s.]+$/, 'Введите корректные инициалы'),
    phone: Yup.string()
        .trim()
        .required('Номер телефона обязателен для заполнения')
        .matches(
            /^(\+7|8)\(?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/,
            'Введите корректный номер телефона: +7XXXXXXXXXX, 8XXXXXXXXXX или +7(XXX)XXX-XX-XX',
        ),
});
