import express from 'express';
import controller from '../controller/users';

const router = express.Router();

router.post('/signup', controller.userSignUp);
router.post('/signin', controller.userLogin);

export default router;
