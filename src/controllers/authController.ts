import { Request, Response } from "express";
import LoginService from "../services/auth/loginService";

export default class AuthController 
{
    async login(request: Request, response: Response) {
        const service = new LoginService();
        const loggedUser = await service.execute(request.body);
        return response.json({
            success: true,
            data: loggedUser
        });
    }
}