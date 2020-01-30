/* eslint-disable max-len */
import hash from 'bcrypt-nodejs';
import users from '../models/users';
import userquery from '../helpers/user-query';


class usersController {
  static ThisAnApi(req, res) {
    return res.status(200).json({ status: 200, message: 'you are Welcome!' });
  }

  static signup(req, res) {
    const user = req.body;
    user.password = hash.hashSync(user.password);
    user.id = users.length + 1;
    userquery.createUsers(users);
    return res.status(201).json({
      status: 'success',
      data: { user },
    });
  }

  static signin(req, res) {
    const user = userquery.findEmail(req.body.email);
    return res.status(200).json({
      status: 'success',
      data: { user },
    });
  }
}
export default usersController;
