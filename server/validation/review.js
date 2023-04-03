import joi from "joi";

export const ValidateReviewId = (reviewId) => {
  const Schema = joi.object({
    _id: joi.string().required(),
  });

  return Schema.validateAsync(reviewId);
};

export const ValidateReviewObj = (reviewObj) => {
  const Schema = joi.object({
    food: joi.string().required(),
    restaurant: joi.string().required(),
    user: joi.string().required(),
    rating: joi.number().required(),
    reviewText: joi.string().required(),
    isRestaurantReview: joi.boolean(),
    isFoodReview: joi.boolean(),
    photos: joi.array().items(joi.string()),
  });

  return Schema.validateAsync(reviewObj);
};
