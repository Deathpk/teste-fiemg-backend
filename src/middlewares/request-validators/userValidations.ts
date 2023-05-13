import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export async function createUserValidate(request: Request, response: Response, next: NextFunction) {
    const validations = [
        body("name")
        .escape()
        .notEmpty()
        .withMessage("O campo nome é obrigatório"),

        body("email")
        .escape()
        .notEmpty()
        .withMessage("O campo e-mail é obrigatório.")
        .isEmail()
        .withMessage('Insira um endereço de e-mail valido.'),

        body("emailConfirmation")
        .escape()
        .notEmpty()
        .withMessage("A confirmação do e-mail é obrigatório.")
        .equals(request.body.email)
        .withMessage('O e-mail de confirmação está incorreto.'),

        body("password")
        .escape()
        .notEmpty()
        .withMessage("O campo senha é obrigatório."),

        body("passwordConfirmation")
        .escape()
        .notEmpty()
        .withMessage("A confirmação da senha é obrigatória.")
        .equals(request.body.password)
        .withMessage('A senha de confirmação está incorreta.')
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

export async function changePasswordValidate(request: Request, response: Response, next: NextFunction) {
    const validations = [
        body("currentPassword")
        .escape()
        .notEmpty()
        .withMessage("O campo senha atual é obrigatório."),

        body("newPassword")
        .escape()
        .notEmpty()
        .withMessage("O campo nova senha é obrigatório.")
        .not().equals(request.body.currentPassword)
        .withMessage('A nova senha deve ser diferente da atual.')
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