import { Request, Response } from "express";
import ChangeUserPasswordService from "../services/user/changeUserPasswordService";

export default class UserController
{
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