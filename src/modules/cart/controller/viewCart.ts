import { Request, Response } from 'express';
import { Cart } from '../../../models/cart';
import { Product } from '../../../models/product';
import { Bundle } from '../../../models/bundle'; // Import the Bundle model

// View cart products
export const viewCart = async (req: Request, res: Response) => {
   try {
      const userId = req.params.userId;

      // Find the user's cart and populate the products
      const cart = await Cart.findOne({ _user: userId }).populate('_products');

      if (!cart) {
         return res.status(404).json({ message: 'Cart not found' });
      }

      // Find bundles within the cart
      const bundles = await Bundle.find({ _products: { $in: cart._products } }).populate('_products');

      // Add bundle details to the response
      const products = cart._products.map((product: any) => {
         const bundle = bundles.find(b => b._products.some((p: any) => p._id.equals(product._id)));
         return {
            product,
            bundle: bundle ? { name: bundle.name, price: bundle.price, discount: bundle.discount } : null
         };
      });

      return res.status(200).json({
         cart: {
            totalItems: cart.totalItems,
            totalPrice: cart.totalPrice,
            products
         }
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
   }
};
