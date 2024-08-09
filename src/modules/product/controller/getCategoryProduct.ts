import { Request, Response } from "express";
import { Product } from "../../../models/product";

export const getProductsByCategory = async (req: Request, res: Response) => {
   try {
      const { _id } = req.user
      if (!_id) {
         return res.status(401).json({ message: 'Unauthorized Access' })
      }
      const { _categoryId } = req.query; //categoryId
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const name = req.query.name as string;

      const query = name
         ? { _category: _categoryId, isDeleted: false, isBlocked: false, isAvailable: true, name: { $regex: name, $options: 'i' } }
         : { _category: _categoryId, isDeleted: false, isBlocked: false, isAvailable: true };

      const products = await Product.find(query).populate('_store').populate('_category').populate('discount')
         .skip((page - 1) * limit)
         .limit(limit);



      if (products.length === 0) {
         return res.json({ message: 'No Products, Please add some products' });
      }

      const total = await Product.countDocuments(query);

      return res.status(200).json({
         success: true,
         total,
         page,
         totalPages: Math.ceil(total / limit),
         products,
      });
   } catch (error) {
      return res.status(500).json({ success: false, message: 'Server Error', error: error.message })
   }
}