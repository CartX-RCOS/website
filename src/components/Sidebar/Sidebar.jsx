import React, { useState } from 'react';
import './Sidebar.css';


const Sidebar = ({ setSelectedOption}) => {
  // State to track the selected menu item, defaulting to 'general'
  const [selectedItem, setSelectedItem] = useState('general');
  // console.log("SIDEBAR: ",selectedAddress);

  // Function to handle menu item clicks
  const handleMenuItemClick = (itemName) => {
    setSelectedItem(itemName);
    setSelectedOption(itemName); 
  };

  return (
    <>
      <div className="sidebar">
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

      </div>
    </>
  );
};

export default Sidebar;