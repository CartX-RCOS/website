import React, { useState, useEffect } from 'react';
import cvs_logo from '../../assets/Store-logos/cvs.png';
import shoprite_logo from '../../assets/Store-logos/shoprite.png';
import walgreens_logo from '../../assets/Store-logos/walgreens.png';
import hannaford_logo from '../../assets/Store-logos/hannaford.png';
import './Sidebar.css';

const Sidebar = ({ showSidebar, setStores }) => {
  const [selectedStores, setSelectedStores] = useState([
    { name: 'cvs', logo: cvs_logo, checked: true }, // Set all checked by default
    { name: 'shoprite', logo: shoprite_logo, checked: true },
    { name: 'walgreens', logo: walgreens_logo, checked: true },
    { name: 'hannaford', logo: hannaford_logo, checked: true },
  ]);

  useEffect(() => {
    // Assuming setStores expects an array of selected store names
    const selectedStoreNames = selectedStores.filter(store => store.checked).map(store => store.name);
    setStores(selectedStoreNames);
  }, [selectedStores, setStores]);

  const toggleStoreSelection = (store) => {
    setSelectedStores(current =>
      current.map(item => (item.name === store ? { ...item, checked: !item.checked } : item))
    );
  };

  return (
    <>
      <div className="sidebar" style={!showSidebar ? { width: "0" } : {}}>
        <div className="sidebar-header"></div>
        <div className="sidebar-menu">
          {selectedStores.map((store, index) => (
            <div key={index} className={`menu-item ${store.checked ? 'selected' : ''}`} onClick={() => toggleStoreSelection(store.name)}>
              <img src={store.logo} alt={store.name} className="store_logo" />
              {store.name.charAt(0).toUpperCase() + store.name.slice(1)}
              <label class="container">
                <input type="checkbox" checked={store.checked} onChange={() => toggleStoreSelection(store.name)} />
                <div class="checkmark"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
