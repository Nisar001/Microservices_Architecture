import mongoose, { Document, model, Schema } from 'mongoose'

export interface ICategory extends Document {
   _admin: mongoose.Schema.Types.ObjectId;
   categoryname: string;
   createdAt: Date;
   updatedAt: Date
};

const CategorySchema: Schema = new Schema({
   _admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'admin',
      required: true
   },
   categoryname: {
      type: String,
      required: true,
      unique: true
   }
}, {
   timestamps: true,
   versionKey: false
})

export const Category = model<ICategory>('category', CategorySchema)