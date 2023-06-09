import { NextFunction, Request, Response } from "express";
import { body, param } from "express-validator";
import { validate } from "./baseValidator";

export async function storeUniversityValidate(request: Request, response: Response, next: NextFunction) {
    const validations = [
        body("alphaTwoCode")
        .escape()
        .notEmpty()
        .withMessage("O campo Alpha two code é obrigatório.")
        .isByteLength({min:2 , max: 2})
        .withMessage("O campo Alpha two code deve conter um valor Alphanumérico de 2 caractéres."),

        body("webPages")
        .notEmpty()
        .withMessage("O campo Web pages é obrigatório."),

        body("name")
        .escape()
        .notEmpty()
        .withMessage("O nome da Universidade é obrigatório."),

        body("country")
        .escape()
        .notEmpty()
        .withMessage("O campo Country é obrigatório."),
        
        body("domains")
        .escape()
        .notEmpty()
        .withMessage("O campo Domains é obrigatório."),

        body("stateProvince")
        .escape()
    ];
    validate(request, response, next, validations);
}

export async function updateUniversityValidate(request: Request, response: Response, next: NextFunction) {
    const validations = [
        body("webPages")
        .notEmpty()
        .withMessage("O campo Web pages é obrigatório."),

        body("name")
        .escape()
        .notEmpty()
        .withMessage("O nome da Universidade é obrigatório."),
        
        param("id")
        .notEmpty()
        .withMessage("O Id da Universidade é obrigatório."),
        
        body("domains")
        .escape()
        .notEmpty()
        .withMessage("O campo Domains é obrigatório.")
    ];
    validate(request, response, next, validations);
}