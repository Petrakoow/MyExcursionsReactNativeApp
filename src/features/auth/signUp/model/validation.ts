import * as Yup from 'yup';

export const validationSignUpSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Enter a valid email'),
    username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters long')
        .max(20, 'Username cannot exceed 20 characters')
        .matches(
            /^[a-zA-Z0-9]+$/,
            'Username can only contain letters and numbers',
        ),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[a-zA-Z]/, 'Password must contain at least one letter'),
    confirmPassword: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
});
