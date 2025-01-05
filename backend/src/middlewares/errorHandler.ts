import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

import { IValidationError } from "../types.js";

//Classe do erro
export class ValidationError extends Error implements IValidationError {
    public status: number;
    public errors?: Record<string, string>;

    constructor(message: string, errors?: Record<string, string>) {
        super(message);
        this.name = "ValidationError";
        this.status = 400;
        this.errors = errors;
    }
}

//Middleware de erro
export const errorHandler: ErrorRequestHandler = (
    err: IValidationError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err.name === 'ValidationError') {
        res.status(err.status || 400).json({ message: err.message, errors: err.errors });
        return;
    }

    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno do servidor' });
};