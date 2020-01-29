import users from '../models/users';

class userquery {
  static createUsers(testdata) {
    return users.push(testdata);
  }

  static findEmail(email) {
    return users.find(u => u.email === email);
  }
}
export default userquery;
