/* eslint-disable radix */
import validate from '../helpers/validate-status';
import announcements from '../models/announcements';
import announceQuery from '../helpers/announce-query';
import Responses from '../helpers/responses';

class announcementController {
  static create(req, res) {
    const announcement = req.body;
    const owner = req.user.firstname;
    announceQuery.createUser(announcement, owner);
    return Responses.successResponse(res, 201, 'Announcement created successully', announcement);
  }

  static update(req, res) {
    const updatedAnnouncement = announceQuery.updateAnnouncement(req.params.id, req.body);
    return Responses.successResponse(res, 200, 'Announcement updated successfully', updatedAnnouncement);
  }

  static all(req, res) {
    const owner = req.user.firstname;
    const allannouncements = announceQuery.findAll(owner);
    return Responses.successResponse(res, 200, 'All your announcements', allannouncements);
  }

  static findByStatus(req, res) {
    const theStatus = req.query.status;
    const owner = req.user.firstname;
    const isValidStatus = validate(theStatus);
    if (!isValidStatus) {
      return Responses.failureResponse(res, 400, 'Invalid Status');
    }
    const announcementstatus = announceQuery.findByStatus(theStatus, owner);
    if (!announcements.length > 0) {
      return Responses.failureResponse(res, 404, 'Announcement not found');
    }
    return Responses.successResponse(res, 200, 'Announcements by status', announcementstatus);
  }

  static getAnnouncement(req, res) {
    const id = parseInt(req.params.id);
    const specificannouncement = announceQuery.findById(id);
    return Responses.successResponse(res, 200, 'Annoucement', specificannouncement);
  }

  static delete(req, res) {
    const id = parseInt(req.params.id);
    announceQuery.deleteAnnouncement(id);
    return Responses.deleteResponse(res, 200, 'Announcement was Deleted successfully');
  }

  static changeStatus(req, res) {
    const id = parseInt(req.params.id);
    const theStatus = req.query.status;
    const isValidStatus = validate(theStatus);
    if (!isValidStatus) {
      return Responses.failureResponse(res, 400, 'Invalid Status');
    }
    const announcement = announceQuery.changeStatus(id, theStatus);
    return Responses.successResponse(res, 200, 'Status has changed successfully', announcement);
  }

  static allAnnouncements(req, res) {
    return Responses.successResponse(res, 200, 'All announcements', announcements);
  }
}
export default announcementController;
