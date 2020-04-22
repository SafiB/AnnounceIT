import express from 'express';
import users from '../controller/users';
import announcements from '../controller/announcements';

const router = express.Router();

router.post('/signin', users.userLogin);
router.post('/signup', users.userSignUp);
router.post('/createannouncement', announcements.createannouncements);
router.put('/updateAnnouncement', announcements.updateAnnouncements);

export default router;
