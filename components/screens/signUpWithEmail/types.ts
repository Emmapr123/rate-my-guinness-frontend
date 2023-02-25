export interface User {
  id?: string;
  username?: string;
  birthday?: string;
  email?: string;
  password?: string;
}

export interface ValidationErrorType {
  nameError?: string;
  birthdayError?: string;
  emailError?: string;
  passwordError?: string;
  confirmPasswordError?: string;
}
