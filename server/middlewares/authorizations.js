/* eslint-disable radix */
import announceQuery from '../helpers/announce-query';


const authorize = (req, res, next) => {
  const announcement = announceQuery.findId(parseInt(req.params.id));
  const currentUser = req.user;
  if (announcement.id !== currentUser.id) {
    return res.status(401).json({
      status: 'error',
      error: 'Access has been denied',
    });
  }
  return next();
};
export default authorize;
