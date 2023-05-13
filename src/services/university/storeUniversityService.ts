import prismaClient from "../../prisma";

interface StoreUniversityRequest {
    alphaTwoCode: string,
    webPages: string[],
    name: string,
    country: string,
    domains: string[],
    stateProvince?: string
}

export default class StoreUniversityService
{
    async execute ({ alphaTwoCode, webPages, name, country, domains, stateProvince }: StoreUniversityRequest): Promise<void> {
        const universityAlreadyExists = await this.universityAlreadyExists(country, name, stateProvince);

        if(universityAlreadyExists) {
            throw new Error("Uma universidade com essas informações já está cadastrada.");
        }

        try {
            // const encodedURIs = this.encodeURIs(webPages);
            await prismaClient.university.create({
                data: {
                    alpha_two_code: alphaTwoCode,
                    web_pages: JSON.stringify(webPages),
                    name: name,
                    country: country,
                    domains: JSON.stringify(domains),
                    state_province: stateProvince ?? ''
                }
            });
        } catch(error: any) {
            console.log(`Ocorreu um erro inesperado ao criar uma universidade.\n Message: ${error.message}`);
            throw new Error(
                "Oops, ocorreu um erro ao criar uma Universidade, por favor tente novamente, Caso o erro persista contacte o suporte."
            );
        }
    }

    // encodeURIs(uris: string[]): string[] {
    //     return uris.map(uri => {
    //         return encodeURI(uri);
    //     })
    // }

    async universityAlreadyExists(country: string, name: string, stateProvince?: string): Promise<boolean> {
        const foundUniversity = await prismaClient.university.findFirst({
            where: {
                country: country,
                state_province: stateProvince ?? '',
                name: name
            }
        });

        return foundUniversity !== null;
    }
}