import { Router, Request, Response } from "express";
import UniversityController from "./controllers/UniversityController";

const router = Router();

router.get('/teste', new UniversityController().getUniversitiesByCountry);

export { router };