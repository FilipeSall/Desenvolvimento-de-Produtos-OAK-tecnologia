//Classe do erro
export class ValidationError extends Error {
    status;
    errors;
    constructor(message, errors) {
        super(message);
        this.name = "ValidationError";
        this.status = 400;
        this.errors = errors;
    }
}
//Middleware de erro
export const errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        res.status(err.status || 400).json({ message: err.message, errors: err.errors });
        return;
    }
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno do servidor' });
};
