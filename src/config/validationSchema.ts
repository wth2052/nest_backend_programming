import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODEMAILER_SERVICE: Joi.string().required(),
  NODEMAILER_EMAIL: Joi.string().required(),
  NODEMAILER_PASSWORD: Joi.string().required(),
  NODEMAILER_BASEURL: Joi.string().required().uri(),
});
