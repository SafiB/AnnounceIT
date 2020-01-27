import query from '../helpers/user-query';
import Responses from '../helpers/responses';

const userDuplicate = (req, res, next) => {
  const duplicatedUser = query.findByEmail(req.body.email);
  if (duplicatedUser) {
    return Responses.failureResponse(res, 409, 'Email already exists');
  }
  return next();
};
export default userDuplicate;
