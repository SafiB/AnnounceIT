import express from 'express';
import usersController from '../controllers/user-controller';
import userDuplicate from '../middlewares/user-already-signup';
import userExist from '../middlewares/not-registered';
import wrongpassword from '../middlewares/incorrect-password';


const routers = express.Router();
routers.get('/api/v1/', usersController.ThisAnApi);
routers.post('/api/v1/auth/signin', userExist, usersController.signin);
routers.post('/api/v1/auth/signin', wrongpassword, usersController.signin);
routers.post('/api/v1/auth/signup', userDuplicate, usersController.signup);

export default routers;
