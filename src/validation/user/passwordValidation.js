import * as yup from "yup";

const passwordRule =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,16}$/;
export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(5, "Password should contain 5-16 characters")
    .max(16, "Password should contain 5-16 characters")
    .matches(
      passwordRule,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be 5-16 characters long."
    )
    .required("Required"),
});
