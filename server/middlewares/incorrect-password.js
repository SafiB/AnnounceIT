import hash from 'bcrypt-nodejs';
import userquery from '../helpers/user-query';


const wrongpassword = (req, res, next) => {
  const user = userquery.findEmail(req.body.email);
  const comparePassword = hash.compareSync(req.body.password, user.password);
  if (!comparePassword) {
    return res.status(404).json({
      status: 'error',
      error: 'Wrong password',
    });
  }
  return next();
};
export default wrongpassword;
