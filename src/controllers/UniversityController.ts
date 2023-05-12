import { Request, Response } from "express";
import GetUniversitiesService from "../services/university/getUniversitiesService";
export default class UniversityController
{
    async getUniversities (request: Request, response: Response) {
        const service = new GetUniversitiesService();
        const country = request.query.country as string;
        const universityList = await service.execute({country: country});
        return response.json({
            success: true,
            results: universityList
        });
        // todo adicionar paginação...
    }

    async getUniversityById(request: Request, response: Response) {
        // todo
    }

    async storeUniversity(request: Request, response: Response) {
        // todo
    }

    async updateUniversity(request: Request, response: Response) {
        // todo
    }

    async deleteUniversity(request: Request, response: Response) {
        // todo
    }
}