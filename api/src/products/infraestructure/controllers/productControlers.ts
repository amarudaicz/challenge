import { Request, Response } from 'express';
import { ProductUseCase } from '../../application/productUseCase';
import { ProductRepository } from '../../domain/productRepository';
import { PostProductValue, ProductEntity } from '../../domain/productEntity';
import handleHttp from '../../../utils/handleHttp';

export class ProductControllers {
  constructor(private productUseCase: ProductUseCase) {}

  public getProduct = async ({ params }: Request, res: Response) => {
    try {
      const { id } = params;
      const product = await this.productUseCase.getDetailsProduct(id);
      res.status(200).json(product);
    } catch (err) {
      return handleHttp(res, err as string);
    }
  };

  public getAllProducts = async ({ query }: Request, res: Response) => {
    try {
      const filters = query;

      const productsFiltered = await this.productUseCase.listAllProducts(
        filters
      );
      
      res.json(productsFiltered);
    } catch (err) {
      return handleHttp(res, err as string);
    }
  };

  public postProduct = async ({ body }: Request, res: Response) => {
    try {
      const product = body as PostProductValue;
      const { _id } = await this.productUseCase.createProduct(product);
      res.status(200).json({ id: _id });
    } catch (err) {
      return handleHttp(res, err as string);
    }
  };

  public putProduct = async ({ body }: Request, res: Response) => {
    try {
      const product: ProductEntity = body;
      const { _id } = await this.productUseCase.updateProduct(product);
      res.json({ id: _id });
    } catch (err) {
      return handleHttp(res, err as string);
    }
  };


  public deleteProduct = async ({ params }: Request, res: Response) => {
    try {
      const { id } = params;
      const product = await this.productUseCase.deleteOneProduct(id);
      res.json(product);
    } catch (err) {
      return handleHttp(res, err as string);
    }
  };
}
 