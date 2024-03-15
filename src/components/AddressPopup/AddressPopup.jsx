import React, { useRef, useEffect, useState } from 'react';
import "./AddressPopup.css";
import { TiTimes } from "react-icons/ti";
import { SlMagnifier } from "react-icons/sl";


function AddressPopup(props) {
    const body = document.querySelector('body');
    const bing_key = process.env.REACT_APP_BING_KEY;
    const inputRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        body.style.overflow = 'hidden';
        inputRef.current.focus();
    });

    function parseAddress(address) {
        // Split the address by comma to separate the main parts
        const parts = address.split(',');
    
        // Check if the address has the expected number of parts
        if (parts.length >= 3) {
            // The town is expected to be the second to last part after splitting by comma
            const town = parts[parts.length - 2].trim();
            // The zipcode is expected to be the last part, so we split by space and take the last element
            const zipcode = parts[parts.length - 1].trim().split(' ').pop();
            return town + " " + zipcode;
        } else {
            // Return an error message or handle the error as appropriate
            return "Address format not recognized";
        }
    }

    const handleInputChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            let response;
            try {
                response = await fetch(`https://dev.virtualearth.net/REST/v1/Autosuggest?query=${query}&key=${bing_key}&maxResults=4`);
                if (!response.ok)
                    throw new Error(`Network response was not ok (${response.status})`);


                const suggestion = await response.json();

                let allSuggestions = suggestion.resourceSets[0].resources[0].value;
                let addresses = [];
                for (let i = 0; i < allSuggestions.length; i++) {
                    addresses.push(allSuggestions[i].address.formattedAddress);
                }

                setSuggestions(addresses);
            } catch (e) {
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
        props.setAddress(parseAddress(searchQuery));
        setSearchQuery('');
        props.onClose();
        console.log("the value should be changed now!",parseAddress(searchQuery))
        localStorage.setItem('address', parseAddress(searchQuery));
    };

    const buttonClick = () => {
        if (searchQuery) {
            setSearchQuery('');
            inputRef.current.focus();
        } else {
            inputRef.current.focus();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddressSubmit(e);
        }
    };

    return (
        <div className="overlay">
            <div className="address-popup">
                <div className="top">
                    <button className="close-address" onClick={props.onClose}>
                        <TiTimes size={30} color="rgb(101, 101, 101)" />
                    </button>

                    <h1 className="header">Choose Address</h1>
                </div>
                <div className="search-container">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for an address..."
                        className="address-search"
                        value={searchQuery}
                        onChange={handleInputChange}
                        onSubmit={handleAddressSubmit}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleAddressSubmit} className="search-button">
                        <SlMagnifier />
                    </button>
                    {searchQuery && 
                        <button onClick={buttonClick} id="x">
                            <TiTimes size={20}/>
                        </button>
                    } 
                </div>

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