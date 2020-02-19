import bcrypt from 'bcrypt';

const returnError = (code, message, res) => res.status(code).json({
  status: code,
  error: message,
});

const checkPasswords = (password, confirmpassword) => {
  if (password !== confirmpassword) {
    return false;
  }
  return true;
};

const encryptPassword = async (password) => {
  const result = await bcrypt.hash(password, 10);
  return result;
};

const passwordcompare = async (encrypted, password) => {
  const result = await bcrypt.compareSync(password, encrypted);
  return result;
};


export default {
  returnError,
  checkPasswords,
  encryptPassword,
  passwordcompare,
};
