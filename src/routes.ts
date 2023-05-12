import { Router } from "express";
import UserController from "./controllers/userController";
import UniversityController from "./controllers/universityController";
import AuthController from "./controllers/authController";
import { createUserValidate } from "./middlewares/request-validators/userValidations";
import { loginValidate } from "./middlewares/request-validators/authValidations";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

router.post('/user/create', createUserValidate, new UserController().createUser);
router.post('/auth/login', loginValidate, new AuthController().login);
// todo endpoint para forgot password.
router.get('/universities', isAuthenticated, new UniversityController().getUniversities);
router.get('/universities/:id', isAuthenticated, new UniversityController().getUniversityById);

export { router };