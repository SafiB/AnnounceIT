import query from '../helpers/announce-query';
import Responses from '../helpers/responses';

const duplication = (req, res, next) => {
  const announcementFound = query.findByText(req.body.text);
  if (announcementFound) {
    return Responses.failureResponse(res, 409, 'Announcement already exists');
  }
  return next();
};
export default duplication;
