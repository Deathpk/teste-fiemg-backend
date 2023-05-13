import { Request, Response } from "express";
import CreateUserService from "../services/user/createUserService";
import ChangeUserPasswordService from "../services/user/changeUserPasswordService";

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

    async changePassword(request: Request, response: Response) {
        const service = new ChangeUserPasswordService();
        const { currentPassword, newPassword } = request.body;
        const { userId } = request;
        await service.execute(currentPassword, newPassword, userId);

        return response.json({
            success: true,
            message: 'Senha atualizada com sucesso.'
        });
    }
}