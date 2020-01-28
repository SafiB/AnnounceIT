import hash from 'bcrypt-nodejs';
import userquery from '../helpers/user-query';
import Responses from '../helpers/responses';
import { request } from 'express';

const wrongpassword = (req, res, next) => {
  console.log(req.body);
  const user = userquery.findByEmail(req.body.email);
  const comparePassword = hash.compareSync(req.body.password, user.password);
  if (!comparePassword) {
    return Responses.failureResponse(res, 400, 'Wrong password');
  }
  return next();
};
export default wrongpassword;
