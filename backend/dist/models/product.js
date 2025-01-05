import prisma from '../config/client.js';
import { ValidationError } from '../middlewares/errorHandler.js';
//Listar todos os produtos
export async function getAllProducts() {
    return await prisma.product.findMany();
}
//Listar produto pelo ID
export async function findProductByID(id) {
    return await prisma.product.findUnique({ where: { id: id } });
}
//Listar produto pelo nome
export async function findProductByName(name) {
    return await prisma.product.findUnique({ where: { name: name } });
}
//Criar produto
export async function createProduct(productData) {
    const { description, isAvailable, name, price } = productData;
    const nameProductExist = await findProductByName(name);
    if (nameProductExist)
        throw new ValidationError('Já existe um produto com esse nome.');
    const newProduct = await prisma.product.create({
        data: {
            name: name,
            description: description,
            isAvailable: isAvailable,
            price: price
        }
    });
    return newProduct;
}
//Editar produto
export async function editProduct(productData) {
    const { description, isAvailable, name, price, id } = productData;
    if (!description || !isAvailable || !name || !price || !id)
        throw new ValidationError('Campos não podem ficar vazios');
    const editedProduct = await prisma.product.update({
        where: { id: id },
        data: {
            name: name,
            description: description,
            isAvailable: isAvailable,
            price: price
        }
    });
    return editedProduct;
}
//Deletar produto pelo ID
export async function deleteProductById(id) {
    const deletedProduct = await prisma.product.delete({
        where: { id: id }
    });
    return deletedProduct;
}
