import './SearchBar.css';
import axios from 'axios';
import { useState, useRef } from 'react';

const SearchBar = (props) => {
   const [searchText, setSearchText] = useState('');
   const inputRef = useRef(null);
   const stores = props.stores;

   const handleInputChange = (event) => {
      event.preventDefault();
      setSearchText(event.target.value);
   };

   const handleSubmit = async (event) => {
      if (searchText !== ""){
         try {
            const response = await axios.post("/getPairedItems", {stores : stores, searchQuery : searchText });
            props.setData(response.data);
          } catch (e) {
            console.log(e);
          }
         inputRef.current.blur();
      }
   }

   const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSubmit(event);
      }
    };

   return (
   <>
      <div className="search">
         <input type="search" 
         className="search__input" 
         placeholder="Search" 
         value={searchText} 
         onChange={handleInputChange}
         onKeyDown={handleKeyPress}
         ref={inputRef}
         />
         <button className="search__button" onClick={handleSubmit}>
         <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"> </path>
            </g>
        </svg>
      </button>
   </div>
         
   </>
  )
}

export default SearchBar

