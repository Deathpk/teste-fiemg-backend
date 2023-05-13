import { CronJob } from "cron";
import FetchAndSaveNewUniversitiesService from "../services/fetchAndSaveNewUniversitiesService";

export default class UpdateUniversityListCronJob
{
    public execute(): void {
        const service = new FetchAndSaveNewUniversitiesService();
        const cron = new CronJob(process.env.CRON_TIME_VALUE!, async () => {
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