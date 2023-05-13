import { User } from "@prisma/client";
import prismaClient from "../../prisma";
import { compare, hash } from "bcryptjs";

export default class ChangeUserPasswordService
{
    async execute(currentPassword: string, newPassword: string, userId: string): Promise<void> {
        const loggedUser = await prismaClient.user.findFirst({
            where: {
                id: userId
            }
        }) as User;

        const passwordMatch = await compare(currentPassword, loggedUser.password);

        if(!passwordMatch) {
            throw new Error("Usuário e ou senha atual incorretos.");
        }

        newPassword = await hash(newPassword, 8);

        try {
            await prismaClient.user.update({
                where: {
                    id: userId
                },
                data: {
                    password: newPassword
                }
            });
        } catch(error: any) {
            console.log(`Ocorreu um erro ao trocar a senha do usuário de Id: ${userId}.\n Message: ${error.message}`);
            throw new Error("Oops... ocorreu um erro inesperado ao trocar sua senha, por favor, tente novamente. Caso o erro persista contacte o suporte.");
        }

    }
}