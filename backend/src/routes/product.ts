import express, { Router } from 'express';
import { auth, authorize } from '../middleware/auth';
import { validateProduct, validateFilters } from '../middleware/validation';
import {
    handleProductUpload,
    getAllProducts,
    handleProductById,
    getProductsUsingFilter,
} from '../controllers/controller';

// Create an Express Router
const productRoute: Router = express.Router();

// Define route handlers with type annotations
productRoute.post('/productUpload', auth, authorize(['seller']), validateProduct, handleProductUpload);
productRoute.get('/products', getAllProducts);
productRoute.get('/filterProducts', validateFilters, getProductsUsingFilter);
productRoute.get('/product/:id', handleProductById);

export { productRoute };
