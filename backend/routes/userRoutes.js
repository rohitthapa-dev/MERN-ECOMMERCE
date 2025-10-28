

import express from 'express';
import { getUser, loginUser, registerUser, updateUser } from '../controllers/userController.js';
import { methodNotAllowed } from '../utils/methodNotAllowed.js';
import { loginSchema, registerSchema, updateUserSchema, validatorJoi } from '../utils/validator.js';
import { checkUser } from '../middlewares/checkAuth.js';


const router = express.Router();

router.route('/users/login')
  .post(validatorJoi.body(loginSchema), loginUser)
  .all(methodNotAllowed);
router.route('/users/register')
  .post(validatorJoi.body(registerSchema), registerUser)
  .all(methodNotAllowed);
router.route('/users')
  .get(checkUser, getUser)
  .patch(checkUser, validatorJoi.body(updateUserSchema), updateUser)
  .all(methodNotAllowed);

export default router;