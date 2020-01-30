

const check = (req, res, next) => {
  const currentUser = req.user;
  if (!currentUser.is_admin) {
    return res.status(404).json({
      status: 'error',
      error: 'You are allowed to perform this operation',
    });
  }
  return next();
};
export default check;
