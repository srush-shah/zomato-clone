import joi from "joi";

export const ValidateImage = (imageFileObj) => {
  const Schema = joi.object({
    images: joi
      .array()
      .items(joi.object({ location: joi.string().required() })),
  });

  return Schema.validateAsync(imageFileObj);
};
