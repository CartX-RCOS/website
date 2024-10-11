import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
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
      items: [
         {
            name: "Milk",
            contains: true,
            price: 20.00
         },
         {
            name: "Gatorade",
            contains: false,
            price: 0.0
         },
         {
            name: "Cheese",
            contains: true,
            price: 20.00
         },
         {
            name: "Coke",
            contains: true,
            price: 20.00
         },
         {
            name: "Milk",
            contains: false,
            price: 0.0
         },
         {
            name: "Cheese",
            contains: false,
            price: 0.0
         }
      ],    
   },
   { 
      name: 'Local Market', 
      distance: 0.8, 
      priceComparison: 92, 
      itemAvailability: 90, 
      savings: 12.30, 
      bestChoice: true,
      comparisonString: "5% Cheaper than average",
      items: [
         {
            name: "Milk",
            contains: true,
            price: 20.00
         },
         {
            name: "Gatorade",
            contains: false,
            price: 0.0
         },
         {
            name: "Cheese",
            contains: true,
            price: 20.00
         },
         {
            name: "Coke",
            contains: true,
            price: 20.00
         },
         {
            name: "Milk",
            contains: false,
            price: 0.0
         },
         {
            name: "Cheese",
            contains: false,
            price: 0.0
         }
      ],    
   },
   { 
      name: 'Local Market', 
      distance: 0.8, 
      priceComparison: 92, 
      itemAvailability: 90, 
      savings: 12.30, 
      bestChoice: true,
      comparisonString: "5% Cheaper than average",
      items: [
         {
            name: "Milk",
            contains: true,
            price: 20.00
         },
         {
            name: "Gatorade",
            contains: false,
            price: 0.0
         },
         {
            name: "Cheese",
            contains: true,
            price: 20.00
         },
         {
            name: "Coke",
            contains: true,
            price: 20.00
         },
         {
            name: "Milk",
            contains: false,
            price: 0.0
         },
         {
            name: "Cheese",
            contains: false,
            price: 0.0
         }
      ],    
   }
   
];

const Analysis = ({sidebar}) => {
   const [selectedStore, setSelectedStore] = useState(null);
   const [isExiting, setIsExiting] = useState(false);


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
               <button className="best-choice">{store.bestChoice ? '✓ Best Choice' : 'Consider'}</button>
            </div>
         ))}

         {selectedStore !== null && (
            <div className={`store-info-popup ${isExiting ? 'exit' : ''}`} style={!sidebar ? { width: "100vw", left: "0%" } : null }>
               <h2>{data[selectedStore].name} Details</h2>
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
                           <div className="price">${item.price}</div>
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
