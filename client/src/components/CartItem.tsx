import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../lib/queryClient';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';

interface CartItemProps {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  wasteType: string;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  productId,
  name,
  price,
  quantity,
  imageUrl,
  wasteType,
}) => {
  const queryClient = useQueryClient();

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      await apiRequest(`/api/cart/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      
      // Invalidate cart queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const removeFromCart = async () => {
    try {
      await apiRequest(`/api/cart/${id}`, {
        method: 'DELETE',
      });
      
      // Invalidate cart queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  return (
    <div className="flex items-center p-4 mb-3 bg-white rounded-lg shadow-sm">
      <div 
        className="w-16 h-16 bg-gray-200 rounded-md mr-4 flex-shrink-0"
        style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' } : {}}
      />
      
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <div className="flex items-center mt-1">
          <span className="text-sm bg-yellow-100 px-2 py-1 rounded-md text-gray-700">{wasteType}</span>
          <span className="ml-auto text-green-600 font-bold">₹{price}</span>
        </div>
      </div>
      
      <div className="flex items-center ml-4">
        <button 
          onClick={() => updateQuantity(quantity - 1)}
          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200"
        >
          <FaMinus size={12} />
        </button>
        
        <span className="mx-3 w-8 text-center">{quantity}</span>
        
        <button 
          onClick={() => updateQuantity(quantity + 1)}
          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200"
        >
          <FaPlus size={12} />
        </button>
        
        <button 
          onClick={removeFromCart}
          className="ml-4 text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;