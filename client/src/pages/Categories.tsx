import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { apiRequest } from '../lib/queryClient';
import CategoryCard from '../components/CategoryCard';
import { FaArrowLeft } from 'react-icons/fa';
import { MdCompost, MdNaturePeople, MdOutlineEco, MdRecycling } from 'react-icons/md';
import { GiWheat, GiPlantRoots, GiFruitTree } from 'react-icons/gi';

interface Category {
  id: number;
  name: string;
  iconName: string;
  itemCount: number;
}

const Categories = () => {
  const [, setLocation] = useLocation();

  // Fetch categories
  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['/api/categories'],
    queryFn: async () => {
      try {
        const response = await apiRequest('/api/categories');
        return response as Category[];
      } catch (error) {
        // For demo purposes, return mock data if API fails
        return [
          { id: 1, name: 'Compost', iconName: 'compost', itemCount: 15 },
          { id: 2, name: 'Plant Waste', iconName: 'plant', itemCount: 8 },
          { id: 3, name: 'Crop Residue', iconName: 'wheat', itemCount: 12 },
          { id: 4, name: 'Fruit Waste', iconName: 'fruit', itemCount: 9 },
          { id: 5, name: 'Organic Waste', iconName: 'eco', itemCount: 17 },
          { id: 6, name: 'Bio Fertilizer', iconName: 'nature', itemCount: 6 },
          { id: 7, name: 'Recycled', iconName: 'recycle', itemCount: 10 },
        ];
      }
    },
  });

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
          onClick={() => setLocation('/')}
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Categories</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            icon={getCategoryIcon(category.iconName)}
            count={category.itemCount}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;