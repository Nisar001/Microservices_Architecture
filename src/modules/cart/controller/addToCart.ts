import { Request, Response } from "express";
import { Cart } from "../../../models/cart";
import { Product } from "../../../models/product";
import { Bundle } from "../../../models/bundle";

export const addToCart = async (req: Request, res: Response) => {
   try {
      const { _id } = req.user
      const { productId, bundleId } = req.query as any;

      let cart = await Cart.findOne({ _user: _id });

      if (!cart) {
         cart = new Cart({ _user: _id, _products: [], totalItems: 0, totalPrice: 0 });
      }

      let addedItemsCount = 0;

      if (productId) {
         // Add individual product to cart
         const product = await Product.findById(productId);
         if (!product) {
            return res.status(404).json({ message: 'Product not found' });
         }
         cart._products.push(productId);
         cart.totalPrice += product.price;
         addedItemsCount += 1; // Increment by 1 for each product added
      }

      if (bundleId) {
         // Add bundle to cart
         const bundle = await Bundle.findById(bundleId).populate('_products');
         if (!bundle) {
            return res.status(404).json({ message: 'Bundle not found' });
         }
         if (bundle.isDeleted || bundle.isBlocked) {
            return res.status(403).json({ message: 'Bundle is not available' });
         }

         bundle._products.forEach((product: any) => {
            cart._products.push(product._id);
            addedItemsCount += 1; // Increment by 1 for each product in the bundle
         });

         cart.totalPrice += bundle.price - (bundle.discount || 0);
      }

      cart.totalItems += addedItemsCount;

      await cart.save();

      return res.status(200).json(cart);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
   }
}