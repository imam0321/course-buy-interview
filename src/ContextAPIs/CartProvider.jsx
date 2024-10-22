// src/context/CartContext.js
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [quantity, setQuantity] = useState(cart.length > 0 ? cart[0]?.quantity || 0 : 0);


  // Calculate total cost
  const totalCost = cart.length > 0 ? cart[0].course.discount_price * quantity : 0;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  

  const handleIncreaseQuantity = () => {
    const updatedQuantity = quantity + 1;
    setQuantity(updatedQuantity);
    updateCart(updatedQuantity);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) { 
      const updatedQuantity = quantity - 1;
      setQuantity(updatedQuantity);
      updateCart(updatedQuantity);
    }
  };

  const updateCart = (updatedQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === cart[0].id ? { ...item, quantity: updatedQuantity } : item
    );
    setCart(updatedCart);
    // window.location.reload();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        quantity,
        totalCost,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};