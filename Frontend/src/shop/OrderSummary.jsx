import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/features/cart/cartSlice';

const OrderSummary = () => {
  const products = useSelector((store) => store.cart.products);
  const { tax, taxRate, totalPrice, selectedItems, grandTotal } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const clearTheCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="w-full h-full rounded-md p-4 bg-pink-300 shadow-md text-sm sm:text-base">
      <h1 className="text-lg font-bold mb-2">Order Summary</h1>
      <div className="space-y-2">
        <h5>Selected Items: <span className="font-medium">{selectedItems}</span></h5>
        <h5>Total Price: <span className="font-medium">${totalPrice.toFixed(2)}</span></h5>
        <h5>Tax ({(taxRate * 100).toFixed(0)}%): <span className="font-medium">${tax.toFixed(2)}</span></h5>
        <h5 className="font-semibold border-t pt-2 mt-2">Grand Total: ${grandTotal.toFixed(2)}</h5>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          onClick={clearTheCart}
          className="w-full sm:w-auto px-5 py-2 bg-red-600 hover:bg-red-800 text-white rounded-md font-bold transition-all duration-300"
        >
          Clear Cart
        </button>
        <button
          className="w-full sm:w-auto px-5 py-2 bg-green-600 hover:bg-green-800 text-white rounded-md font-bold transition-all duration-300"
        >
          Proceed Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
