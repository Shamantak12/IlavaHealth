import React from 'react';
import { useLocation } from 'wouter';
import { FaArrowLeft } from 'react-icons/fa';
import { MdCompost, MdNaturePeople, MdOutlineEco, MdRecycling } from 'react-icons/md';
import { GiWheat, GiPlantRoots, GiFruitTree } from 'react-icons/gi';

const Categories = () => {
  const [, setLocation] = useLocation();

  // Mock categories data
  const categoriesList = [
    { id: 1, name: 'Compost', iconName: 'compost', itemCount: 15 },
    { id: 2, name: 'Plant Waste', iconName: 'plant', itemCount: 8 },
    { id: 3, name: 'Crop Residue', iconName: 'wheat', itemCount: 12 },
    { id: 4, name: 'Fruit Waste', iconName: 'fruit', itemCount: 9 },
    { id: 5, name: 'Organic Waste', iconName: 'eco', itemCount: 17 },
    { id: 6, name: 'Bio Fertilizer', iconName: 'nature', itemCount: 6 },
    { id: 7, name: 'Recycled', iconName: 'recycle', itemCount: 10 },
  ];

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => setLocation('/home')}
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Categories</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
        {categoriesList.map(category => (
          <div 
            key={category.id}
            className="cursor-pointer" 
            onClick={() => setLocation(`/categories/${category.id}`)}
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mb-2">
                {getCategoryIcon(category.iconName)}
              </div>
              <span className="text-sm text-center font-medium text-gray-700">{category.name}</span>
              {category.itemCount && (
                <span className="text-xs text-gray-500 mt-1">{category.itemCount} items</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;