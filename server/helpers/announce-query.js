import announcements from '../models/announcements';
// import user from '../Models/user';

class announcementQuery {
  static createUser(announcement, owner) {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const newAnnouncement = announcement;
    newAnnouncement.id = announcement.length + 1;
    newAnnouncement.owner = owner;
    newAnnouncement.status = 'pending';
    newAnnouncement.text = announcement.text;
    newAnnouncement.start_date = date;
    newAnnouncement.end_date = announcement.end_date;
    announcement.push(newAnnouncement);
  }

  static changeStatus(id, status) {
    const announcementIndex = announcements.findIndex(a => a.id === id);
    announcements[announcementIndex].status = status;
    return announcements[announcementIndex];
  }

  static updateAnnouncement(id, data) {
    // eslint-disable-next-line radix
    const announcementID = parseInt(id);

    const announcementIndex = announcements.findIndex(a => a.id === announcementID);
    announcements[announcementIndex].text = data.text;
    announcements[announcementIndex].end_date = data.end_date;
    return announcements[announcementIndex];
  }

  static findAll(id) {
    const allannouncements = announcements.filter(a => a.owner === id);
    return allannouncements;
  }

  static findByStatus(status, owner) {
    const announcementstatus = announcements.filter(a => a.owner === owner);
    return announcementstatus.filter(a => a.status === status);
  }

  static findById(id) {
    return announcements.find(a => a.id === id);
  }

  static deleteAnnouncement(id) {
    const deletedannouncement = announcements.find(a => a.id === id);
    const announcementIndex = announcements.indexOf(deletedannouncement);
    return announcements.splice(announcementIndex, 1);
  }
}
export default announcementQuery;
