import Joi from '@hapi/joi';

const userRules = Joi.object().keys({
  firstname: Joi.string().trim(true).regex(/^[a-zA-Z]{3,30}$/).min(3)
    .max(30)
    .required(),
  lastname: Joi.string().trim(true).regex(/^[a-zA-Z]{3,30}$/).min(3)
    .max(30)
    .required(),
  phoneNumber: Joi.string().trim(true).min(10).required(),
  agency: Joi.string().trim(true).regex(/^[a-zA-Z]{3,30}$/).min(3)
    .max(30),
  email: Joi.string().trim(true).email().required(),
  password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required().options({ language: { string: { regex: { base: 'must include uppercase, numbers and the length not less than 8!' } } } }),
  is_admin: Joi.boolean().valid([false, true]),
});

export default userRules;
