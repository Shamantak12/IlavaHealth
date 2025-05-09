import React from 'react';
import { useLocation } from 'wouter';
import { FaHeart, FaShoppingCart, FaSearch } from 'react-icons/fa';
import ilavaLogo from '../assets/ilava-logo.svg';

const SimpleHome = () => {
  const [, setLocation] = useLocation();

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
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              
              <button 
                onClick={() => setLocation('/cart')}
                className="relative"
              >
                <FaShoppingCart className="text-gray-700 text-xl" />
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </button>
            </div>
          </div>
          
          {/* Search bar */}
          <div className="pb-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for agricultural waste products..."
                className="w-full py-3 pl-10 pr-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-green-600 to-green-400 rounded-xl p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Turn Waste Into Wealth</h2>
          <p className="mb-4 max-w-md">
            Find sustainable products made from agricultural waste
          </p>
          <button 
            onClick={() => setLocation('/how-it-works')}
            className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold"
          >
            Learn More
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
          
          <div className="grid grid-cols-4 gap-4">
            {['Compost', 'Plant Waste', 'Crop Residue', 'Fruit Waste'].map((category, index) => (
              <div 
                key={index}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setLocation(`/categories/${index + 1}`)}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <div className="text-green-600 text-xl">🌱</div>
                </div>
                <span className="text-sm text-center">{category}</span>
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
            {[
              { name: 'Organic Compost', price: 1200, type: 'Compost' },
              { name: 'Rice Husk Ash', price: 800, type: 'Crop Residue' },
              { name: 'Sugarcane Bagasse', price: 650, type: 'Plant Waste' },
              { name: 'Fruit Pulp Fertilizer', price: 950, type: 'Fruit Waste' }
            ].map((product, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                onClick={() => setLocation(`/products/${index + 1}`)}
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm bg-yellow-100 px-2 py-1 rounded-md text-gray-700">{product.type}</span>
                    <span className="text-green-600 font-bold">₹{product.price}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mt-2">{product.name}</h3>
                  <button 
                    className="mt-4 bg-green-600 text-white px-3 py-2 rounded-md flex items-center gap-1 hover:bg-green-700 transition-colors w-full justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLocation('/cart');
                    }}
                  >
                    <FaShoppingCart />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Ilava */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Why Choose Ilava</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl">♻️</span>
              </div>
              <h3 className="font-semibold mb-2">Sustainable Solutions</h3>
              <p className="text-gray-600">
                Convert agricultural waste into valuable products, reducing environmental impact.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl">🌿</span>
              </div>
              <h3 className="font-semibold mb-2">Eco-Friendly Products</h3>
              <p className="text-gray-600">
                All products are environmentally friendly and promote circular economy.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl">🌾</span>
              </div>
              <h3 className="font-semibold mb-2">Support Farmers</h3>
              <p className="text-gray-600">
                Help farmers create additional income streams from their agricultural waste.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <img src={ilavaLogo} alt="Ilava Logo" className="h-8 w-8 mr-2" />
                <span className="text-lg font-bold text-green-600">ILAVA</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Turning agricultural waste into wealth
              </p>
            </div>
            
            <div className="flex space-x-8">
              <div>
                <h4 className="font-semibold mb-2">About</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li><a href="#" className="hover:text-green-600">Our Story</a></li>
                  <li><a href="#" className="hover:text-green-600">How It Works</a></li>
                  <li><a href="#" className="hover:text-green-600">Impact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Support</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li><a href="#" className="hover:text-green-600">Contact Us</a></li>
                  <li><a href="#" className="hover:text-green-600">FAQs</a></li>
                  <li><a href="#" className="hover:text-green-600">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-6 pt-6 text-sm text-center text-gray-600">
            &copy; {new Date().getFullYear()} Ilava. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SimpleHome;