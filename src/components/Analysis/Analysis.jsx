import React, { useState } from 'react';
import { FaChevronDown, FaExternalLinkAlt  } from 'react-icons/fa';
import './Analysis.css';

const data = [
   { 
      name: 'Local Market', 
      distance: 0.8, 
      priceComparison: 92, 
      itemAvailability: 90, 
      savings: 12.30, 
      bestChoice: true,
      comparisonString: "5% Cheaper than average",
      url: "https://google.com",
      items: [
         {
            name: "Milk",
            contains: true,
            price: 20.00,
            url: "https://www.hannaford.com/product/fiji-water/803739"
         },
         {
            name: "Gatorade",
            contains: false,
            price: 20.00,
            url: ""
         },
         {
            name: "Cheese",
            contains: true,
            price: 20.00,
            url: "https://www.hannaford.com/product/fiji-water/803739"
         },
         {
            name: "Coke",
            contains: true,
            price: 20.00,
            url: "https://www.hannaford.com/product/fiji-water/803739"
         },
         {
            name: "Milk",
            contains: false,
            price: 20.00,
            url: ""
         },
         {
            name: "Cheese",
            contains: false,
            price: 20.00,
            url: ""
         }
      ],    
   },
   { 
      name: 'Super Target', 
      distance: 0.8, 
      priceComparison: 92, 
      itemAvailability: 90, 
      savings: 12.30, 
      bestChoice: true,
      comparisonString: "5% Cheaper than average",
      url: "https://google.com",
      items: [
         {
            name: "Milk",
            contains: true,
            price: 20.00,
            url: "https://www.hannaford.com/product/fiji-water/803739"
         },
         {
            name: "Gatorade",
            contains: false,
            price: 20.00,
            url: ""
         },
         {
            name: "Cheese",
            contains: true,
            price: 20.00,
            url: "https://www.hannaford.com/product/fiji-water/803739"
         },
         {
            name: "Coke",
            contains: true,
            price: 20.00,
            url: "https://www.hannaford.com/product/fiji-water/803739"
         },
         {
            name: "Milk",
            contains: false,
            price: 20.00,
            url: ""
         },
         {
            name: "Cheese",
            contains: false,
            price: 20.00,
            url: ""
         }
      ],    
   },
   { 
      name: 'Local Market', 
      distance: 0.8, 
      priceComparison: 92, 
      itemAvailability: 90, 
      savings: 12.30, 
      bestChoice: false,
      comparisonString: "5% Cheaper than average",
      url: "https://google.com",
      items: [
         {
            name: "Milk",
            contains: true,
            price: 20.00,
            url: "https://www.hannaford.com/product/fiji-water/803739"
         },
         {
            name: "Gatorade",
            contains: false,
            price: 20.00,
            url: ""
         },
         {
            name: "Cheese",
            contains: true,
            price: 20.00,
            url: "https://www.hannaford.com/product/fiji-water/803739"
         },
         {
            name: "Coke",
            contains: true,
            price: 20.00,
            url: "https://www.hannaford.com/product/fiji-water/803739"
         },
         {
            name: "Milk",
            contains: false,
            price: 20.00,
            url: ""
         },
         {
            name: "Cheese",
            contains: false,
            price: 20.00,
            url: ""
         }
      ],    
   }
   
];

const Analysis = ({sidebar}) => {
   const [selectedStore, setSelectedStore] = useState(null);
   const [isExiting, setIsExiting] = useState(false);
   const [shoppingLinks, setShoppingLinks] = useState({});


   const toggleSelect = (index) => {
      if (selectedStore === index) {
         setIsExiting(true); 
         setTimeout(() => {
            setSelectedStore(null); 
            setIsExiting(false); 
         }, 400); 
      } else {
         setSelectedStore(index); 
         setIsExiting(false); 
      }
   };

   function isInstacartSupported(storeName) {
      let supported = ["Market 32", "ALDI", "Price Rite", "ShopRite", "Price Chopper", "Hannaford", "Tops Markets", "Market Bistro", "Restaurant Depot", "Target", "Kinney Drugs"]
      
      for (let i = 0; i < supported.length; i++) {
         if (storeName.includes(supported[i])) {
            return true;
         }
      }
     
     return false;   
   }

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

   async function getStoreShoppingLink(store) {
      try {
         const response = await fetch("http://localhost:8080/getInstacartShoppingLink", {
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
   }

   return (
      <div className="analysis-grid">
         {data.map((store, index) => (
            <div className="analysis-block" key={index}>
               <div className="analysis-header">
                  <h2>{store.name}</h2>
                  <button
                     className={`dropdown-arrow ${selectedStore === index ? 'arrow-up' : ''}`}
                     onClick={() => toggleSelect(index)}
                  >
                     <FaChevronDown />
                  </button>
               </div>
               <p className="location">{store.distance} miles away</p>
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
               <p className="savings">Potential Savings: <span>${store.savings}</span></p>
               <p className={`instacart-supported ${isInstacartSupported(store.name) ? "yes":"no"}`}>Instacart Supported {isInstacartSupported(store.name) ? "✓" : "✖"}</p>
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
               <div className="main-info">
                  <h2>{data[selectedStore].name} Details</h2>
                  <div className='orderRedirect'>
                     <button className="best-choice" onClick={() => handleBestChoiceClick(data[selectedStore])}>
                     {/* <a href={"https://google.com"} target="_blank" rel="noopener noreferrer"> */}
                        <span>Order </span>
                        <FaExternalLinkAlt id="redirect"/>
                     {/* </a> */}
                     </button>
                  </div>
               </div>
               <div className="sub-info">
                  <p id="distance">Distance: {data[selectedStore].distance} miles</p>
                  <p id="comparisonString">{data[selectedStore].comparisonString}</p>
               </div>

               <div className="items-grid">
                  {data[selectedStore].items.map((item, index) => (
                     <div key={index} className="item-card">
                        <p>{item.name}</p>
                        {/* Check if item is available */}
                        {item.contains ? (
                           <div className="available"> 
                              <div className="price">${item.price}</div>
                              <div className="externalLink">
                                 <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    <FaExternalLinkAlt />
                                 </a>
                              </div>
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
