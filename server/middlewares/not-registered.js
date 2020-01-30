import userquery from '../helpers/user-query';

const userExist = (req, res, next) => {
  const user = userquery.findEmail(req.body.email);
  if (!user) {
    return res.status(404).json({
      status: 'error',
      error: 'This user is not registered',
    });
  }
  return next();
};
export default userExist;
