/* eslint-disable radix */
import announcements from '../models/announcements';
import announceQuery from '../helpers/announce-query';

class announcementController {
  static createAnnounce(req, res) {
    const announcement = req.body;
    const createrEmail = req.user.email;
    announceQuery.createUsers(announcement, createrEmail);
    return res.status(201).json({
      status: 'success',
      data: { announcement },

    });
  }

  static updateAnnouncement(req, res) {
    const updatedAnnouncement = announceQuery.updateAnnouncement(req.params.id, req.body);
    return res.status(200).json({
      status: 'success',
      data: { updatedAnnouncement },
    });
  }

  static userAll(req, res) {
    const createrEmail = req.user.email;
    const allannouncements = announceQuery.findAll(createrEmail);
    return res.status(200).json({
      status: 'success',
      data: { allannouncements },
    });
  }

  static findStatus(req, res) {
    const theStatus = req.announceQuery.status;
    const createrEmail = req.user.email;
    const announcementstatus = announceQuery.findStatus(theStatus, createrEmail);
    if (!announcements.length > 0) {
      return res.status(404).json({
        status: 'error',
        error: 'Announcement not found',
      });
    }
    return res.status(200).json({
      status: 'success',
      data: { announcementstatus },
    });
  }

  static specificAnnouncement(req, res) {
    const id = parseInt(req.params.id);
    const specificannouncement = announceQuery.findId(id);
    return res.status(200).json({
      status: 'success',
      data: { specificannouncement },
    });
  }

  static deleteAnnouncement(req, res) {
    const id = parseInt(req.params.id);
    announceQuery.deleteAnnouncement(id);
    return res.status(200).json({
      status: 'succes',
      data: 'Announcement was Deleted successfully',
    });
  }

  static changeStatus(req, res) {
    const { createrEmail } = req.announceQuery;
    const theStatus = req.announceQuery.status;
    const announcement = announceQuery.changeStatus(createrEmail, theStatus);
    return res.status(200).json({
      status: 'success',
      data: { announcement },
    });
  }

  static adminAll(req, res) {
    return res.status(200).json({
      status: 'success',
      data: { announcements },
    });
  }
}

export default announcementController;
