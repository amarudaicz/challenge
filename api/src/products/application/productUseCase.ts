import { MappedFilters, QueryFilters } from '../domain/filtersInterface';
import { PostProductValue, ProductEntity } from '../domain/productEntity';
import { ProductRepository } from '../domain/productRepository';
import { ProductValue } from '../domain/productValue';

export class ProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async listAllProducts(filters: QueryFilters) {
 
    return await this.productRepository.getAllProducts(filters);
  }

  async getDetailsProduct(id: string|number) {
    return await this.productRepository.getProduct(id);
  }

  async updateProduct(updatedProduct: ProductEntity) {
    updatedProduct.dateModified = Date.now();
    return await this.productRepository.putProduct(updatedProduct);
  }

  async createProduct(product: PostProductValue) {
    const productValue = new ProductValue(product);
    return await this.productRepository.postProduct(productValue);
  }

  async deleteOneProduct(id: string|number) {
    return await this.productRepository.deleteProduct(id);
  }
}
