import prismaClient from "../../prisma";

export interface GetUniversistiesRequest {
    country: string|null,
    page: number|null
}

interface GetUniversitiesResponse {
    id: string,
    name: string,
    country: string,
    state_province: string|null
}

export default class GetUniversitiesService
{
    private selectAbleFields = { id: true, name: true, country: true, state_province: true };
    private pageSize: number = 20;
    private skip: number = 0;
    private requestedPage: number|null = null;

    async execute({ country, page }: GetUniversistiesRequest): Promise<GetUniversitiesResponse[]> {
        this.requestedPage = page;
        this.skip = await this.resolveSkipping();
        
        try {
            if(country) {
                return await this.getUniversitiesByCountry(country);
            }
    
            return await prismaClient.university.findMany({
                select: this.selectAbleFields,
                skip: this.skip,
                take: this.pageSize
            });
        } catch(error: any) {
            console.log(`Ocorreu um erro inesperado ao listar as universidades.\n Message: ${error.message}`);
            throw new Error(
                "Oops, ocorreu um erro ao retornar a lista de universidades, por favor tente novamente, Caso o erro persista contacte o suporte."
            );
        }
    }

    async resolveSkipping(): Promise<number> {
        if(this.requestedPage) {
            return (this.requestedPage -1) * this.pageSize;
        }
        return 0;
    }

    async getUniversitiesByCountry(country: string): Promise<GetUniversitiesResponse[]> {
        return await prismaClient.university.findMany({
            where: {
                country: country
            },
            select: this.selectAbleFields,
            skip: this.skip,
            take: this.pageSize
        });
    }
}