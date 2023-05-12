import prismaClient from "../../prisma";

export interface GetUniversistiesRequest {
    country: string|null
}

interface GetUniversitiesResponse {
    id: string,
    name: string,
    country: string,
    state_province: string|null
}

export default class GetUniversitiesService
{
    private selectAbleFields = {
        id: true,
        name: true,
        country: true,
        state_province: true
    };

    async execute({ country }: GetUniversistiesRequest): Promise<GetUniversitiesResponse[]> {
        if(country) {
            return await this.getUniversitiesByCountry(country);
        }

        return await prismaClient.university.findMany({
            select: this.selectAbleFields
        });
    }

    async getUniversitiesByCountry(country: string): Promise<GetUniversitiesResponse[]> {
        return await prismaClient.university.findMany({
            where: {
                country: country
            },
            select: this.selectAbleFields
        })
    }
}