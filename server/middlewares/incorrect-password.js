import hash from 'bcrypt-nodejs';
import userquery from '../helpers/user-query';
import Responses from '../helpers/responses';


const wrongpassword = (req, res, next) => {
  const user = userquery.findEmail(req.body.email);
  const comparePassword = hash.compareSync(req.body.password, user.password);
  if (!comparePassword) {
    return Responses.failure(res, 400, 'Wrong password');
  }
  return next();
};
export default wrongpassword;
