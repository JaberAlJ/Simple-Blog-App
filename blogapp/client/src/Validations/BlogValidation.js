import * as yup from "yup";

export const blogSchemaValidation = yup.object().shape({
    content: yup
        .string()
        .required("Blog content is required")
})