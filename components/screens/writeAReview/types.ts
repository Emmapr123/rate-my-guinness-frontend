export interface ValidationErrorType {
  ratingError?: string | undefined;
  titleError?: string | undefined;
  descriptionError?: string | undefined;
}

export interface CreateReview {
  title?: string;
  description?: string;
}