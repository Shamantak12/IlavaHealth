import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useRoute } from 'wouter';
import { apiRequest } from '../lib/queryClient';
import ProductCard from '../components/ProductCard';
import { FaArrowLeft, FaFilter, FaSort } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  wasteType: string;
  description?: string;
  isFavorite: boolean;
}

type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

const CategoryDetail = () => {
  const [, setLocation] = useLocation();
  const [, params] = useRoute('/categories/:id');
  const categoryId = params?.id ? parseInt(params.id) : 0;
  
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch category info
  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ['/api/categories', categoryId],
    queryFn: async () => {
      try {
        const response = await apiRequest(`/api/categories/${categoryId}`);
        return response;
      } catch (error) {
        // Return mock data for demo
        return { 
          id: categoryId, 
          name: ['Compost', 'Plant Waste', 'Crop Residue', 'Fruit Waste', 'Organic Waste'][categoryId % 5] || 'Category',
          description: 'Agricultural waste products in this category'
        };
      }
    },
    enabled: categoryId > 0,
  });

  // Fetch products in this category
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['/api/categories', categoryId, 'products', { sort: sortOption, priceRange }],
    queryFn: async () => {
      try {
        const response = await apiRequest(
          `/api/categories/${categoryId}/products?sort=${sortOption}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`
        );
        return response as Product[];
      } catch (error) {
        // Return mock data for demo
        const categoryNames = ['Compost', 'Plant Waste', 'Crop Residue', 'Fruit Waste', 'Organic Waste'];
        const mockProducts: Product[] = Array(8).fill(0).map((_, i) => ({
          id: i + 1,
          name: `${categoryNames[categoryId % 5] || 'Product'} ${i + 1}`,
          price: Math.floor(Math.random() * 1500) + 300,
          wasteType: categoryNames[categoryId % 5] || 'Waste',
          description: 'High-quality agricultural waste product for various uses',
          isFavorite: false
        }));
        
        // Sort mock products based on sort option
        return sortProducts(mockProducts);
      }
    },
    enabled: categoryId > 0,
  });

  const isLoading = categoryLoading || productsLoading;

  // Function to sort products based on sort option
  const sortProducts = (productsToSort: Product[]) => {
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

  // Filter products based on price range
  const filteredProducts = products.filter(
    product => product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

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
              onChange={(e) => setSortOption(e.target.value as SortOption)}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;