import * as yup from 'yup';

const registrationValidationScheme = yup.object().shape({
  name: yup.string()
    .required()
    .min(2, 'Minimum 2 letters are required.')
    .trim(),
  password: yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .max(12, 'Password is too long - should be 12 chars maximum.')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/, 'At least 1 letter and 1 number'),
  email: yup.string()
    .required('A valid email is required.')
    .email('A valid email is required.'),
});

const loginValidationScheme = yup.object().shape({
  password: yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .max(12, 'Password is too long - should be 12 chars maximum.')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/, 'At least 1 letter and 1 number'),
  email: yup.string()
    .required('A valid email is required.')
    .email('A valid email is required.'),
});

export {registrationValidationScheme, loginValidationScheme};