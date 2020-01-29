/* eslint-disable radix */
import announceQuery from '../helpers/announce-query';
import Responses from '../helpers/responses';

const authorize = (req, res, next) => {
  const announcement = announceQuery.findId(parseInt(req.params.id));
  const currentUser = req.user;
  if (announcement.id !== currentUser.id) {
    return Responses.failure(res, 401, 'Access Denied');
  }
  return next();
};
export default authorize;
