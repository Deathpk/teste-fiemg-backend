import { CronJob } from "cron";
import FetchAndSaveNewUniversitiesService from "../services/FetchAndSaveNewUniversitiesService";

export default class UpdateUniversityListCronJob
{
    public execute(): void {
        const service = new FetchAndSaveNewUniversitiesService();
        const cron = new CronJob("* * * * *", async () => {
                console.log("Atualizando lista de universidades...");
                await service.fetchUniversities();
            },
            null,
            undefined, 
            'America/Sao_Paulo'
        );

        cron.start();
    } 
}