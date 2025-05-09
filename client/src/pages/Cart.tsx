import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../lib/queryClient';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import CartItem from '../components/CartItem';
import { FaArrowLeft, FaBoxOpen } from 'react-icons/fa';

interface CartItemType {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  wasteType: string;
}

const Cart = () => {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Fetch cart items
  const { data: cartItems = [], isLoading, error } = useQuery({
    queryKey: ['/api/cart'],
    queryFn: async () => {
      const response = await apiRequest('/api/cart');
      return response as CartItemType[];
    },
  });

  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 100 : 0; // Example shipping cost
  const total = subtotal + shipping;

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      await apiRequest('/api/cart/clear', {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Could not clear cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Checkout mutation
  const checkoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest('/api/checkout', {
        method: 'POST',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Order placed!",
        description: "Your order has been successfully placed.",
      });
      setLocation('/orders');
    },
    onError: () => {
      toast({
        title: "Checkout failed",
        description: "Could not process your order. Please try again.",
        variant: "destructive",
      });
      setIsCheckingOut(false);
    },
  });

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checking out.",
      });
      return;
    }

    setIsCheckingOut(true);
    checkoutMutation.mutate();
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) return;
    clearCartMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">Failed to load cart items. Please try again.</p>
        <button 
          onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/cart'] })}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => setLocation('/')}
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Your Cart</h1>
        
        {cartItems.length > 0 && (
          <button 
            onClick={handleClearCart}
            className="ml-auto text-sm text-red-500 hover:text-red-700"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <FaBoxOpen className="mx-auto text-gray-400 mb-4" size={50} />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some agricultural waste products to get started</p>
          <button 
            onClick={() => setLocation('/')}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.map(item => (
              <CartItem 
                key={item.id} 
                id={item.id}
                productId={item.productId}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                imageUrl={item.imageUrl}
                wasteType={item.wasteType}
              />
            ))}
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <div className="h-px bg-gray-200 my-4"></div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut || cartItems.length === 0}
              className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              Shipping costs are calculated based on your location and will be confirmed on the next page.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;