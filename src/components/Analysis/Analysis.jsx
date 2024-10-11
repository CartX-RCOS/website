import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Analysis.css';

const data = [
   { 
      name: 'SuperMart', 
      distance: 1.2, 
      priceComparison: 95, 
      itemAvailability: 100, 
      savings: 15.50, 
      bestChoice: true, 
      additionalInfo: 'Open 24/7. Address: 123 Market St.'
   },
   { 
      name: 'Grocery King', 
      distance: 2.5, 
      priceComparison: 88, 
      itemAvailability: 95, 
      savings: 10.00, 
      bestChoice: false,
      additionalInfo: 'Opens from 8 AM to 10 PM. Address: 456 King Ave.'
   },
   { 
      name: 'Local Market', 
      distance: 0.8, 
      priceComparison: 92, 
      itemAvailability: 90, 
      savings: 12.30, 
      bestChoice: true,
      additionalInfo: 'Open 9 AM to 6 PM. Address: 789 Local Rd.'
   },
   { 
      name: 'Grocery King', 
      distance: 2.5, 
      priceComparison: 88, 
      itemAvailability: 95, 
      savings: 10.00, 
      bestChoice: false,
      additionalInfo: 'Opens from 8 AM to 10 PM. Address: 456 King Ave.'
   },
   { 
      name: 'Local Market', 
      distance: 0.8, 
      priceComparison: 92, 
      itemAvailability: 90, 
      savings: 12.30, 
      bestChoice: true,
      additionalInfo: 'Open 9 AM to 6 PM. Address: 789 Local Rd.'
   },
   { 
      name: 'Grocery King', 
      distance: 2.5, 
      priceComparison: 88, 
      itemAvailability: 95, 
      savings: 10.00, 
      bestChoice: false,
      additionalInfo: 'Opens from 8 AM to 10 PM. Address: 456 King Ave.'
   },
   { 
      name: 'Local Market', 
      distance: 0.8, 
      priceComparison: 92, 
      itemAvailability: 90, 
      savings: 12.30, 
      bestChoice: true,
      additionalInfo: 'Open 9 AM to 6 PM. Address: 789 Local Rd.'
   }
];

const Analysis = () => {
   const [selectedStore, setSelectedStore] = useState(null);
   const [isExiting, setIsExiting] = useState(false); // State for managing the slide-down animation


   const toggleSelect = (index) => {
      if (selectedStore === index) {
         setIsExiting(true); 
         // Wait for animation to complete before setting the store to null
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
                     {selectedStore === index ? <FaChevronUp /> : <FaChevronDown />}
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
            <div className={`store-info-popup ${isExiting ? 'exit' : ''}`}>
               <h2>{data[selectedStore].name} Info</h2>
               <p>{data[selectedStore].additionalInfo}</p>
            </div>
         )}
      </div>
   );
};

export default Analysis;
