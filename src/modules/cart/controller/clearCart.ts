import { Request, Response } from 'express';
import { Cart } from '../../../models/cart';

// Clear all cart items
export const clearCart = async (req: Request, res: Response) => {
   try {
      const { _id } = req.user;

      // Find the user's cart
      let cart = await Cart.findOne({ _user: _id });

      if (!cart) {
         return res.status(404).json({ message: 'Cart not found' });
      }

      // Clear all items from the cart
      cart._products = [];
      cart.totalItems = 0;
      cart.totalPrice = 0;

      // Save the updated cart
      await cart.save();

      return res.status(200).json({ message: 'Cart cleared successfully' });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
   }
};
