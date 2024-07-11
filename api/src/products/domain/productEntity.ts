export interface BaseProductEntity {
  _id:string;
  name: string;
  price: number;
  type: 'burger' | 'condiments' | 'snacks' | 'drinks';
  ingredients: string[];
  image: string;
  isPromotion: boolean;
  discount: number|null;
  status: boolean;
  dateCreated : number
  dateModified : number
}

export interface ProductEntity  {
  _id?:string
  name: string;
  price: number;
  type: 'burger' | 'condiments' | 'snacks' | 'drinks';
  ingredients: string[];
  image: string;
  isPromotion: boolean;
  discount: number|null;
  status: boolean;
  dateCreated : number
  dateModified : number
}

export interface PostProductValue {
  name: string;
  price: number;
  type: 'burger' | 'condiments' | 'snacks' | 'drinks';
  ingredients: string[];
  image: string;
  isPromotion: boolean;
  discount: number|null;
  status: boolean;
}

