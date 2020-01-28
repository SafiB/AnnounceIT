import userRules from '../validations/user-validations';
import Responses from '../helpers/responses';

const validate = (req, res, next) => {
  const user = req.body;
  const {
    // eslint-disable-next-line camelcase
    firstname, lastname, phoneNumber, agency, email, password, is_admin,
  } = user;
  const validateUser = userRules.validate({
    firstname, lastname, phoneNumber, agency, email, password, is_admin,
  });
  if (validateUser.error) {
    return Responses.failureResponse(res, 400, validateUser.error.details[0].message);
  }
  return next();
};
export default validate;
