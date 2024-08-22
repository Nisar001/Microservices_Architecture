import { Request, Response } from 'express';
import { Cart } from '../../../models/cart';
import { Product } from '../../../models/product';
import { Bundle } from '../../../models/bundle'; // Import the Bundle model

// Remove product from cart
export const removeProductFromCart = async (req: Request, res: Response) => {
   try {
      const userId = req.body.userId;
      const productId = req.body.productId;

      // Find the user's cart
      let cart = await Cart.findOne({ _user: userId }).populate('_products');

      if (!cart) {
         return res.status(404).json({ message: 'Cart not found' });
      }

      // Check if the product exists in the cart
      const productIndex = cart._products.indexOf(productId);

      if (productIndex === -1) {
         return res.status(404).json({ message: 'Product not found in cart' });
      }

      // Remove the product from the cart
      const product = await Product.findById(productId);
      if (product) {
         cart._products.splice(productIndex, 1);
         cart.totalItems -= 1;
         cart.totalPrice -= product.price;
      } else {
         // Product might be part of a bundle; still decrement totalItems and totalPrice
         const bundle = await Bundle.findOne({ _products: productId });
         if (bundle) {
            cart._products.splice(productIndex, 1);
            cart.totalItems -= 1;
            cart.totalPrice -= bundle.price / bundle._products.length;
         }
      }

      // Save the updated cart
      await cart.save();

      return res.status(200).json(cart);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
   }
};
