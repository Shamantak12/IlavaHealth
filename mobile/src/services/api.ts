// API service for fetching data from the backend

interface Product {
  id: number;
  name: string;
  price: number;
  wasteType: string;
  imageUrl?: string;
  description?: string;
}

interface Category {
  id: number;
  name: string;
  iconName: string;
  count?: number;
}

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    // For now, return mock data
    return [
      { id: 1, name: 'Organic Compost', price: 1200, wasteType: 'Compost' },
      { id: 2, name: 'Rice Husk Ash', price: 800, wasteType: 'Crop Residue' },
      { id: 3, name: 'Sugarcane Bagasse', price: 650, wasteType: 'Plant Waste' },
      { id: 4, name: 'Fruit Pulp Fertilizer', price: 950, wasteType: 'Fruit Waste' },
      { id: 5, name: 'Coconut Coir', price: 550, wasteType: 'Plant Waste' },
      { id: 6, name: 'Vermicompost', price: 1500, wasteType: 'Organic Waste' },
    ];
  }
};

// Fetch all categories
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch('/api/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    // For now, return mock data
    return [
      { id: 1, name: 'Compost', iconName: 'compost' },
      { id: 2, name: 'Plant Waste', iconName: 'grass' },
      { id: 3, name: 'Crop Residue', iconName: 'eco' },
      { id: 4, name: 'Fruit Waste', iconName: 'spa' },
      { id: 5, name: 'Organic Waste', iconName: 'nature' },
      { id: 6, name: 'Bio Fertilizer', iconName: 'park' },
      { id: 7, name: 'Recycled', iconName: 'recycling' },
    ];
  }
};

// Fetch cart items for a user
export const fetchCartItems = async (userId: number): Promise<any[]> => {
  try {
    const response = await fetch(`/api/cart?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching cart:', error);
    // Return empty array for now
    return [];
  }
};

// Add item to cart
export const addToCart = async (userId: number, productId: number, quantity: number): Promise<any> => {
  try {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, productId, quantity }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Add to favorites
export const addToFavorites = async (userId: number, productId: number): Promise<any> => {
  try {
    const response = await fetch('/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, productId }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add to favorites');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

// Remove from favorites
export const removeFromFavorites = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`/api/favorites/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove from favorites');
    }
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};