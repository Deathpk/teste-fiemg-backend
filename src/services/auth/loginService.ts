import { User } from "@prisma/client";
import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

interface LoginRequest {
    email: string,
    password: string
}

interface LoginResponse {
    id: string,
    name: string,
    email: string,
    token: string
}

export default class LoginService
{
    async execute({ email, password }: LoginRequest): Promise<LoginResponse> {
        const user = await this.getExistingUser(email);
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("User/passord incorrect");
        }

        try {
            const token = sign(
                { name: user.name, email: user.email },
                process.env.JWT_SECRET!,
                { subject: user.id, expiresIn: '1d' }
            );

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            };
        } catch(error: any) {
            console.log(`Ocorreu um erro inesperado ao logar o usuário de Id: ${user.id}.\n Mensagem: ${error.message}`);
            throw new Error (
                "Oops, ocorreu um erro inesperado ao tentar fazer o login, tente novamente em alguns instantes e caso o erro persista por favor, contacte o suporte."
            );
        }
    }

    async getExistingUser(email: string): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if(!user) {
            throw new Error("Credenciais inválidas, tente novamente.");
        }

        return user;
    }
}