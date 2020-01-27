import query from '../helpers/user-query';
import Responses from '../helpers/responses';

const userDuplication = (req, res, next) => {
  const duplicatedUser = query.findByEmail(req.body.email);
  if (duplicatedUser) {
    return Responses.failureResponse(res, 409, 'Email already exists');
  }
  return next();
};
export default userDuplication;
