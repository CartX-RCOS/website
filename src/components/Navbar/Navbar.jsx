import SearchBar from '../SearchBar/SearchBar'
import img from '../../assets/CartX-logos/logo-transparent-png.png'
import './Navbar.css'

const NavBar = () => {
  return (
   <>
    <div className="navbar">
        <div className="left">
        <label class="burger" for="burger">
          <input type="checkbox" id="burger"/>
          <span></span>
          <span></span>
          <span></span>
        </label>
          <img className="logo" src={ img } alt="CartX Logo" width="60"height="60"/>
        </div>
        <div className="middle">
          <SearchBar className="searchbar"/>
        </div>
        <div className="right">
        </div>
    </div>    
   </>
  )
}

export default NavBar

