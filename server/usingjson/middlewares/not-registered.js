import query from '../helpers/user-query';
import response from '../helpers/responses';

const userExist = (req, res, next) => {
  const user = query.findByEmail(req.body.email);
  if (!user) {
    return response.failureResponse(res, 404, 'This user is not registered');
  }
  return next();
};
export default userExist;
