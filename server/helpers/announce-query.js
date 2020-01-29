import announcements from '../models/announcements';
// import user from '../Models/user';

class announcementQuery {
  static createUsers(announcement, createrEmail) {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const newAnnouncement = announcement;

    newAnnouncement.id = announcement.length + 1;
    newAnnouncement.createrEmail = createrEmail;
    newAnnouncement.title = announcement.title;
    newAnnouncement.text = announcement.text;
    newAnnouncement.status = 'pending';
    newAnnouncement.start_date = date;
    newAnnouncement.end_date = announcement.end_date;
    announcement.push(newAnnouncement);
  }

  static changeStatus(createrEmail, status) {
    const announcementIndex = announcements.findIndex(a => a.createrEmail === createrEmail);
    announcements[announcementIndex].status = status;
    return announcements[announcementIndex];
  }

  static updateAnnouncement(createrEmail, testdata) {
    // eslint-disable-next-line radix
    const announcementIndex = announcements.findIndex(a => a.id === createrEmail);
    announcements[announcementIndex].text = testdata.text;
    announcements[announcementIndex].end_date = testdata.end_date;
    return announcements[announcementIndex];
  }

  static findAll(id) {
    const allannouncements = announcements.filter(a => a.createrEmail === id);
    return allannouncements;
  }

  static findStatus(status, createrEmail) {
    const announcementstatus = announcements.filter(a => a.createrEmail === createrEmail);
    return announcementstatus.filter(a => a.status === status);
  }

  static findId(id) {
    return announcements.find(a => a.id === id);
  }

  static deleteAnnouncement(id) {
    const deletedannouncement = announcements.find(a => a.id === id);
    const announcementIndex = announcements.indexOf(deletedannouncement);
    return announcements.splice(announcementIndex, 1);
  }
}
export default announcementQuery;
