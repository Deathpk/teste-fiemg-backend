import { Request, Response } from "express";
import GetUniversitiesService from "../services/university/getUniversitiesService";
import GetUniversityByIdService from "../services/university/getUniversityByIdService";
import StoreUniversityService from "../services/university/storeUniversityService";
import UpdateUniversityService from "../services/university/updateUniversityService";
import DeleteUniversityService from "../services/university/deleteUniversityService";
export default class UniversityController
{
    async getUniversities (request: Request, response: Response) {
        const service = new GetUniversitiesService();
        const page = request.query.page as string;
        const country = request.query.country as string;
        const universityList = await service.execute({
            country: country, 
            page: parseInt(page) 
        });

        return response.json({
            success: true,
            results: universityList
        });
    }

    async getUniversityById(request: Request, response: Response) {
        const service = new GetUniversityByIdService();
        const foundUniversity = await service.execute(request.params.id);
        return response.json({
            success: true,
            result: foundUniversity
        });
    }

    async storeUniversity(request: Request, response: Response) {
        const service = new StoreUniversityService();
        await service.execute(request.body);
        return response.json({
            success: true,
            message: 'Universidade criada com sucesso!'
        });
    }

    async updateUniversity(request: Request, response: Response) {
        const service = new UpdateUniversityService();
        const { id } = request.params;
        const { webPages, name, domains } = request.body;
        await service.execute({ id, webPages, name, domains });

        return response.json({
            success: true,
            message: 'Universidade atualizada com sucesso!'
        });
    }

    async deleteUniversity(request: Request, response: Response) {
        const service = new DeleteUniversityService();
        await service.execute(request.params.id);
        return response.json({
            success: true,
            message: 'Universidade removida com sucesso!'
        });
    }
}