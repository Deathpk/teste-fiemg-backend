import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

export interface CreateUserRequest {
    name: string
    email: string
    password: string
}

export default class RegisterUserService
{   
    async execute({ name, email, password }: CreateUserRequest): Promise<void> {
        
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if(userAlreadyExists) {
            throw new Error("O e-mail inserido já está sendo utilizado por outro usuário.");
        }
        
        const passwordHash = await hash(password, 8);

        try {
            await prismaClient.user.create({
                data:{
                    name: name,
                    email: email,
                    password: passwordHash
                }
            });
        } catch(error: any) {
            console.log(`Ocorreu um erro inesperado ao criar um novo usuário.\n Mensagem: ${error.message}`);
            throw new Error (
                "Oops, ocorreu um erro inesperado ao tentar registrar seu usuário, tente novamente em alguns instantes e caso o erro persista por favor, contacte o suporte."
            );
        }
    }
}