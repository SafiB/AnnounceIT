/* eslint-disable max-len */
import hash from 'bcrypt-nodejs';
import tokensGenerator from '../helpers/token-generator';
import users from '../models/users';
import userquery from '../helpers/user-query';
import Responses from '../helpers/responses';

class usersController {
  static ThisAnApi(req, res) {
    return res.status(200).json({ status: 200, message: 'you are Welcome!' });
  }

  static signup(req, res) {
    const user = req.body;
    user.password = hash.hashSync(user.password);
    user.id = users.length + 1;
    userquery.createUser(user);
    const tokenData = {
      id: user.id, firstname: user.firstname, lastname: user.lastname, phonenumber: user.phonenumber, agency: user.agency, email: user.email, is_admin: user.is_admin,
    };
    const token = tokensGenerator(tokenData);
    const data = {
      token, id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email, phoneNumber: user.phoneNumber, agency: user.agency, address: user.address, is_admin: user.is_admin,
    };
    Responses.successResponse(res, 201, 'User created successfully', data);
  }

  static signin(req, res) {
    const user = userquery.findByEmail(req.body.email);
    const tokenData = {
      id: user.id, firstname: user.firstname, lastname: user.lastname, phonenumber: user.phonenumber, agency: user.agency, email: user.email, is_admin: user.is_admin,
    };
    const token = tokensGenerator(tokenData);
    const data = {
      token, id: user.id, firstname: user.firstname, lastname: user.lastname, phonenumber: user.phonenumber, agency: user.agency, email: user.email, phoneNumber: user.phoneNumber, address: user.address, is_admin: user.is_admin,
    };
    Responses.successResponse(res, 200, 'Logged in successfully', data);
  }
}
export default usersController;
