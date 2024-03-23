import SearchBar from '../SearchBar/SearchBar'
import AddressPopup from '../AddressPopup/AddressPopup';
import img from '../../assets/CartX-logos/Updated Logos/logo-transparent-png.png'
import { useState } from 'react';
import { TiLocation } from "react-icons/ti";
import './Navbar.css'

const NavBar = (props) => {
  const [showPopup, setShowPopup] = useState(false);

  const stores = props.stores;

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const address = localStorage.getItem('address');
  const isAddressUndefined = address === undefined || address === null;

  return (
    <>
      <div className="navbar">
        <div className="left">
          <div className="burger_div" onClick={() => props.setShowSidebar(document.getElementById('burger').checked ? false : true)}>
            <label className="burger" htmlFor="burger">
              <input type="checkbox" id="burger" />
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
          <div className="logo_div">
            <img className="logo" src={img} alt="CartX Logo" width="140" />
          </div>
        </div>

        <div className="middle">
          <SearchBar className="search" setData={props.setData} stores={stores}/>
        </div>

        <div className="right">
          {isAddressUndefined ? (
            <button id="address_button" onClick={handleButtonClick}>
              <TiLocation size={36} />
            </button>
          ) : (
            <div className="address_div" onClick={handleButtonClick}>
              <TiLocation size={36} style={{ color: 'black' }} />
              <div className="text_div">
                {address}
              </div>
            </div>
          )}
          {showPopup && <AddressPopup onClose={handleClosePopup} setAddress={props.setAddress} />}

          <button className="analyze"> Analyze </button>
        </div>
      </div>
    </>
  )
}

export default NavBar;
