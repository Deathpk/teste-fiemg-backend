import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import { router } from "./routes";
import { handleException } from "./middlewares/handleExceptions";
import UpdateUniversityListCronJob from "./cronjobs/updateUniversityListCronJob";

const app = express();
app.use(express.json());
app.use(router);
app.use(handleException);

const cron = new UpdateUniversityListCronJob();
cron.execute();

app.listen(8000, () => console.log("Dev server started!"));