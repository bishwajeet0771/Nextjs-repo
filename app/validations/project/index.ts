import * as yup from "yup";
const ratingSchema = yup.object().shape({
  review: yup.string().max(400, "Review should not exceed 400 characters"),

  rating: yup
    .number()
    .min(1, "Note: Ratings are required. Please give the project rating!")
    .max(5, " Note: Ratings are required. Please give the project rating!")
    .required("Note: Ratings are required. Please give the project rating!"),
});
const ratingSchema2 = yup.object().shape({
  review: yup.string().max(400, "Review should not exceed 400 characters"),
});

const reqSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z\s]*$/, "Only letters and spaces are allowed")
    .max(20, "Name should not exceed 20 characters")
    .required("Enter Your Name"),
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email")
    .required("Enter Your Email")
    .email("Invalid email"),
  mobile: yup
    .number()
    .positive("Contact number must be positive")
    .integer("Contact number must be an integer")
    .typeError("Enter Your Mobile Number")
    .test("mvalid", "Invalid mobile number", (val) => {
      const strVal = val?.toString();
      return /^[6-9]\d{9}$/.test(strVal ?? "");
    })
    .test(
      "len",
      "Contact number must be exactly 10 digits",
      (val) => val?.toString().length === 10
    )
    .required("Enter Your Mobile Number"),
});
const qnaSchema = yup.object().shape({
  question: yup
    .string()
    .required("Question is required")
    .max(1500, "Question should not exceed 1500 characters"),
});
export { ratingSchema, reqSchema, qnaSchema, ratingSchema2 };
