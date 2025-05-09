import React from 'react';
import { useLocation } from 'wouter';
import { IconType } from 'react-icons';

interface CategoryCardProps {
  id: number;
  name: string;
  icon: React.ReactNode;
  count?: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, icon, count }) => {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    setLocation(`/categories/${id}`);
  };

  return (
    <div 
      className="flex flex-col items-center cursor-pointer transition-transform hover:translate-y-[-5px]"
      onClick={handleClick}
    >
      <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mb-2">
        {icon}
      </div>
      <span className="text-sm text-center font-medium text-gray-700">{name}</span>
      {count !== undefined && (
        <span className="text-xs text-gray-500 mt-1">{count} items</span>
      )}
    </div>
  );
};

export default CategoryCard;