import express from 'express';
import announcementController from '../controllers/announce-controller';
import validate from '../middlewares/user-validation';
import duplication from '../middlewares/announce-duplicated';
import authentic from '../middlewares/authentications';
import authorize from '../middlewares/authorizations';


import check from '../middlewares/user-checker';

const routersannounce = express.Router();
routersannounce.post('/api/v1/announcement', authentic, validate, duplication, announcementController.create);
routersannounce.patch('/api/v1/updatedAnnouncement/:id', authentic, authorize, validate, announcementController.updatedAnnouncement);
routersannounce.get('/api/v1/allannouncements', authentic, announcementController.all);
routersannounce.get('/api/v1/announcementstatus', authentic, announcementController.findByStatus);
routersannounce.get('/api/v1/specificannouncement/:id', authentic, authorize, announcementController.getAnnouncement);
routersannounce.delete('/api/v1/announcement/:id', authentic, check, announcementController.delete);
routersannounce.patch('/api/v1/announcements/:id', authentic, check, announcementController.changeStatus);
routersannounce.get('/api/v1/announcements/', authentic, check, announcementController.allAnnouncements);

export default routersannounce;
