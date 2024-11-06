import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Cart Context
const CartContext = createContext();

// Custom hook to use Cart Context
export const useCart = () => {
  return useContext(CartContext);
};

// Cart Provider to wrap the app and provide context values
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Fetch cart items from the server on initial load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart/allcartitems');
        const fetchedCart = Array.isArray(response.data.products) ? response.data.products : [];
        setCart(fetchedCart);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []); // This effect runs only once when the component mounts

  // Add item to the cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const existingItem = cart.find(item => item.productId === productId);
      if (existingItem) {
        const updatedQuantity = existingItem.quantity + quantity;
        await updateQuantity(productId, updatedQuantity);  // Update quantity if product exists
      } else {
        const response = await axios.post('http://localhost:5000/api/cart/addtocart', {
          productId, quantity
        });
        // Add to cart only after successful server response
        setCart(prevCart => [...prevCart, { productId, quantity }]);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Update quantity of item in the cart
  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) return;

    try {
      await axios.post('http://localhost:5000/api/cart/updatequantity', { productId, quantity });
      setCart(prevCart =>
        prevCart.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Remove item from the cart
  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`);
      setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  // Calculate total items in the cart
  const getItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, getItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
