import SearchBar from '../SearchBar/SearchBar'
import AddressPopup from '../AddressPopup/AddressPopup';
import img from '../../assets/CartX-logos/Updated Logos/logo-transparent-png.png'
import { useState } from 'react';
import {TiLocation} from "react-icons/ti";
import './Navbar.css'

const NavBar = ({ address, changeAddress}) => {
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
          <div className="burger_div">
            <label className="burger" for="burger">
              <input type="checkbox" id="burger"/>
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
          <div className="logo_div">
            <img className="logo" src={ img } alt="CartX Logo" width="140"/>
          </div>
        </div>

        <div className="middle">
          <SearchBar className="search"/>
        </div>

        <div className="right">
          <div className="address_div" onClick={handleButtonClick}>
            <button id="address_button">
              <TiLocation size={36} />
            </button>
            {showPopup && <AddressPopup onClose={handleClosePopup}/>}
            <div className="text_div">
              {localStorage.getItem('address')}
            </div>
          </div>
        </div>
    </div>    
   </>
  )
}

export default NavBar

