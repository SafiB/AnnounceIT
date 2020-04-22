import express from 'express';
import users from './users';

const router = express.Router();

router.use('/api/v1/auth', users);

export default router;
