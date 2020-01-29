import users from '../models/users';

class userquery {
  static createUser(testdata) {
    return users.push(testdata);
  }

  static findByEmail(email) {
    return users.find(u => u.email === email);
  }
}
export default userquery;
