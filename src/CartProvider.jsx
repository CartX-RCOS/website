import React, {createContext, useContext, useState} from 'react'

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])

    // adding item to cart
    const addItemToCart = (item) => {
        const itemExists = cartItems.some(cartItem => cartItem._id === item._id);
        if (!itemExists) {
            setCartItems([...cartItems, item]);
        }
    }

    // remove item to cart
    const removeItemFromCart = (itemToRemove) => {
        const updatedCartItems = cartItems.filter(item => item._id !== itemToRemove._id);
        setCartItems(updatedCartItems);
    }

    return (
        <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart }}>
          {children}
        </CartContext.Provider>
    );
}