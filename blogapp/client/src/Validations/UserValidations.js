import * as yup from "yup";

export const userRegistrationSchemaValidation = yup.object().shape({
    username: yup
        .string()
        .required("Name is required"),
    userEmail: yup
        .string()
        .email("Not valid email format")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords don't match")
});

export const userLoginSchemaValidation = yup.object().shape({
    userEmail: yup
        .string()
        .email("Not valid email format")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required"),
});

