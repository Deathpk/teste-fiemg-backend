import prismaClient from "../../prisma";

export default class DeleteUniversityService
{
    async execute(id: string) {
        const foundUniversity = await prismaClient.university.findFirst({
            where: {
                id: id
            }
        });

        if(!foundUniversity) {
            throw new Error("Não encontramos uma Universidade  com o id fornecido.");
        }

        try {
            await prismaClient.university.delete({
                where: {
                    id: id
                }
            });
        } catch(error: any) {
            console.log(`Ocorreu um erro inesperado ao deletar uma universidade.\n Message: ${error.message}`);
            throw new Error(
                "Oops, ocorreu um erro ao deletar uma Universidade, por favor tente novamente, Caso o erro persista contacte o suporte."
            );
        }
    }
}