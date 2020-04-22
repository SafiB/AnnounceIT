import moment from 'moment';
import validation from '../middleware/validation';
import codes from '../utils/statusCodes';
import messages from '../utils/messages';
import helper from '../utils/helper';
import query from '../model/query';

const userSignUp = async (req, res) => {
  // Validatiom
  const { error } = validation.userSignUpValidation(req.body);
  if (error) {
    return helper.returnError(codes.badRequest, error.details[0].message, res);
  }
  const {
    firstname,
    lastname,
    email,
    password,
    confirmpassword,
  } = req.body;
  // Check if passwords match
  const check = await helper.checkPasswords(password, confirmpassword);
  if (!check) {
    return helper.returnError(codes.badRequest, messages.passwordsNoMatch, res);
  }
  // check if user exists
  const user = await query.checkifUserExists(email);
  if (!user) {
    return helper.returnError(codes.badRequest, messages.userExists, res);
  }
  // Encrypt password
  const encrypted = await helper.encryptPassword(password);
  // Save the user in db
  const payload = {
    firstname,
    lastname,
    email,
    password: encrypted,
    status: 'active',
    isadmin: false,
    createdon: moment().format('LLLL'),
  };
  const saveUser = await query.saveUser(payload);
  const { isadmin, createdon, ...newData } = saveUser.rows[0];
  return res.status(codes.created).json({
    status: codes.created,
    message: messages.userCreated,
    data: newData,
  });
};
// eslint-disable-next-line consistent-return
const userLogin = async (req, res) => {
  // Validatiom
  const { error } = validation.userSignInValidation(req.body);
  if (error) {
    return helper.returnError(codes.badRequest, error.details[0].message, res);
  }
  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  const user = await query.checkifUserExists(data.email);
  if (user) {
    return helper.returnError(codes.badRequest, messages.userNoexists, res);
  }
  // Check if the user is not registered
  const userlogin = await query.ifuseralreadyexist(data.email, data.password);
  // console.log('///// ', userlogin);
  if (userlogin.length === 0) {
    return helper.returnError(codes.unauthorized, messages.invalidCredenciels, res);
  }
  const { password, ...results } = userlogin;
  return res.status(codes.success).json({
    status: codes.success,
    message: messages.userloggedIn,
    data: results,
  });
};


export default {
  userSignUp,
  userLogin,
};
