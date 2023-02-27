import { Review } from "./types";

export const getAverageRating = (reviews: Review[]): number => {
  let total = 0;
  reviews.forEach((r) => {
    total += r.rating;
  });
  return Math.round(total / reviews.length);
};
