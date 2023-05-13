import { Router } from "express";
import UserController from "./controllers/userController";
import UniversityController from "./controllers/universityController";
import AuthController from "./controllers/authController";
import { createUserValidate, changePasswordValidate } from "./middlewares/request-validators/userValidations";
import { loginValidate } from "./middlewares/request-validators/authValidations";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { storeUniversityValidate, updateUniversityValidate } from "./middlewares/request-validators/universityValidators";

const router = Router();

router.post('/user/create', createUserValidate, new UserController().createUser);
router.put('/user/change-password', isAuthenticated, changePasswordValidate, new UserController().changePassword);
router.post('/auth/login', loginValidate, new AuthController().login);
router.get('/universities', isAuthenticated, new UniversityController().getUniversities);
router.get('/universities/:id', isAuthenticated, new UniversityController().getUniversityById);
router.put('/universities/:id', isAuthenticated, updateUniversityValidate, new UniversityController().updateUniversity);
router.post('/universities/create', isAuthenticated, storeUniversityValidate, new UniversityController().storeUniversity);
router.delete('/universities/:id', isAuthenticated, new UniversityController().deleteUniversity);

export { router };