import mongoose from 'mongoose';
import { ProductEntity } from '../../domain/productEntity';

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Name is required'],
  },

  price: {
    type: Number,
    required: [true, 'Price is required'],
  },

  type: {
    type: String,
    enum: ['burger', 'condiments', 'snacks', 'drinks'],
    required: [true, 'Type is required'],
  },

  ingredients: {
    type: [String],
    required: [true, 'Ingredients is required'],
    validate: {
      validator: (value: any) => {
        return Array.isArray(value) && value.length > 0;
      },
      message: 'The ingredients should not be empty',
    },
  },

  image: {
    type: String,
    default:
      'https://gulagu.es/wp-content/uploads/2020/12/hamburguesa-generica-01-600x600.jpg',
  },

  isPromotion: {
    type: Boolean,
    default: false,
  },

  discount: Number,

  status: {
    type: Boolean,
    default: false,
  },

  dateCreated: {
    type: Date,
    default: Date.now(),
  },

  dateModified: {
    type: Date,
    default: Date.now(),
  },
});

productSchema.pre('validate', function (next) {
  if (!this.isPromotion) {
    this.discount = null;
  }
  next();
});

productSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as mongoose.UpdateQuery<typeof ProductModel>;
  handleMiddleware(update, next)
});

productSchema.pre('save', function (next) {
  handleMiddleware(this, next)
});

const handleMiddleware = function (doc:any, next:any) {
 
  if (!doc.image) {
    doc.image = 'https://gulagu.es/wp-content/uploads/2020/12/hamburguesa-generica-01-600x600.jpg';
  }

  if (Array.isArray(doc.ingredients)) {
    const normalizedIngredients = doc.ingredients.map((ingredient:string) => ingredient.toLowerCase());
    const uniqueIngredients = [...new Set(normalizedIngredients)];
    doc.ingredients = uniqueIngredients;
  }

  next();
};
export const ProductModel = mongoose.model('ProductModel', productSchema);
