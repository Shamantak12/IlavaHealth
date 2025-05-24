import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  FaArrowLeft, 
  FaTrash, 
  FaPlus, 
  FaMinus,
  FaShoppingCart,
  FaCreditCard,
  FaTruck,
  FaMapMarkerAlt,
  FaPercent
} from 'react-icons/fa';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
  seller: string;
  location: string;
  maxQuantity: number;
}

export default function Cart() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      productId: 1,
      name: 'Premium Rice Husk Compost',
      price: 25,
      unit: 'kg',
      quantity: 2,
      image: '/api/placeholder/80/80',
      seller: 'Ram Kumar Farm',
      location: 'Punjab',
      maxQuantity: 100
    },
    {
      id: 2,
      productId: 6,
      name: 'Organic NPK Mix',
      price: 45,
      unit: 'kg',
      quantity: 1,
      image: '/api/placeholder/80/80',
      seller: 'Eco Farm Solutions',
      location: 'Uttar Pradesh',
      maxQuantity: 50
    },
    {
      id: 3,
      productId: 7,
      name: 'Recycled Plastic Planters',
      price: 120,
      unit: 'piece',
      quantity: 3,
      image: '/api/placeholder/80/80',
      seller: 'Green Recyclers',
      location: 'Maharashtra',
      maxQuantity: 20
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [shippingAddress, setShippingAddress] = useState('');

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const item = cartItems.find(item => item.id === itemId);
    if (item && newQuantity > item.maxQuantity) {
      toast({
        title: "Quantity limit exceeded",
        description: `Maximum available quantity is ${item.maxQuantity} ${item.unit}`,
        variant: "destructive",
      });
      return;
    }

    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Item removed",
      description: "Product has been removed from your cart.",
    });
  };

  const applyPromoCode = () => {
    // Simulate promo code validation
    if (promoCode.toLowerCase() === 'ilava10') {
      setDiscount(0.10); // 10% discount
      toast({
        title: "Promo code applied!",
        description: "You got 10% discount on your order.",
      });
    } else if (promoCode.toLowerCase() === 'organic20') {
      setDiscount(0.20); // 20% discount
      toast({
        title: "Promo code applied!",
        description: "You got 20% discount on your order.",
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check the promo code and try again.",
        variant: "destructive",
      });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discount;
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping over ₹500
  const total = subtotal - discountAmount + shipping;

  const proceedToCheckout = () => {
    if (!shippingAddress.trim()) {
      toast({
        title: "Shipping address required",
        description: "Please enter your shipping address to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some products to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    // Proceed to checkout
    toast({
      title: "Proceeding to checkout...",
      description: "Redirecting to payment gateway.",
    });
    
    // In a real app, you'd integrate with a payment gateway
    setTimeout(() => {
      setLocation('/order-success');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center space-x-4 p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setLocation('/categories')}
          >
            <FaArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">Shopping Cart</h1>
          <div className="ml-auto">
            <span className="text-sm text-gray-600">{cartItems.length} items</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {cartItems.length > 0 ? (
          <>
            {/* Cart Items */}
            <Card>
              <CardHeader>
                <CardTitle>Your Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.seller}</p>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <FaMapMarkerAlt className="h-3 w-3" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">
                          ₹{item.price}/{item.unit}
                        </span>
                        
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <FaMinus className="h-3 w-3" />
                            </Button>
                            
                            <span className="w-12 text-center font-semibold">
                              {item.quantity}
                            </span>
                            
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <FaPlus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-500 hover:text-red-700"
                            onClick={() => removeItem(item.id)}
                          >
                            <FaTrash className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className="font-semibold">
                          Subtotal: ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FaPercent className="h-5 w-5" />
                  <span>Promo Code</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={applyPromoCode} variant="outline">
                    Apply
                  </Button>
                </div>
                {discount > 0 && (
                  <div className="mt-2 text-sm text-green-600">
                    ✓ {(discount * 100).toFixed(0)}% discount applied
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FaTruck className="h-5 w-5" />
                  <span>Shipping Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Enter your complete shipping address"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                />
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                
                {shipping === 0 && (
                  <div className="text-sm text-green-600">
                    ✓ Free shipping on orders above ₹500
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  size="lg"
                  onClick={proceedToCheckout}
                >
                  <FaCreditCard className="mr-2 h-5 w-5" />
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="text-center py-12">
            <FaShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">
              Add some products to your cart to get started
            </p>
            <Button onClick={() => setLocation('/categories')}>
              Browse Products
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}