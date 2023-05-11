import { Request, Response} from "express";
import FetchAndSaveNewUniversitiesService from "../services/FetchAndSaveNewUniversitiesService";

export default class UniversityController
{
    async getUniversitiesByCountry(request: Request, response: Response) {
        const service = new FetchAndSaveNewUniversitiesService();
        const results = await service.fetchUniversities();

        return response.json({
            results: results
        });
    }
}