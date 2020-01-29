
import Responses from '../helpers/responses';
import userquery from '../helpers/user-query';

const userDuplicate = (req, res, next) => {
  const duplicatedUser = userquery.findEmail(req.body.email);
  if (duplicatedUser) {
    return Responses.failure(res, 409, 'This email already exists');
  }
  return next();
};
export default userDuplicate;
