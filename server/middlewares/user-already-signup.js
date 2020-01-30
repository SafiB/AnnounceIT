
import userquery from '../helpers/user-query';

const userDuplicate = (req, res, next) => {
  const duplicatedUser = userquery.findEmail(req.body.email);
  if (duplicatedUser) {
    return res.status(409).json({
      status: 'error',
      error: 'This email already exist',
    });
  }
  return next();
};
export default userDuplicate;
