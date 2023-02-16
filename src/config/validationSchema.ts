import * as Joi from 'joi';

export const validationSchema = Joi.object({
  MAIL_SERVICE: Joi.string().required(),
  MAIL_ID: Joi.string().required(),
  MAIL_PASSWORD: Joi.string().required(),
  MAIL_BASE_URL: Joi.string().required().uri(),
});
