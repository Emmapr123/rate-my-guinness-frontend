import { ValidationErrorType } from "./types";

export const validateForm = (
  email?: string,
  password?: string
): ValidationErrorType => {
  let emailError;
  let passwordError;

  if (!email) {
    emailError = "Email required to log in";
  }

  if (!password) {
    passwordError = "Password required to log in";
  }

  return {
    emailError,
    passwordError,
  };
};
