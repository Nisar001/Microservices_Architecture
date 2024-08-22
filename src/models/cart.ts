import mongoose, { model, Schema } from "mongoose";

interface ICart extends Document {
   _user: mongoose.Schema.Types.ObjectId;
   _products?: mongoose.Schema.Types.ObjectId[];
   totalItems?: number;
   totalPrice?: number;
}

const CartSchema: Schema = new Schema({
   _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
   },
   _prducts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
   }],
   totalItems: {
      type: Number,
   },
   totalPrice: {
      type: Number
   }
}, {
   timestamps: true,
   versionKey: false
})

export const Cart = model<ICart>('cart', CartSchema)