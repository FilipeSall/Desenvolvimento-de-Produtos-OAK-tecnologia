import { createProduct, deleteProductById, editProduct, findProductByID, findProductByName, getAllProducts } from '../models/product.js';
import { ParamsDictionary } from 'express-serve-static-core';
import { NextFunction, Request, Response } from 'express';
import { IEditProduct, IProduct } from '../types.js';
import { ValidationError } from '../middlewares/errorHandler.js';

interface IProductParams extends ParamsDictionary {
    id: string;
}

interface TypedRequestBody<T> extends Request {
    body: T;
    params: IProductParams;
}

// GET/ PRODUCTS
export async function getProducts(req: Request, res: Response, next: NextFunction) {
    try {
        const products = await getAllProducts();
        res.status(200).json({ products })
    } catch (e) {
        next(e)
    }
}

//POST /PRODUCTS
export async function postProduct(req: TypedRequestBody<IProduct>, res: Response, next: NextFunction) {
    try {
        const { name, description, price, isAvailable } = req.body;

        if (!name || !description || price === undefined || isAvailable === undefined) {
            throw new ValidationError("Todos os campos são obrigatórios");
        }

        const product = await createProduct(req.body);
        res.status(201).json({ message: 'Produto criado com sucesso', product: product })
    } catch (e) {
        next(e)
    }

}

//PUT /PRODUCTS /:ID
export async function potProduct(req: TypedRequestBody<IEditProduct>, res: Response, next: NextFunction) {
    try {
        const { description, isAvailable, name, price } = req.body
        const { id } = req.params;

        const productData = { name, description, isAvailable, id, price }

        const editedProduct = await editProduct(productData)

        res.status(201).json({ message: 'Produto editado com sucesso', product: editedProduct })
    } catch (e) {
        next(e)
    }
}

//DELETE /PRODUCTS /:ID
export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params

        const deletedProduct = await deleteProductById(id);

        res.status(200).json({ message: 'Produto deletado com sucesso', product: deletedProduct })
    } catch (e) {
        next(e)
    }
}
