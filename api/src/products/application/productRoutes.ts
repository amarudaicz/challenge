import { Router } from 'express';
import { MongoRepository } from '../infraestructure/repository/mongoRepository';
import { ProductUseCase } from './productUseCase';
import { ProductControllers } from '../infraestructure/controllers/productControlers';

const router = Router();

const mongoRepository = new MongoRepository();
const productUseCases = new ProductUseCase(mongoRepository);
const productControllers = new ProductControllers(productUseCases);


//GET ALL PRODUCTS
router.get('/', productControllers.getAllProducts);

//GET PRODUCT
router.get('/:id', productControllers.getProduct);

//POST PRODUCT
router.post('/', productControllers.postProduct);

//PUT PRODUCT
router.put('/', productControllers.putProduct);

//DELETE PRODUCT
router.delete('/:id', productControllers.deleteProduct);


export default router;
