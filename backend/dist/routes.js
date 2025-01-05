import express from 'express';
import { deleteProduct, getProducts, postProduct, potProduct } from './controllers/products.js';
const router = express.Router();
router.get('/', getProducts);
router.post('/', postProduct);
router.put('/:id', potProduct);
router.delete('/:id', deleteProduct);
export default router;
