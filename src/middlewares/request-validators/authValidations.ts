import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export async function loginValidate(request: Request, response: Response, next: NextFunction) {
    const validations = [
        body("email")
        .escape()
        .notEmpty()
        .withMessage("O campo e-mail é obrigatório")
        .isEmail()
        .withMessage('Email invalido'),

        body("password")
        .escape()
        .notEmpty()
        .withMessage("O campo senha é obrigatório.")
    ]

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