export interface IValidationError extends Error {
    name: string;
    status?: number;
    errors?: Record<string, string>;
}

export interface IProduct {
    name: string;
    description: string;
    price: number;
    isAvailable: boolean;
}

export interface IEditProduct extends IProduct {
    id: string
}