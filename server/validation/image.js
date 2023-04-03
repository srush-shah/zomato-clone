import joi from "joi";

export const ValidateImageObj = (imageFileObj) => {
  const Schema = joi.object({
    file: joi
      .object({
        mimetype: joi
          .string()
          .valid("image/png", "image/jpeg", "image/jpg")
          .required(),
        location: joi.string().required(),
      })
      .required(),
  });

  return Schema.validateAsync(imageFileObj);
};

export const ValidateImageId = (imageId) => {
  const Schema = joi.object({
    _id: joi.string().required(),
  });

  return Schema.validateAsync(imageId);
};
