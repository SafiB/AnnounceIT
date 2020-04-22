/* eslint-disable camelcase */
import moment from 'moment';
import query from '../model/query';
import helper from '../utils/helper';
import codes from '../utils/statusCodes';
import validation from '../middleware/validation';
import messages from '../utils/messages';

const createannouncements = async (req, res) => {
  // Validation
  const { error } = validation.announceValidation(req.body);
  if (error) {
    return helper.returnError(codes.badRequest, error.details[0].message, res);
  }
  const {
    highlight,
    details,
    createdby,
  } = req.body;
  const announce = await query.ifannouncementExist(highlight, createdby);
  if (!announce) {
    return helper.returnError(codes.badRequest, messages.Announcexist, res);
  }
  const postinguserexist = await query.checkifUserExists(createdby);
  if (postinguserexist) {
    return helper.returnError(codes.badRequest, messages.userNoexists, res);
  }
  const announces = {
    highlight,
    details,
    status: 'pending',
    posted_date: moment().format('LLLL'),
    createdby,
  };
  const saveAnnouncement = await query.saveAnnounce(announces);
  const { status, posted_date, ...newData } = saveAnnouncement.rows[0];
  return res.status(codes.created).json({
    status: codes.created,
    message: messages.announceCreated,
    data: newData,
  });
};


export default {
  createannouncements,
};
