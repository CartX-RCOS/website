import SearchBar from '../SearchBar/SearchBar'
import AddressPopup from '../AddressPopup/AddressPopup';
import img from '../../assets/CartX-logos/logo-transparent-png.png'
import React, { useState } from 'react';
import './Navbar.css'

const NavBar = () => {
  const [showPopup, setShowPopup] = useState(false);
  
  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
   <>
    <div className="navbar">

        <div className="left">
        <label className="burger" for="burger">
          <input type="checkbox" id="burger"/>
          <span></span>
          <span></span>
          <span></span>
        </label>
          <img className="logo" src={ img } alt="CartX Logo" width="60"height="60"/>
        </div>

        <div className="middle">
          <SearchBar/>
        </div>

        <div className="right">
          <button onClick={handleButtonClick}>Open Address Popup</button>
          {showPopup && <AddressPopup onClose={handleClosePopup} />}
        </div>
    </div>    
   </>
  )
}

export default NavBar

