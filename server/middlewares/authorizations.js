/* eslint-disable radix */
import query from '../helpers/announce-query';
import Responses from '../helpers/responses';

const authorize = (req, res, next) => {
  const announcement = query.findById(parseInt(req.params.id));
  const currentUser = req.user;
  if (announcement.id !== currentUser.id) {
    return Responses.failureResponse(res, 401, 'Access Denied');
  }
  return next();
};
export default authorize;
