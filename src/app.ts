import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import { router } from "./routes";
import UpdateUniversityListCronJob from "./cronjobs/UpdateUniversityListCronJob";

const app = express();
app.use(express.json());
app.use(router);

const cron = new UpdateUniversityListCronJob();
cron.execute();

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if(error instanceof Error) {
        response.status(400).json({
            error: error.message
        })
    }

    response.status(500).json({
        status: 'error',
        message: 'Ocorreu um erro inesperado ao processar uma requisição, caso o erro persista contacte o suporte.'
    })
});

app.listen(8000, () => console.log("Dev server started!"));