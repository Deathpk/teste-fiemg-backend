import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { validate } from "./baseValidator";

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
    ];
    validate(request, response, next, validations);
}