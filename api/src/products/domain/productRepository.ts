import { MappedFilters, QueryFilters } from "./filtersInterface";
import { PostProductValue, ProductEntity } from "./productEntity";


export interface ProductRepository{
    getAllProducts(filters:QueryFilters):Promise<any[]>
    getProduct(id:string|number):Promise<any>;
    postProduct(product:PostProductValue): Promise<any>;
    putProduct(updatedProduct:ProductEntity):Promise<any>;
    deleteProduct(id:string|number):Promise<any>
}