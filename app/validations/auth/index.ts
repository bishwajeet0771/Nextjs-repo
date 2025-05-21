import * as yup from "yup";
const nameRegex = /^[a-zA-Z\s.]*$/;
const itemSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .max(40, "Name should not exceed 40 characters")
    .matches(nameRegex, "Only letters and spaces are allowed"),
});
const schema = yup.object().shape({
  name: yup
    .string()
    .matches(nameRegex, "Numbers and special characters are not allowed")
    .max(40, "Name should not exceed 40 characters")
    .required("Full name is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid Email address"
    )
    .email("Please enter a valid Email address")
    .max(50, "Email should not exceed 50 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 Characters long")
    .max(40, "Password should not exceed 40 characters"),
  mobile: yup
    .number()
    .positive("Mobile number must be positive")
    .integer("Mobile number must be an integer")
    .typeError("Mobile number is required")
    .test("mvalid", "Enter Valid Mobile Number", (val) => {
      const strVal = val?.toString();
      return /^[6-9]\d{9}$/.test(strVal ?? "");
    })
    .test(
      "len",
      "Mobile number must be exactly 10 digits",
      (val) => val?.toString().length === 10
    )
    .required("Mobile number is required"),
});
const agentSchema = yup.object().shape({
  userName: yup
    .string()
    .max(40, "Name should not exceed 40 characters")
    .required("Full name is required"),

  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid Email address"
    )
    .max(50, "Email should not exceed 50 characters")
    .email("Please enter a valid Email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at-least 6 digits")
    .max(40, "Password should not exceed 40 characters"),
  mobile: yup
    .number()
    .positive("Mobile number must be positive")
    .integer("Mobile number must be an integer")
    .typeError("Mobile number is required")
    .test("mvalid", "Enter Valid Mobile Number", (val) => {
      const strVal = val?.toString();
      return /^[6-9]\d{9}$/.test(strVal ?? "");
    })
    .test(
      "len",
      "Mobile number must be exactly 10 digits",
      (val) => val?.toString().length === 10
    )
    .required("Mobile number is required"),
});
export const addressSchema = yup.object().shape({
  companyName: yup
    .string()
    .max(80, "Name should not exceed 80 characters")
    .required("Company name is required"),
  address: yup
    .string()
    .trim()
    .required("Address is required")
    .min(2, "Address must be at least 2 characters")
    .max(150, "Address should not exceed 150 characters"),
});
export const builderFirstStepSchema = yup.object().shape({
  userName: yup
    .string()
    .max(80, "Name should not exceed 80 characters")
    .required("Builder name is required")
    .matches(
      /^[^\\/:*?"<>|]+$/,
      'Name cannot contain the following characters: \\ / : * ? " < > |'
    ),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid Email address"
    )
    .email("Please enter a valid Email address")
    .max(50, "Email should not exceed 50 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at-least 6 digits")
    .max(40, "Password should not exceed 40 characters"),
  mobile: yup
    .number()
    .required("Mobile number is required")
    .positive("Mobile number must be positive")
    .integer("Mobile number must be an integer")
    .typeError("Mobile number is required")
    .test("mvalid", "Enter Valid Mobile Number", (val) => {
      const strVal = val?.toString();
      return /^[6-9]\d{9}$/.test(strVal ?? "");
    })
    .test(
      "len",
      "Mobile number must be exactly 10 digits",
      (val) => val?.toString().length === 10
    ),
});
export const agentSchema1 = yup.object().shape({
  address: yup
    .string()
    .trim()
    .min(2, "Address must be at least 2 characters")
    .required("Address is required")
    .max(150, "Address should not exceed 150 characters"),
  companyName: yup
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .required("Company name is required"),
});
const otpSchema = yup.object().shape({
  otp: yup
    .number()
    .typeError("OTP is required")
    .positive("OTP must be a positive number")
    .integer("OTP must be an integer")
    .min(1000, "OTP is required")
    .max(9999, "OTP is required")
    .required("OTP is required"),
});
const builderSchema = yup.object().shape({
  companyName: yup
    .string()
    .trim()
    .required("Builder company name is required")
    .min(2, "Builder company came by must be at least 2 characters")
    .max(80, "Name should not exceed 80 characters"),
  branch: yup
    .array()
    .min(1, "At least one branch must be selected")
    .required("At least one branch must be selected")
    .max(30, "Maximum 30 branches are allowed"),

  ceoName: yup
    .array()
    .of(itemSchema)
    .test("first-item-name-validation1", function (value) {
      const { path, createError } = this;

      if (value && value.length > 0) {
        // Validate the first item (required)
        const firstItemName = value[0].name;
        if (!firstItemName) {
          return createError({
            path: `${path}[0].name`,
            message: "CEO name is required",
          });
        }

        // Validation function for regex and length
        const validateName = (name: string, index: number) => {
          if (!nameRegex.test(name)) {
            return createError({
              path: `${path}[${index}].name`,
              message: "Only letters and spaces are allowed",
            });
          }
          if (name.length > 40) {
            return createError({
              path: `${path}[${index}].name`,
              message: "Name should not exceed 40 characters",
            });
          }
        };

        // Validate the first item
        const firstItemError = validateName(firstItemName, 0);
        if (firstItemError) return firstItemError;

        // Validate the rest of the items (if 'name' is present)
        for (let i = 1; i < value.length; i++) {
          const currentItemName = value[i].name;
          if (currentItemName) {
            const error = validateName(currentItemName, i);
            if (error) return error;
          }
        }
      }

      return true; // If the array is empty or all validations pass
    }),

  foundedBy: yup
    .array()
    .of(itemSchema)
    .test("first-item-name-validation2", function (value) {
      const { path, createError } = this;

      if (value && value.length > 0) {
        // Validate the first item (required)
        const firstItemName = value[0].name;
        if (!firstItemName) {
          return createError({
            path: `${path}[0].name`,
            message: "Founded by name is required",
          });
        }

        // Validation function for regex and length
        const validateName = (name: string, index: number) => {
          if (!nameRegex.test(name)) {
            return createError({
              path: `${path}[${index}].name`,
              message: "Only letters and spaces are allowed",
            });
          }
          if (name.length > 40) {
            return createError({
              path: `${path}[${index}].name`,
              message: "Name should not exceed 40 characters",
            });
          }
        };

        // Validate the first item
        const firstItemError = validateName(firstItemName, 0);
        if (firstItemError) return firstItemError;

        // Validate the rest of the items (if 'name' is present)
        for (let i = 1; i < value.length; i++) {
          const currentItemName = value[i].name;
          if (currentItemName) {
            const error = validateName(currentItemName, i);
            if (error) return error;
          }
        }
      }

      return true; // If the array is empty or all validations pass
    }),

  managingDirectorName: yup
    .array()
    .of(itemSchema)
    .test("first-item-name-validation3", function (value) {
      const { path, createError } = this;

      if (value && value.length > 0) {
        // Validate the first item (required)
        const firstItemName = value[0].name;
        if (!firstItemName) {
          return createError({
            path: `${path}[0].name`,
            message: "Managing Director name is required",
          });
        }

        // Validation function for regex and length
        const validateName = (name: string, index: number) => {
          if (!nameRegex.test(name)) {
            return createError({
              path: `${path}[${index}].name`,
              message: "Only letters and spaces are allowed",
            });
          }
          if (name.length > 40) {
            return createError({
              path: `${path}[${index}].name`,
              message: "Name should not exceed 40 characters",
            });
          }
        };

        // Validate the first item
        const firstItemError = validateName(firstItemName, 0);
        if (firstItemError) return firstItemError;

        // Validate the rest of the items (if 'name' is present)
        for (let i = 1; i < value.length; i++) {
          const currentItemName = value[i].name;
          if (currentItemName) {
            const error = validateName(currentItemName, i);
            if (error) return error;
          }
        }
      }

      return true; // If the array is empty or all validations pass
    }),
  officeContact: yup
    .string()
    .required("Office contact number is required")
    .matches(/^[\d()+-\s]+$/, "Invalid office contact number")
    .max(17, "Mobile number should not exceed 17 digits"),
  companyStartDate: yup.date().required("Company start date is required"),
});
export const builderSchemaIndex1 = yup.object().shape({
  address: yup
    .string()
    .min(1, "Office Address is required")
    .max(150, "Address should not exceed 150 characters"),
  state: yup.string().trim().required("State is required"),
  city: yup.string().trim().required("City is required"),
  pincode: yup
    .number()
    .required("PIN code is required")
    .test("len", "Valid 6-digit PIN code is required", (val) => {
      return val !== undefined && val >= 100000 && val <= 999999;
    })
    .typeError("PIN code is required") // Ensures that the value is a number
    .integer("PIN code must be an integer"),
});

const textAreaScema = yup.object().shape({
  vission: yup
    .string()
    .max(5000, "Vision should not exceed 5000 characters")
    .required("Company Vision is required"),
  mission: yup
    .string()
    .max(5000, "Description should not exceed 5000 characters")
    .required("Builder's Description is required"),
});
export const MAX_LENTH_TEXT = 41;
export const MAX_LENTH_MOBILE = 10;
export const MAX_LENGTH_EMAIL = 51;
export const MAX_LENGTH_COMPANY_NAME = 81;
export const MAX_LENGTH_ADDRESS = 151;
export {
  schema as individualSchema,
  agentSchema,
  otpSchema,
  builderSchema,
  textAreaScema,
};
