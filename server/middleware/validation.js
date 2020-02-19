import Joi from '@hapi/joi';

function userSignUpValidation(data) {
  const schema = {
    firstname: Joi.string().max(30).required(),
    lastname: Joi.string().max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(5).max(8).required(),
    confirmpassword: Joi.string().min(5).max(8).required(),
  };
  const options = {
    language: {
      key: '{{key}} ',
    },
  };
  return Joi.validate(data, schema, options);
}
function userSignInValidation(data1) {
  const schema1 = {
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(5).max(8).required(),
  };
  const options = {
    language: {
      key: '{{key}} ',
    },
  };
  return Joi.validate(data1, schema1, options);
}

export default {
  userSignUpValidation,
  userSignInValidation,
};
