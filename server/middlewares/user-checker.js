import Responses from '../helpers/responses';

const check = (req, res, next) => {
  const currentUser = req.user;
  if (!currentUser.is_admin) {
    return Responses.failure(res, 403, 'You are not allowed this operation');
  }
  return next();
};
export default check;
