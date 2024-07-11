import { ProductRepository } from '../../domain/productRepository';
import { ProductModel } from '../models/productModel';
import {
  BaseProductEntity,
  PostProductValue,
  ProductEntity,
} from '../../domain/productEntity';
import { MappedFilters, QueryFilters } from '../../domain/filtersInterface';

export class MongoRepository implements ProductRepository {

  async getProduct(id: number|string) {
    return await ProductModel.findById(id);
  }

  async getAllProducts(filters:QueryFilters) {
    const mappedFilters: MappedFilters | any = {};

    const {
      name,
      type,
      priceFrom,
      priceTo,
      isPromotion,
      orderBy,
      orderDirection,
    } = filters;

    if (name) mappedFilters.name = {$regex:name, $options:'i'};
    if(type) mappedFilters.type = type
    if (priceFrom) mappedFilters.price = {$gte:priceFrom}
    if (priceTo) mappedFilters.price = {...mappedFilters.price ,$lte:priceTo}
    if (isPromotion) mappedFilters.isPromotion = isPromotion //true

    const orderByRestrictions = ['name', 'price', 'type', 'discount' ]
    
    const sort:{[key:string]: 'asc'|'desc'} = {}

    if (orderBy && orderByRestrictions.includes(orderBy) ){
      sort[orderBy] = orderDirection || 'asc'
    }
    
    return await ProductModel.find(mappedFilters).sort(sort);
  }

  async postProduct(product: PostProductValue) {
    return await ProductModel.create(product);
  }

  async putProduct(productUpdated: ProductEntity) {
    const { _id } = productUpdated;
    return await ProductModel.findOneAndUpdate(
      { _id },
      productUpdated,
      { new: true }
    );
  }

  async deleteProduct(_id: number) {
    return await ProductModel.findOneAndDelete({_id},{returnDocument:'after'} );
  }
}
