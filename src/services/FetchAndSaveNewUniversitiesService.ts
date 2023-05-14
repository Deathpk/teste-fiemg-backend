import UniversityApi, { SearchRequestResponse, SearchResult } from "../api/universityApi";
import prismaClient from "../prisma";

export default class FetchAndSaveNewUniversitiesService
{
    public async fetchUniversities(): Promise<void> { 
        const api: UniversityApi = new UniversityApi();
        const searchAbleCountries = [
            "brazil",
            "uruguay", 
            "argentina", 
            "chile", 
            "colombia", 
            "paraguay", 
            "peru", 
            "suriname"
        ];

        const results = await api.getExistingUniversitiesByCountries({
            countries:searchAbleCountries 
        });
        
        try {
            for (const result of results) {
                await this.resolveResults(result);
            }
            console.log("Lista de universidades atualizadas com sucesso!");
        } catch(error: any) {
            console.log(`Ocorreu um erro ao inserir/atualizar um registro na tabela de universidades.\n Mensagem: ${error.message}`)
        }
    }

    private async resolveResults(countryResults: SearchRequestResponse): Promise<void> {
        const { results } = countryResults;

         for(const result of results) {
            const universityAlreadyExists = await this.universityHasAlreadyBeenAdded(result);

            if(!universityAlreadyExists) {
                await prismaClient.university.create({
                    data: {
                        name: result.name,
                        country: result.country,
                        state_province: result.state_province ?? null,
                        alpha_two_code: result.alpha_two_code,
                        domains: JSON.stringify(result.domains),
                        web_pages: JSON.stringify(result.web_pages),
                    }
                });
            }
        };

    }

    private async universityHasAlreadyBeenAdded (result: SearchResult): Promise<boolean> {
        const existingData = await prismaClient.university.findFirst({
            where: {
                country: result.country,
                name: result.name 
            } 
        });
        
        return existingData !== null;
    }
}