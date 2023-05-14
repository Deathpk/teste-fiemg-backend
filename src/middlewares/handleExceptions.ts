import { NextFunction, Request, Response } from "express"

export function handleException(error: Error, request: Request, response: Response, next: NextFunction) {
    if(error instanceof Error) {
        return response.status(400).json({
            success: false,
            message: error.message
        });
    }

    return response.status(500).json({
        status: 'error',
        message: 'Ocorreu um erro inesperado ao processar uma requisição, caso o erro persista contacte o suporte.'
    });  
}