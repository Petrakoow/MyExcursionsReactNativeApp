import * as Yup from 'yup';

export const validationSignInSchema = Yup.object().shape({
    emailOrUsername: Yup.string()
        .required('Email or username required field')
        .matches(
            /^[a-zA-Z0-9]+$|^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Enter a valid email or username',
        )
        .min(3, 'Email or username cannot be so small'),
    password: Yup.string()
        .trim()
        .min(8, 'Password is too short!')
        .matches(/\d/, 'Password must contain at least one number')
        .required('Password is required'),
});
