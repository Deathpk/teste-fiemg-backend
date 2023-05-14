import { Request, Response } from "express";
import LoginService from "../services/auth/loginService";
import RegisterUserService from "../services/auth/registerUserService";

export default class AuthController 
{
    async register (request: Request, response: Response) {
        const service = new RegisterUserService();
        await service.execute(request.body);
        return response.status(201).json({
            success: true,
            message: 'Usuário registrado com sucesso, por favor, faça o login com as credenciais criadas.'
        });
    }

    async login(request: Request, response: Response) {
        const service = new LoginService();
        const loggedUser = await service.execute(request.body);
        return response.json({
            success: true,
            data: loggedUser
        });
    }
}