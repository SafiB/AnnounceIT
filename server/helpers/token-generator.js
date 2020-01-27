import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const tokensGenerator = (testdata) => {
  const token = jwt.sign(testdata, process.env.API_SECRET_KEY);
  return token;
};
export default tokensGenerator;
