import joi from "joi";

export const ValidateOrderDetails = (orderDetails) => {
  const Schema = joi.object({
    food: joi.string().required(),
    quantity: joi.number().required(),
    paymode: joi.string().required(),
    status: joi.string(),
    paymentDetails: joi
      .object({
        itemTotal: joi.number().required(),
        promo: joi.number().required(),
        tax: joi.number().required(),
      })
      .required(),
  });

  return Schema.validateAsync(orderDetails);
};
