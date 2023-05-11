import axios, { AxiosInstance } from "axios";


export interface SearchRequestParams {
    countries: string[];
}

export interface SearchRequestResponse {
    country: string,
    results: SearchResult[]
}

export type SearchResult = {
    domains: string[]
    country: string
    alpha_two_code: string,
    state_province: string|null
    web_pages: string[]
    name: string
}


export default class UniversityApi
{
    private baseApi: AxiosInstance = axios.create({ baseURL: 'http://universities.hipolabs.com' });

    public async getExistingUniversitiesByCountries({ countries }: SearchRequestParams): Promise<SearchRequestResponse[]> {  
        const promises = countries.map(async (country) => 
            await this.fetchUniversities(country)
        );
        
        return await Promise.all(promises);
    }

    private async fetchUniversities(country: string): Promise<SearchRequestResponse> {
        try {
            const response = await this.baseApi
            .get('/search', {
                params: {
                    country: country
                }
            });

            const searchResults = this.formatResults(response.data);
            
            return {
                country: country,
                results: searchResults
            }
        } catch(error: any) {
            console.log(`Ocorreu um erro ao pesquisar universidades do seguinte País: ${country}.\n Mensagem: ${error.message}`);
            return {
                country: country,
                results: []
            }
        }
    }

    private formatResults(data: []): SearchResult[] {
        return data.map((result: any) => {
            return {
                domains: result.domains,
                country: result.country,
                alpha_two_code: result.alpha_two_code,
                state_province: result['state-province'],
                web_pages: result.web_pages,
                name: result.name
            }
        });
    }
}