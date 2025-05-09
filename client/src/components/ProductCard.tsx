import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { FaCartPlus, FaHeart, FaShare, FaRegHeart } from 'react-icons/fa';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  wasteType: string;
  description?: string;
  isFavorite?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  wasteType,
  description,
  isFavorite = false,
}) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await apiRequest('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: id,
          quantity: 1,
        }),
      });
      
      // Invalidate cart queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      
      toast({
        title: "Added to cart",
        description: `${name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const toggleFavorite = async () => {
    try {
      if (favorite) {
        // Remove from favorites
        await apiRequest(`/api/favorites/${id}`, {
          method: 'DELETE',
        });
      } else {
        // Add to favorites
        await apiRequest('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: id,
          }),
        });
      }
      
      // Toggle favorite state locally
      setFavorite(!favorite);
      
      // Invalidate favorites queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/favorites'] });
      
      toast({
        title: favorite ? "Removed from favorites" : "Added to favorites",
        description: `${name} has been ${favorite ? 'removed from' : 'added to'} your favorites.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Could not ${favorite ? 'remove from' : 'add to'} favorites. Please try again.`,
        variant: "destructive",
      });
    }
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: `Check out this agricultural waste product: ${name}`,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      toast({
        title: "Share Link Copied",
        description: "Product link copied to clipboard!",
      });
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div 
        className="h-48 bg-gray-200 relative"
        style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        <button 
          onClick={toggleFavorite}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm"
        >
          {favorite ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-400" />
          )}
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm bg-yellow-100 px-2 py-1 rounded-md text-gray-700">{wasteType}</span>
          <span className="text-green-600 font-bold">₹{price}</span>
        </div>
        
        <h3 className="font-semibold text-gray-800 mt-2">{name}</h3>
        
        {description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
        )}
        
        <div className="flex items-center justify-between mt-4">
          <button 
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="bg-green-600 text-white px-3 py-2 rounded-md flex items-center gap-1 hover:bg-green-700 transition-colors"
          >
            <FaCartPlus />
            <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
          </button>
          
          <button 
            onClick={shareProduct}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaShare />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;