import React, { useState, useEffect } from 'react';
import cvs_logo from '../../assets/Store-logos/cvs.png';
import shoprite_logo from '../../assets/Store-logos/shoprite.png';
import walgreens_logo from '../../assets/Store-logos/walgreens.png';
import hannaford_logo from '../../assets/Store-logos/hannaford.png';
import './Sidebar.css';

const Sidebar = ({ setSelectedOption, showSidebar, setStores }) => {
  const [selectedStores, setSelectedStores] = useState(['CVS', 'Shoprite', 'Walgreens', 'Hannaford']);
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    // Assuming setStores expects an array of selected store names
    setStores(selectedStores);
  }, [selectedStores, setStores]);

  const toggleStoreSelection = (store) => {
    setSelectedStores(current => 
      current.includes(store) ? current.filter(s => s !== store) : [...current, store]
    );
  };

  const storeData = [
    { name: 'CVS', logo: cvs_logo },
    { name: 'Shoprite', logo: shoprite_logo },
    { name: 'Walgreens', logo: walgreens_logo },
    { name: 'Hannaford', logo: hannaford_logo },
  ];

  return (
    <>
      <div className="sidebar" style={!showSidebar ? { width: "0" } : {}}>
        <div className="sidebar-header"></div>
        <div className="sidebar-menu">
          {storeData.map((store, index) => (
            <div key={index} className={`menu-item ${selectedStores.includes(store.name) ? 'selected' : ''}`} onClick={() => toggleStoreSelection(store.name)}>
              <img src={store.logo} alt={store.name} className="store_logo"/>
              <label class="container">
                <input type="checkbox" checked={checked} onChange={handleChange}/>
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
