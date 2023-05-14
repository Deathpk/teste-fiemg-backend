import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";

export async function validate(request: Request, response: Response, next: NextFunction, validations: ValidationChain[]) {
    for (let validation of validations) {
        await validation.run(request);
    }

    const errors = validationResult(request);

    if(!errors.isEmpty()) {
        return response.status(422).json({
            errors: errors.array()
        });
    }

    return next();
}
