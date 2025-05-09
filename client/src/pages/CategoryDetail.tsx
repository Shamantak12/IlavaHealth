import React, { useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { FaArrowLeft, FaFilter, FaSort, FaHeart, FaRegHeart, FaCartPlus, FaShare } from 'react-icons/fa';

const CategoryDetail = () => {
  const [, setLocation] = useLocation();
  const [, params] = useRoute('/categories/:id');
  const categoryId = params?.id ? parseInt(params.id) : 0;
  
  const [sortOption, setSortOption] = useState('name-asc');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock category data
  const categoryNames = ['Compost', 'Plant Waste', 'Crop Residue', 'Fruit Waste', 'Organic Waste'];
  const category = { 
    id: categoryId, 
    name: categoryNames[categoryId % 5] || 'Category',
    description: 'Agricultural waste products in this category'
  };

  // Mock products data
  const mockProducts = Array(8).fill(0).map((_, i) => ({
    id: i + 1,
    name: `${categoryNames[categoryId % 5] || 'Product'} ${i + 1}`,
    price: Math.floor(Math.random() * 1500) + 300,
    wasteType: categoryNames[categoryId % 5] || 'Waste',
    description: 'High-quality agricultural waste product for various uses',
    isFavorite: i % 3 === 0
  }));

  // Function to sort products based on sort option
  const sortProducts = (productsToSort: any[]) => {
    const sorted = [...productsToSort];
    
    switch (sortOption) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  };

  // Filter and sort products
  const filteredProducts = sortProducts(mockProducts).filter(
    product => product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => setLocation('/categories')}
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">{category?.name || 'Category'}</h1>
      </div>

      {category?.description && (
        <p className="text-gray-600 mb-6">{category.description}</p>
      )}

      <div className="flex flex-wrap items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-md shadow-sm mr-4"
          >
            <FaFilter />
            <span>Filter</span>
          </button>
          
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-white px-4 py-2 pr-8 rounded-md shadow-sm"
            >
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <FaSort className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        <p className="text-gray-600">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      {showFilters && (
        <div className="bg-white p-4 mb-6 rounded-md shadow-sm">
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="flex items-center gap-4">
            <input 
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceRangeChange(parseInt(e.target.value) || 0, priceRange[1])}
              className="border rounded-md px-3 py-2 w-24"
              min={0}
            />
            <span>to</span>
            <input 
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceRangeChange(priceRange[0], parseInt(e.target.value) || 0)}
              className="border rounded-md px-3 py-2 w-24"
              min={priceRange[0]}
            />
          </div>
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No products found</h2>
          <p className="text-gray-500">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div 
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div 
                className="h-48 bg-gray-200 relative"
              >
                <button 
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm"
                >
                  {product.isFavorite ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-400" />
                  )}
                </button>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm bg-yellow-100 px-2 py-1 rounded-md text-gray-700">{product.wasteType}</span>
                  <span className="text-green-600 font-bold">₹{product.price}</span>
                </div>
                
                <h3 className="font-semibold text-gray-800 mt-2">{product.name}</h3>
                
                {product.description && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                )}
                
                <div className="flex items-center justify-between mt-4">
                  <button 
                    className="bg-green-600 text-white px-3 py-2 rounded-md flex items-center gap-1 hover:bg-green-700 transition-colors"
                  >
                    <FaCartPlus />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button 
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaShare />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;