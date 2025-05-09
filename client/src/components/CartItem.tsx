import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

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
  const [isUpdating, setIsUpdating] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 99 || isUpdating) return;
    
    setIsUpdating(true);
    try {
      await apiRequest(`/api/cart/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      
      setItemQuantity(newQuantity);
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not update quantity. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const removeItem = async () => {
    try {
      await apiRequest(`/api/cart/${id}`, {
        method: 'DELETE',
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Item removed",
        description: `${name} has been removed from your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not remove item. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex border-b border-gray-200 py-4 last:border-0">
      {/* Product image */}
      <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      {/* Product info */}
      <div className="ml-4 flex-grow">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium">{name}</h3>
            <span className="text-sm text-gray-500">{wasteType}</span>
          </div>
          <div className="text-green-600 font-bold">₹{price}</div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          {/* Quantity selector */}
          <div className="flex items-center">
            <button 
              onClick={() => updateQuantity(itemQuantity - 1)}
              disabled={isUpdating || itemQuantity <= 1}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
            >
              <FaMinus size={12} />
            </button>
            
            <span className="mx-3 font-medium">{itemQuantity}</span>
            
            <button 
              onClick={() => updateQuantity(itemQuantity + 1)}
              disabled={isUpdating || itemQuantity >= 99}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
            >
              <FaPlus size={12} />
            </button>
          </div>
          
          {/* Subtotal and remove */}
          <div className="flex items-center">
            <div className="mr-4 text-sm">
              Subtotal: <span className="font-semibold">₹{price * itemQuantity}</span>
            </div>
            
            <button 
              onClick={removeItem}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;