import express from 'express';
import usersController from '../controllers/user-controller';
import userDuplication from '../middlewares/user-already-signup';


const routers = express.Router();
routers.get('/api/v1/', usersController.ThisAnApi);
routers.post('/api/v1/auth/signin', usersController.signin);
routers.post('/api/v1/auth/signup', userDuplication, usersController.signup);

export default routers;
