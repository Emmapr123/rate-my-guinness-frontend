import { ValidationErrorType } from "./types";

export const validateForm = (
  rating: number,
  // title?: string,
  // description?: string
): ValidationErrorType => {
  let ratingError;
  // let titleError;
  // let descriptionError;

  if (rating < 1) {
    ratingError = "Your Rating must be at least a 1, it can't be THAT bad";
  }

  // if (!title) {
  //   titleError = "Don't forget to add a title!";
  // }

  // if (!description) {
  //   descriptionError = "Don't forget to add a description!";
  // }

  return {
    ratingError,
    // titleError,
    // descriptionError,
  };
};
