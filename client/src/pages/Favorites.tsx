import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  FaArrowLeft, 
  FaHeart, 
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaStar,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { useToast } from '@/hooks/use-toast';

interface FavoriteProduct {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  seller: string;
  rating: number;
  location: string;
  description: string;
  inStock: boolean;
}

export default function Favorites() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([
    {
      id: 1,
      name: 'Premium Rice Husk Compost',
      price: '₹25/kg',
      category: 'Compost',
      image: '/api/placeholder/200/200',
      seller: 'Ram Kumar Farm',
      rating: 4.8,
      location: 'Punjab',
      description: 'High-quality rice husk compost perfect for organic farming. Rich in nutrients and excellent for soil conditioning.',
      inStock: true
    },
    {
      id: 2,
      name: 'Organic Wheat Straw',
      price: '₹15/kg',
      category: 'Crop Residues',
      image: '/api/placeholder/200/200',
      seller: 'Green Valley Farms',
      rating: 4.6,
      location: 'Haryana',
      description: 'Clean wheat straw suitable for animal bedding, mulching, and composting. Properly dried and stored.',
      inStock: true
    },
    {
      id: 3,
      name: 'Bio Fertilizer Mix',
      price: '₹45/kg',
      category: 'Bio Fertilizers',
      image: '/api/placeholder/200/200',
      seller: 'Eco Farm Solutions',
      rating: 4.9,
      location: 'Uttar Pradesh',
      description: 'Premium blend of organic bio fertilizers to enhance soil fertility and crop yield naturally.',
      inStock: false
    },
    {
      id: 4,
      name: 'Recycled Plastic Planters',
      price: '₹120/piece',
      category: 'Recycled Products',
      image: '/api/placeholder/200/200',
      seller: 'Green Recyclers',
      rating: 4.5,
      location: 'Maharashtra',
      description: 'Durable planters made from recycled plastic. Perfect for home gardening and commercial nurseries.',
      inStock: true
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState<FavoriteProduct | null>(null);

  const removeFromFavorites = (productId: number) => {
    setFavorites(prev => prev.filter(item => item.id !== productId));
    toast({
      title: "Removed from favorites",
      description: "Product has been removed from your favorites list.",
    });
  };

  const addToCart = (product: FavoriteProduct) => {
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const ProductDetailsDialog = ({ product }: { product: FavoriteProduct }) => (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>{product.name}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">{product.price}</span>
            <div className="flex items-center space-x-1">
              <FaStar className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">{product.rating}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600">{product.seller}</p>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <FaMapMarkerAlt className="h-3 w-3" />
            <span>{product.location}</span>
          </div>
          
          <p className="text-sm">{product.description}</p>
          
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs ${
              product.inStock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {product.category}
            </span>
          </div>
        </div>

        <div className="flex space-x-2 pt-4">
          <Button 
            className="flex-1"
            disabled={!product.inStock}
            onClick={() => addToCart(product)}
          >
            <FaShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          <Button 
            variant="outline"
            onClick={() => removeFromFavorites(product.id)}
          >
            <FaTrash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center space-x-4 p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setLocation('/farmer')}
          >
            <FaArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">My Favorites</h1>
          <div className="ml-auto">
            <span className="text-sm text-gray-600">{favorites.length} items</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {favorites.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {favorites.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500"
                      onClick={() => removeFromFavorites(product.id)}
                    >
                      <FaHeart className="h-4 w-4 fill-current" />
                    </Button>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{product.seller}</p>
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                      <FaMapMarkerAlt className="h-3 w-3" />
                      <span>{product.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-green-600">{product.price}</span>
                      <div className="flex items-center space-x-1">
                        <FaStar className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => setSelectedProduct(product)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        {selectedProduct && <ProductDetailsDialog product={selectedProduct} />}
                      </Dialog>
                      
                      <Button 
                        size="sm" 
                        className="flex-1"
                        disabled={!product.inStock}
                        onClick={() => addToCart(product)}
                      >
                        <FaPlus className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-4">
              <Button 
                className="flex-1"
                onClick={() => {
                  const inStockItems = favorites.filter(item => item.inStock);
                  if (inStockItems.length > 0) {
                    toast({
                      title: "Added to cart!",
                      description: `${inStockItems.length} items added to your cart.`,
                    });
                  }
                }}
              >
                <FaShoppingCart className="mr-2 h-4 w-4" />
                Add All Available to Cart
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setFavorites([]);
                  toast({
                    title: "Favorites cleared",
                    description: "All items removed from favorites.",
                  });
                }}
              >
                Clear All
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <FaHeart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No favorites yet</h3>
            <p className="text-gray-500 mb-6">
              Start adding products to your favorites by tapping the heart icon
            </p>
            <Button onClick={() => setLocation('/')}>
              Browse Products
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}