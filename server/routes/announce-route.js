import express from 'express';
import announcementController from '../controllers/announce-controller';
import validate from '../middlewares/user-validation';
import duplication from '../middlewares/announce-duplicated';
import authentic from '../middlewares/authentications';
import authorize from '../middlewares/authorizations';


import check from '../middlewares/user-checker';

const routersannounce = express.Router();
routersannounce.post('/api/v1/announcements', authentic, validate, duplication, announcementController.createUser);
routersannounce.patch('/api/v1/Announcements/:id', authentic, authorize, validate, announcementController.updateAnnouncement);
routersannounce.get('/api/v1/announcements', authentic, announcementController.userAll);
routersannounce.get('/api/v1/announcements', authentic, announcementController.findStatus);
routersannounce.get('/api/v1/announcements/:id', authentic, authorize, announcementController.specificAnnouncement);
routersannounce.delete('/api/v1/announcements/:id', authentic, check, announcementController.deleteAnnouncemnt);
routersannounce.patch('/api/v1/announcements/:id', authentic, check, announcementController.changeStatus);
routersannounce.get('/api/v1/announcements/', authentic, check, announcementController.adminAll);

export default routersannounce;
