const validate = (status) => {
  const validStatus = ['pending', 'accepted', 'declined', 'active', 'deactivated', 'pending'];
  const isValidStatus = validStatus.includes(status);
  return isValidStatus;
};
export default validate;
