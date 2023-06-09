import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"

interface Payload {
    sub: string;
}

export function isAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization!;
    
    if(!authToken) {
        response.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(token, process.env.JWT_SECRET!) as Payload;
        request.userId = sub;
        
        return next(); 
    } catch(err: any) {
        return response.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }
}