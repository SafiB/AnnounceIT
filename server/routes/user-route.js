import express from 'express';
import usersController from '../controllers/user-controller';
import userDuplication from '../middlewares/user-already-signup';
import userExist from '../middlewares/not-registered';

import wrongpassword from '../middlewares/incorrect-password';


const routers = express.Router();
routers.get('/api/v1/', usersController.ThisAnApi);
routers.post('/api/v1/auth/signin', wrongpassword, userExist, usersController.signin);
routers.post('/api/v1/auth/signup', userDuplication, usersController.signup);

export default routers;
