import prismaClient from "../../prisma";

interface UpdateUniversityRequest {
    id: string,
    webPages: string[],
    name: string,
    domains: string[]
}

export default class UpdateUniversityService
{
    async execute({ id, webPages, name, domains }: UpdateUniversityRequest): Promise<void> {
        const foundUniversity = await prismaClient.university.findFirst({
            where: {
                id: id
            }
        });

        if(!foundUniversity) {
            throw new Error("Não encontramos uma Universidade  com o id fornecido.");
        }
        
        try {
            await prismaClient.university.update({
                where: {
                    id: id
                },
                data: {
                    web_pages: JSON.stringify(webPages),
                    name: name,
                    domains: JSON.stringify(domains),
                    updated_at: new Date().toISOString()
                }
            });
        } catch(error: any) {
            console.log(`Ocorreu um erro inesperado ao atualizar uma universidade.\n Message: ${error.message}`);
            throw new Error(
                "Oops, ocorreu um erro ao atualizar uma Universidade, por favor tente novamente, Caso o erro persista contacte o suporte."
            );
        }
    }
}