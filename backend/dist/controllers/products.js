import { createProduct, deleteProductById, editProduct, getAllProducts } from '../models/product.js';
import { ValidationError } from '../middlewares/errorHandler.js';
// GET/ PRODUCTS
export async function getProducts(req, res, next) {
    try {
        const products = await getAllProducts();
        res.status(200).json({ products });
    }
    catch (e) {
        next(e);
    }
}
//POST /PRODUCTS
export async function postProduct(req, res, next) {
    try {
        const { name, description, price, isAvailable } = req.body;
        if (!name || !description || price === undefined || isAvailable === undefined) {
            throw new ValidationError("Todos os campos são obrigatórios");
        }
        const product = await createProduct(req.body);
        res.status(201).json({ message: 'Produto criado com sucesso', product: product });
    }
    catch (e) {
        next(e);
    }
}
//PUT /PRODUCTS /:ID
export async function potProduct(req, res, next) {
    try {
        const { description, isAvailable, name, price } = req.body;
        const { id } = req.params;
        const productData = { name, description, isAvailable, id, price };
        const editedProduct = await editProduct(productData);
        res.status(201).json({ message: 'Produto editado com sucesso', product: editedProduct });
    }
    catch (e) {
        next(e);
    }
}
//DELETE /PRODUCTS /:ID
export async function deleteProduct(req, res, next) {
    try {
        const { id } = req.params;
        const deletedProduct = await deleteProductById(id);
        res.status(200).json({ message: 'Produto deletado com sucesso', product: deletedProduct });
    }
    catch (e) {
        next(e);
    }
}
