import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../lib/queryClient';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { FaSearch, FaMicrophone, FaShoppingCart, FaHeart, FaBars, FaCamera, 
  FaHome, FaList, FaUser } from 'react-icons/fa';
import { MdCompost, MdNaturePeople, MdOutlineEco, MdRecycling } from 'react-icons/md';
import { GiWheat, GiPlantRoots, GiFruitTree } from 'react-icons/gi';
import ilavaLogo from '../assets/ilava-logo.svg';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  wasteType: string;
  description?: string;
  isFavorite: boolean;
}

interface Category {
  id: number;
  name: string;
  iconName: string;
}

const NewHome = () => {
  const [, setLocation] = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userType, setUserType] = useState<string>('');

  useEffect(() => {
    // Get user type from localStorage
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  // Define mock categories for now (will be replaced by API data later)
  const mockCategories = [
    { id: 1, name: 'Compost', iconName: 'compost' },
    { id: 2, name: 'Plant Waste', iconName: 'plant' },
    { id: 3, name: 'Crop Residue', iconName: 'wheat' },
    { id: 4, name: 'Fruit Waste', iconName: 'fruit' },
    { id: 5, name: 'Organic Waste', iconName: 'eco' },
    { id: 6, name: 'Bio Fertilizer', iconName: 'nature' },
    { id: 7, name: 'Recycled', iconName: 'recycle' },
  ];
  
  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ['/api/categories'],
    queryFn: async () => {
      try {
        const response = await apiRequest('/api/categories');
        return response as Category[];
      } catch (error) {
        console.error("Error fetching categories:", error);
        return null;
      }
    },
    enabled: false, // Disabled for now
  });
  
  // Use mock data for development
  const categories = categoriesData || mockCategories;

  // Define mock products
  const mockProducts = [
    { id: 1, name: 'Organic Compost', price: 1200, wasteType: 'Compost', description: 'Nutrient-rich compost for all your gardening needs', isFavorite: false },
    { id: 2, name: 'Rice Husk Ash', price: 800, wasteType: 'Crop Residue', description: 'Perfect for soil amendment and concrete production', isFavorite: true },
    { id: 3, name: 'Sugarcane Bagasse', price: 650, wasteType: 'Plant Waste', description: 'Versatile material for packaging and paper products', isFavorite: false },
    { id: 4, name: 'Fruit Pulp Fertilizer', price: 950, wasteType: 'Fruit Waste', description: 'Organic fertilizer rich in essential nutrients', isFavorite: false },
  ];

  // Fetch featured products
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['/api/products/featured'],
    queryFn: async () => {
      try {
        const response = await apiRequest('/api/products/featured');
        return response as Product[];
      } catch (error) {
        console.error("Error fetching featured products:", error);
        return null;
      }
    },
    enabled: false, // Disabled for now
  });
  
  // Use mock data for development
  const featuredProducts = productsData || mockProducts;

  // Fetch cart count
  const { data: cartData } = useQuery({
    queryKey: ['/api/cart/count'],
    queryFn: async () => {
      try {
        const response = await apiRequest('/api/cart/count');
        return response as { count: number };
      } catch (error) {
        return { count: 2 }; // Mock count
      }
    },
  });

  // Fetch favorites count
  const { data: favoritesData } = useQuery({
    queryKey: ['/api/favorites/count'],
    queryFn: async () => {
      try {
        const response = await apiRequest('/api/favorites/count');
        return response as { count: number };
      } catch (error) {
        return { count: 3 }; // Mock count
      }
    },
  });

  const cartCount = cartData?.count || 0;
  const favoritesCount = favoritesData?.count || 0;

  // Map category icon names to actual icons
  const getCategoryIcon = (iconName: string) => {
    const iconProps = { className: "text-green-600", size: 28 };
    
    switch (iconName) {
      case 'compost':
        return <MdCompost {...iconProps} />;
      case 'plant':
        return <GiPlantRoots {...iconProps} />;
      case 'wheat':
        return <GiWheat {...iconProps} />;
      case 'fruit':
        return <GiFruitTree {...iconProps} />;
      case 'eco':
        return <MdOutlineEco {...iconProps} />;
      case 'nature':
        return <MdNaturePeople {...iconProps} />;
      case 'recycle':
        return <MdRecycling {...iconProps} />;
      default:
        return <MdOutlineEco {...iconProps} />;
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const navigateToScanWaste = () => {
    setLocation('/scan-waste');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              <img src={ilavaLogo} alt="Ilava Logo" className="h-10 w-10 mr-2" />
              <h1 className="text-2xl font-bold text-green-600">ILAVA</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setLocation('/favorites')}
                className="relative"
              >
                <FaHeart className="text-gray-700 text-xl" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => setLocation('/cart')}
                className="relative"
              >
                <FaShoppingCart className="text-gray-700 text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Search bar */}
          <div className="pb-4 flex items-center">
            <form onSubmit={handleSearch} className="flex-grow relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for agricultural waste products..."
                className="w-full py-3 pl-10 pr-12 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FaMicrophone />
              </button>
            </form>
            
            <button 
              onClick={toggleDrawer}
              className="ml-4 text-gray-700"
            >
              <FaBars size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-green-600 to-green-400 rounded-xl p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Turn Waste Into Wealth</h2>
          <p className="mb-4 max-w-md">
            {userType === 'farmer' 
              ? 'Sell your agricultural waste and earn extra income sustainably' 
              : 'Find sustainable products made from agricultural waste'}
          </p>
          <button 
            onClick={() => setLocation(userType === 'farmer' ? '/sell' : '/how-it-works')}
            className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold"
          >
            {userType === 'farmer' ? 'Start Selling' : 'Learn More'}
          </button>
        </div>

        {/* Categories Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Categories</h2>
            <button 
              onClick={() => setLocation('/categories')}
              className="text-green-600 text-sm font-semibold"
            >
              View All
            </button>
          </div>
          
          <div className="flex overflow-x-auto pb-4 -mx-2">
            {categories.map(category => (
              <div key={category.id} className="px-2">
                <CategoryCard
                  id={category.id}
                  name={category.name}
                  icon={getCategoryIcon(category.iconName)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Featured Products</h2>
            <button 
              onClick={() => setLocation('/products')}
              className="text-green-600 text-sm font-semibold"
            >
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsLoading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg h-64 animate-pulse"></div>
              ))
            ) : (
              featuredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  wasteType={product.wasteType}
                  description={product.description}
                  isFavorite={product.isFavorite}
                />
              ))
            )}
          </div>
        </div>

        {/* For Farmers Section */}
        {userType === 'farmer' && (
          <div className="mb-8 bg-yellow-50 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">For Farmers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Sell Your Waste</h3>
                <p className="text-gray-600 mb-4">
                  List your agricultural waste products and connect with potential buyers.
                </p>
                <button 
                  onClick={() => setLocation('/sell')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  List Products
                </button>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Analyze Your Waste</h3>
                <p className="text-gray-600 mb-4">
                  Scan your agricultural waste to discover its potential uses and value.
                </p>
                <button 
                  onClick={navigateToScanWaste}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                >
                  <FaCamera />
                  <span>Scan Now</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* For Buyers Section */}
        {userType === 'buyer' && (
          <div className="mb-8 bg-blue-50 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">For Buyers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Find Local Sellers</h3>
                <p className="text-gray-600 mb-4">
                  Connect with farmers in your area who are selling agricultural waste products.
                </p>
                <button 
                  onClick={() => setLocation('/sellers')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Find Sellers
                </button>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Bulk Orders</h3>
                <p className="text-gray-600 mb-4">
                  Place bulk orders directly with farmers for business needs.
                </p>
                <button 
                  onClick={() => setLocation('/bulk-orders')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Bulk Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Why Choose Ilava */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Why Choose Ilava</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <MdRecycling className="text-green-600 text-xl" />
              </div>
              <h3 className="font-semibold mb-2">Sustainable Solutions</h3>
              <p className="text-gray-600">
                Convert agricultural waste into valuable products, reducing environmental impact.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <MdOutlineEco className="text-green-600 text-xl" />
              </div>
              <h3 className="font-semibold mb-2">Eco-Friendly Products</h3>
              <p className="text-gray-600">
                All products are environmentally friendly and promote circular economy.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <GiWheat className="text-green-600 text-xl" />
              </div>
              <h3 className="font-semibold mb-2">Support Farmers</h3>
              <p className="text-gray-600">
                Help farmers create additional income streams from their agricultural waste.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full">
        <div className="container mx-auto px-4">
          <div className="flex justify-between py-3">
            <button 
              className="flex flex-col items-center text-green-600"
              onClick={() => setLocation('/')}
            >
              <FaHome />
              <span className="text-xs mt-1">Home</span>
            </button>
            
            <button 
              className="flex flex-col items-center text-gray-600"
              onClick={() => setLocation('/categories')}
            >
              <FaList />
              <span className="text-xs mt-1">Categories</span>
            </button>
            
            <button 
              className="flex flex-col items-center"
              onClick={navigateToScanWaste}
            >
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center -mt-5 mb-1">
                <FaCamera className="text-white text-lg" />
              </div>
              <span className="text-xs text-gray-600">Scan</span>
            </button>
            
            <button 
              className="flex flex-col items-center text-gray-600"
              onClick={() => setLocation('/cart')}
            >
              <FaShoppingCart />
              <span className="text-xs mt-1">Cart</span>
            </button>
            
            <button 
              className="flex flex-col items-center text-gray-600"
              onClick={() => setLocation('/profile')}
            >
              <FaUser />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Drawer Menu */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleDrawer}
          ></div>
          
          {/* Drawer */}
          <div className="relative w-64 max-w-xs bg-white h-full shadow-xl overflow-auto">
            <div className="p-4 border-b flex items-center">
              <img src={ilavaLogo} alt="Ilava Logo" className="h-10 w-10 mr-2" />
              <h2 className="text-xl font-bold text-green-600">ILAVA</h2>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <a 
                    href="/"
                    className="block py-2 px-4 rounded hover:bg-gray-100"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="/categories"
                    className="block py-2 px-4 rounded hover:bg-gray-100"
                  >
                    Categories
                  </a>
                </li>
                {userType === 'farmer' ? (
                  <>
                    <li>
                      <a 
                        href="/sell"
                        className="block py-2 px-4 rounded hover:bg-gray-100"
                      >
                        Sell Your Waste
                      </a>
                    </li>
                    <li>
                      <a 
                        href="/my-listings"
                        className="block py-2 px-4 rounded hover:bg-gray-100"
                      >
                        My Listings
                      </a>
                    </li>
                  </>
                ) : (
                  <li>
                    <a 
                      href="/sellers"
                      className="block py-2 px-4 rounded hover:bg-gray-100"
                    >
                      Find Sellers
                    </a>
                  </li>
                )}
                <li>
                  <a 
                    href="/orders"
                    className="block py-2 px-4 rounded hover:bg-gray-100"
                  >
                    My Orders
                  </a>
                </li>
                <li>
                  <a 
                    href="/favorites"
                    className="block py-2 px-4 rounded hover:bg-gray-100"
                  >
                    Favorites
                  </a>
                </li>
                <li>
                  <a 
                    href="/profile"
                    className="block py-2 px-4 rounded hover:bg-gray-100"
                  >
                    My Profile
                  </a>
                </li>
                <li>
                  <a 
                    href="/how-it-works"
                    className="block py-2 px-4 rounded hover:bg-gray-100"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a 
                    href="/contact"
                    className="block py-2 px-4 rounded hover:bg-gray-100"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a 
                    href="#"
                    className="block py-2 px-4 rounded hover:bg-gray-100 text-red-600"
                    onClick={() => {
                      localStorage.removeItem('userType');
                      setLocation('/');
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewHome;