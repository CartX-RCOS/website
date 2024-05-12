import React, { useState } from 'react';
import { useCart } from '../../CartProvider';
import './Sidebar.css';

const Sidebar = ({ setSelectedOption, showSidebar, setStores }) => {
  // State to track the selected menu item, defaulting to 'general'
  const [selectedItem, setSelectedItem] = useState('general');
  // console.log("SIDEBAR: ",selectedAddress);
  
  // Function to handle menu item clicks
  const handleMenuItemClick = (itemName) => {
    setSelectedItem(itemName);
    setSelectedOption(itemName); 
  };

  // eslint-disable-next-line
  const { cartItems, addItemToCart, removeItemFromCart } = useCart();

  return (
    <>
      <div className="sidebar" style={!showSidebar ? { width: "0vw" } : null}>
        <div className="sidebar-header">
        </div>

        <div className="sidebar-menu">
          <button className={`menu-item ${selectedItem === 'general' ? 'selected' : ''}`} onClick={() => handleMenuItemClick('general')}>
            <span className="icon">🏠</span> X
          </button>
          <button className={`menu-item ${selectedItem === 'openAccount' ? 'selected' : ''}`} onClick={() => handleMenuItemClick('openAccount')}>
            <span className="icon">👤</span> X
          </button>
          <button className={`menu-item ${selectedItem === 'applyLoan' ? 'selected' : ''}`} onClick={() => handleMenuItemClick('applyLoan')}>
            <span className="icon">💰</span> X
          </button>
          <button className={`menu-item ${selectedItem === 'selectCreditCard' ? 'selected' : ''}`} onClick={() => handleMenuItemClick('selectCreditCard')}>
            <span className="icon">💳</span> X
          </button>
        </div>

        <div>
          <div className='cart'>
            Your Cart
          </div>

          <div className='cart-items'>
            {cartItems.map((item, index) => (
              <div key={index}>
                <li>{item.name}</li>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;