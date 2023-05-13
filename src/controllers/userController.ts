import { Request, Response } from "express";
import CreateUserService from "../services/user/createUserService";

export default class UserController
{
    async createUser(request: Request, response: Response): Promise<Response> {
        const service = new CreateUserService();
        await service.execute(request.body);
        return response.status(201).json({
            success: true,
            message: 'Usuário criado com sucesso, por favor, faça o login com as credenciais criadas.'
        });
    }
}