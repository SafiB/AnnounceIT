import jwt from 'jsonwebtoken';


const authentic = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader === undefined) {
    return res.status(404).json({
      status: 'error',
      error: 'unauthorized access',
    });
  }
  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];
  req.token = bearerToken;
  return jwt.verify(req.token, process.env.API_SECRET_KEY, (error, data) => {
    if (error) {
      return res.status(404).json({
        status: 'error',
        error: 'this token is not valid',
      });
    }
    req.user = data;
    return next();
  });
};

export default authentic;
