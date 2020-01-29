/* eslint-disable radix */
import validate from '../helpers/validate-status';
import announcements from '../models/announcements';
import announceQuery from '../helpers/announce-query';
import Responses from '../helpers/responses';

class announcementController {
  static createUser(req, res) {
    const announcement = req.body;
    const createrEmail = req.user.email;
    announceQuery.createUsers(announcement, createrEmail);
    return Responses.success(res, 201, 'Announcement created successully', announcement);
  }

  static updateAnnouncement(req, res) {
    const updatedAnnouncement = announceQuery.updateAnnouncement(req.params.id, req.body);
    return Responses.success(res, 200, 'Announcement updated successfully', updatedAnnouncement);
  }

  static userAll(req, res) {
    const createrEmail = req.user.email;
    const allannouncements = announceQuery.findAll(createrEmail);
    return Responses.success(res, 200, 'All your announcements', allannouncements);
  }

  static findStatus(req, res) {
    const theStatus = req.announceQuery.status;
    const createrEmail = req.user.email;
    const isValidStatus = validate(theStatus);
    if (!isValidStatus) {
      return Responses.failure(res, 400, 'Invalid Status');
    }
    const announcementstatus = announceQuery.findStatus(theStatus, createrEmail);
    if (!announcements.length > 0) {
      return Responses.failure(res, 404, 'Announcement not found');
    }
    return Responses.success(res, 200, 'Announcements by status', announcementstatus);
  }

  static specificAnnouncement(req, res) {
    const id = parseInt(req.params.id);
    const specificannouncement = announceQuery.findId(id);
    return Responses.success(res, 200, 'Annoucement', specificannouncement);
  }

  static deleteAnnouncement(req, res) {
    const id = parseInt(req.params.id);
    announceQuery.deleteAnnouncement(id);
    return Responses.delete(res, 200, 'Announcement was Deleted successfully');
  }

  static changeStatus(req, res) {
    const { createrEmail } = req.announceQuery;
    const theStatus = req.announceQuery.status;
    const isValidStatus = validate(theStatus);
    if (!isValidStatus) {
      return Responses.failure(res, 400, 'Invalid Status');
    }
    const announcement = announceQuery.changeStatus(createrEmail, theStatus);
    return Responses.success(res, 200, 'Status has changed successfully', announcement);
  }

  static adminAll(req, res) {
    return Responses.success(res, 200, 'All announcements', announcements);
  }
}
export default announcementController;
