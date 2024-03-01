import React, { useRef, useEffect, useState } from 'react';
import "./AddressPopup.css";
import {TiTimes} from "react-icons/ti";
import { SlMagnifier} from "react-icons/sl";

function AddressPopup(props) {
    const body = document.querySelector('body');
    const inputRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        body.style.overflow = 'hidden';
        inputRef.current.focus();
    }); 

    const handleInputChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const bing_key = process.env.REACT_APP_BING_KEY;

        if (query.length > 0) {
        let response;
        try{
            response = await fetch(`https://dev.virtualearth.net/REST/v1/Autosuggest?query=${query}&key=${bing_key}&maxResults=4`);
            if (!response.ok)
                throw new Error(`Network response was not ok (${response.status})`);
        

        const suggestion = await response.json();

        let allSuggestions= suggestion.resourceSets[0].resources[0].value;
        let addresses = [];
        for (let i = 0; i < allSuggestions.length; i++){
            addresses.push(allSuggestions[i].address.formattedAddress);
        }

        setSuggestions(addresses);
        } catch(e){
            console.log('Error:', e);
        }
        
        } else {
            setSuggestions([]); // Clear suggestions if the search query is empty
        }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion); // Populate the input with selected suggestion
    setSuggestions([]); // Clear suggestions
  };
  
    const handleAddressSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        props.setAddress(e);
        setSearchQuery('')
    };

    const buttonClick = () => {
        if (searchQuery) {
          setSearchQuery('');
          inputRef.current.focus();
        } else {
          inputRef.current.focus();
        }
      };
    return (
        <div className="overlay">
            <div className="address-popup">
                <div className="top">
                    <button className="close-address" onClick={props.onClose}>
                        <TiTimes size={30} color="rgb(101, 101, 101)"/>
                    </button>
                
                <h1 className="header">Choose Address</h1>
                </div>
                <form onSubmit={handleAddressSubmit}>
                <div className="search-container">
                    <input 
                        ref={inputRef} 
                        type="text" 
                        placeholder="Search for an address..." 
                        className="address-search"
                        value={searchQuery}
                        onChange={handleInputChange}/>

                    <button onClick={buttonClick} className="search-button">
                        {searchQuery ? <TiTimes size ={20}/> : <SlMagnifier/>}
                    </button>  
                </div>
                </form>
                
                
                <div className="suggestions-container">
                {searchQuery.length > 3 &&
                    <div className="suggestions">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="suggestion_line"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                            {suggestion}
                            </div>
                        ))}
                    </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default AddressPopup;