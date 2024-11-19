import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaExternalLinkAlt } from 'react-icons/fa';
import './Analysis.css';

const Analysis = ({ sidebar, cart }) => {
   const [data, setData] = useState([]);
   const [selectedStore, setSelectedStore] = useState(null);
   const [isExiting, setIsExiting] = useState(false);
   const [shoppingLinks, setShoppingLinks] = useState({});
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/analyseStores`, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify({ cart })
            });

            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
            setLoading(false);
         } catch (err) {
            setError(err.message);
            setLoading(false);
         }
      };

      fetchData();
   }, [cart]);

   const toggleSelect = (store) => {
      if (selectedStore === store) {
         setIsExiting(true); 
         setTimeout(() => {
            setSelectedStore(null); 
            setIsExiting(false); 
         }, 400); 
      } else {
         setSelectedStore(store); 
         setIsExiting(false); 
      }
   };

   const isInstacartSupported = (storeName) => {
      const supported = [
         "Market 32", "ALDI", "Price Rite", "ShopRite", "Price Chopper",
         "Hannaford", "Tops Markets", "Market Bistro", "Restaurant Depot", 
         "Target", "Kinney Drugs"
      ];
      return supported.some(supportedStore => storeName.includes(supportedStore));
   };

   const handleBestChoiceClick = async (store) => {
      if (shoppingLinks[store.name]) {
         window.open(shoppingLinks[store.name], '_blank');
         return;
      }

      const link = isInstacartSupported(store.name) 
         ? await getStoreShoppingLink(store) 
         : store.url;

      setShoppingLinks((prevLinks) => ({ ...prevLinks, [store.name]: link }));
      window.open(link, '_blank');
   };

   const getStoreShoppingLink = async (store) => {
      try {
         const apiUrl = process.env.REACT_APP_API_URL;
         const response = await fetch(`${apiUrl}/getInstacartShoppingLink`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items: store.items })
         });

         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
         }

         const data = await response.json();
         return data.shoppingListUrl;
      } catch (error) {
         console.error("Error fetching the Instacart shopping link:", error);
         return store.url;
      }
   };

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error}</p>;

   return (
      <div className="analysis-grid">
         {Object.values(data).map((store, index) => (
            <div className="analysis-block" key={index}>
               <div className="analysis-header">
                  <h2>{store.name}</h2>
                  <button
                     className={`dropdown-arrow ${selectedStore === store.name ? 'arrow-up' : ''}`}
                     onClick={() => toggleSelect(store.name)}
                  >
                     <FaChevronDown />
                  </button>
               </div>
               <p className="location">{store.distance.toFixed(2)} miles away</p>
               <div className="bar">
                  <span>Price Comparison</span>
                  <div className="progress">
                     <div className="progress-value" style={{ width: `${store.priceComparison}%` }}></div>
                  </div>
                  <span>{store.priceComparison}%</span>
               </div>
               <div className="bar">
                  <span>Item Availability</span>
                  <div className="progress">
                     <div className="progress-value" style={{ width: `${store.itemAvailability}%` }}></div>
                  </div>
                  <span>{store.itemAvailability}%</span>
               </div>
               <p className="savings">Potential Savings: <span>${store.savings.toFixed(2)}</span></p>
               <p className={`instacart-supported ${isInstacartSupported(store.name) ? "yes":"no"}`}>
                  Instacart Supported {isInstacartSupported(store.name) ? "✓" : "✖"}
               </p>
               <button className="best-choice" onClick={() => handleBestChoiceClick(store)}>
                  {store.bestChoice ? '✓ Best Choice ' : 'Consider '}
                  <span style={{ marginLeft: '8px' }}>
                     <FaExternalLinkAlt />
                  </span>               
               </button>            
            </div>
         ))}

         {selectedStore !== null && (
            <div className={`store-info-popup ${isExiting ? 'exit' : ''}`} style={!sidebar ? { width: "100vw", left: "0%" } : null }>
               <h2>{data[selectedStore].name} Details</h2>
               <div className="sub-info">
                  <p id="distance">Distance: {data[selectedStore].distance.toFixed(2)} miles</p>
                  <p id="comparisonString">{data[selectedStore].comparisonString}</p>
               </div>

               <div className="items-grid">
                  {data[selectedStore].items.map((item, index) => (
                     <div key={index} className="item-card">
                        <p>{item.name}</p>
                        {item.contains && item.price != 0 ? (
                           <div className="available"> 
                              <div className="price">${item.price}</div>
                                 {item.url != "" ? (
                                    <div className="externalLink">
                                       <a href={item.url} target="_blank" rel="noopener noreferrer">
                                          <FaExternalLinkAlt />
                                       </a>
                                    </div>
                                 ) : (<div></div>)}
                           </div>
                        ) : (
                           <div className="unavailable">
                              <span>✖ </span>N/A 
                           </div>
                        )}
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};

export default Analysis;
