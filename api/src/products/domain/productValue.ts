import { PostProductValue, ProductEntity } from './productEntity';

export class ProductValue implements ProductEntity {
  //MAPER

  constructor(private product: PostProductValue) {
    this.type = product.type;
    this.name = product.name;
    this.price = product.price;
    this.ingredients = product.ingredients
    this.image = product.image
    this.isPromotion = product.isPromotion
    this.discount = product.isPromotion ? product.discount : null
    this.status = true
    
    this.dateCreated = Date.now();
    this.dateModified = Date.now();
  }


  name: string;
  type: 'burger' | 'condiments' | 'snacks' | 'drinks';
  price: number;
  ingredients: string[];
  image: string;
  isPromotion: boolean;
  discount: number|null;
  status: boolean;
  dateCreated: number;
  dateModified: number;
}
