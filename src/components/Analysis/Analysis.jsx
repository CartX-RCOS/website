import React, { useState } from 'react';
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
   }
];

const Analysis = () => {
   const [showMoreInfo, setShowMoreInfo] = useState(Array(data.length).fill(false));

   const toggleMoreInfo = (index) => {
      const newShowMoreInfo = [...showMoreInfo];
      newShowMoreInfo[index] = !newShowMoreInfo[index];
      setShowMoreInfo(newShowMoreInfo);
   };

   return (
      <div className="analysis-grid">
         {data.map((store, index) => (
            <div className="analysis-block" key={index}>
               <h2>{store.name}</h2>
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
               <button className="more-info" onClick={() => toggleMoreInfo(index)}>
                  {showMoreInfo[index] ? 'Hide Info' : 'More Info'}
               </button>
               {showMoreInfo[index] && (
                  <div className="additional-info">
                     <p>{store.additionalInfo}</p>
                  </div>
               )}
            </div>
         ))}
      </div>
   );
};

export default Analysis;
