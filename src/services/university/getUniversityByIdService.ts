import prismaClient from "../../prisma";

export default class GetUniversityByIdService
{
    async execute(id: string) {
        const university = await prismaClient.university.findFirst({
            where: {
                id: id
            }
        });

        if(!university) {
            throw new Error("Não foi possível encontrar uma universidade com o id recebido.");
        }

        return university;
    }
}