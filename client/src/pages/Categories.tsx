import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FaArrowLeft, 
  FaSearch, 
  FaShoppingCart,
  FaHeart,
  FaSeedling,
  FaLeaf,
  FaTractor,
  FaAppleAlt,
  FaRecycle,
  FaFlask,
  FaStar,
  FaMapMarkerAlt,
  FaFilter
} from 'react-icons/fa';

interface Product {
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
  unit: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType;
  color: string;
  description: string;
  productCount: number;
}

export default function Categories() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories: Category[] = [
    {
      id: 'compost',
      name: 'Compost',
      icon: FaSeedling,
      color: 'text-green-600',
      description: 'Organic compost and soil enhancers',
      productCount: 24
    },
    {
      id: 'plant-waste',
      name: 'Plant Waste',
      icon: FaLeaf,
      color: 'text-emerald-600',
      description: 'Agricultural plant residues and waste',
      productCount: 18
    },
    {
      id: 'crop-residues',
      name: 'Crop Residues',
      icon: FaTractor,
      color: 'text-yellow-600',
      description: 'Post-harvest crop materials',
      productCount: 32
    },
    {
      id: 'fruit-waste',
      name: 'Fruit Waste',
      icon: FaAppleAlt,
      color: 'text-red-600',
      description: 'Fruit peels, pulp and processing waste',
      productCount: 15
    },
    {
      id: 'organic-waste',
      name: 'Organic Waste',
      icon: FaSeedling,
      color: 'text-lime-600',
      description: 'General organic agricultural waste',
      productCount: 28
    },
    {
      id: 'bio-fertilizers',
      name: 'Bio Fertilizers',
      icon: FaFlask,
      color: 'text-purple-600',
      description: 'Natural and organic fertilizers',
      productCount: 21
    },
    {
      id: 'recycled',
      name: 'Recycled Products',
      icon: FaRecycle,
      color: 'text-blue-600',
      description: 'Products made from recycled materials',
      productCount: 16
    }
  ];

  const products: Product[] = [
    // Compost Products
    {
      id: 1,
      name: 'Premium Rice Husk Compost',
      price: '₹25',
      unit: 'kg',
      category: 'compost',
      image: '/api/placeholder/200/200',
      seller: 'Ram Kumar Farm',
      rating: 4.8,
      location: 'Punjab',
      description: 'High-quality rice husk compost perfect for organic farming',
      inStock: true
    },
    {
      id: 2,
      name: 'Vermicompost Premium',
      price: '₹35',
      unit: 'kg',
      category: 'compost',
      image: '/api/placeholder/200/200',
      seller: 'Green Earth Farms',
      rating: 4.9,
      location: 'Karnataka',
      description: 'Rich vermicompost made from kitchen waste and cow dung',
      inStock: true
    },
    // Plant Waste Products
    {
      id: 3,
      name: 'Banana Leaf Waste',
      price: '₹8',
      unit: 'kg',
      category: 'plant-waste',
      image: '/api/placeholder/200/200',
      seller: 'South India Farms',
      rating: 4.5,
      location: 'Tamil Nadu',
      description: 'Fresh banana leaves suitable for packaging and composting',
      inStock: true
    },
    // Crop Residues
    {
      id: 4,
      name: 'Wheat Straw Bales',
      price: '₹15',
      unit: 'kg',
      category: 'crop-residues',
      image: '/api/placeholder/200/200',
      seller: 'Green Valley Farms',
      rating: 4.6,
      location: 'Haryana',
      description: 'Clean wheat straw suitable for animal bedding and mulching',
      inStock: true
    },
    {
      id: 5,
      name: 'Rice Husk Raw',
      price: '₹12',
      unit: 'kg',
      category: 'crop-residues',
      image: '/api/placeholder/200/200',
      seller: 'Paddy Fields Co.',
      rating: 4.4,
      location: 'Andhra Pradesh',
      description: 'Fresh rice husk for industrial and agricultural use',
      inStock: true
    },
    // Bio Fertilizers
    {
      id: 6,
      name: 'Organic NPK Mix',
      price: '₹45',
      unit: 'kg',
      category: 'bio-fertilizers',
      image: '/api/placeholder/200/200',
      seller: 'Eco Farm Solutions',
      rating: 4.9,
      location: 'Uttar Pradesh',
      description: 'Balanced NPK fertilizer from organic sources',
      inStock: true
    },
    // Recycled Products
    {
      id: 7,
      name: 'Recycled Plastic Planters',
      price: '₹120',
      unit: 'piece',
      category: 'recycled',
      image: '/api/placeholder/200/200',
      seller: 'Green Recyclers',
      rating: 4.5,
      location: 'Maharashtra',
      description: 'Durable planters made from recycled plastic',
      inStock: true
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  const addToCart = (product: Product) => {
    // Add to cart logic here
    console.log('Added to cart:', product);
  };

  const toggleFavorite = (productId: number) => {
    // Toggle favorite logic here
    console.log('Toggled favorite:', productId);
  };

  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="flex items-center space-x-4 p-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSelectedCategory(null)}
            >
              <FaArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">{selectedCategoryData?.name}</h1>
              <p className="text-sm text-gray-600">{selectedCategoryData?.description}</p>
            </div>
            <Badge variant="secondary">
              {filteredProducts.length} products
            </Badge>
          </div>
        </header>

        {/* Search */}
        <div className="p-4 bg-white border-b">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder={`Search in ${selectedCategoryData?.name}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Products Grid */}
        <main className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
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
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                  >
                    <FaHeart className="h-4 w-4" />
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
                  
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-green-600">
                      {product.price}/{product.unit}
                    </span>
                    <div className="flex items-center space-x-1">
                      <FaStar className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setLocation(`/product/${product.id}`)}
                    >
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      disabled={!product.inStock}
                      onClick={() => addToCart(product)}
                    >
                      <FaShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <selectedCategoryData.icon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </div>
          )}
        </main>
      </div>
    );
  }

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
          <h1 className="text-xl font-bold text-gray-900">Categories</h1>
        </div>
      </header>

      {/* Categories Grid */}
      <main className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardContent className="p-6 text-center">
                <category.icon className={`h-16 w-16 mx-auto mb-4 ${category.color}`} />
                <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                <Badge variant="secondary">
                  {category.productCount} products
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="flex flex-col items-center py-6 h-auto"
                onClick={() => setLocation('/sell-waste')}
              >
                <FaLeaf className="h-8 w-8 mb-2 text-green-600" />
                <span>Sell Your Waste</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center py-6 h-auto"
                onClick={() => setLocation('/cart')}
              >
                <FaShoppingCart className="h-8 w-8 mb-2 text-blue-600" />
                <span>View Cart</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}