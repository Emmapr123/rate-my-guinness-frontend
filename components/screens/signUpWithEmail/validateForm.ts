function subtractYears(date: Date, years: number) {
  date.setFullYear(date.getFullYear() - years);
  return date;
}

export const validateForm = (
  username?: string,
  birthday?: string,
  email?: string,
  password?: string,
  confirmPassword?: string
) => {
  let nameError = "";
  let birthdayError = "";
  let emailError = "";
  let passwordError = "";
  let confirmPasswordError = "";

  if (!username) {
    nameError = "Please enter a username";
  }
  if (!birthday) {
    birthdayError = "Please enter a birthday";
  }
  if (birthday && new Date(birthday) > subtractYears(new Date(), 18)) {
    birthdayError = "You must be 18 or older to use this app";
  }
  // TODO: Add email validation regex
  if (!email) {
    emailError = "Please enter an email";
  }
  if (!password) {
    passwordError = "Please enter a password";
  }
  if (
    (password && password.length < 8) ||
    (password && /"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/.test(password))
  ) {
    passwordError =
      "Password must be at least 8 characters and contain at least one number";
  }
  if (password !== confirmPassword) {
    confirmPasswordError = "Passwords do not match";
  }

  return {
    nameError,
    birthdayError,
    emailError,
    passwordError,
    confirmPasswordError,
  };
};
