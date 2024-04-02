import React, { useState, useEffect } from 'react';
import AnalysisCard from '../../components/AnalysisCard/AnalysisCard';

const AnalyzeStores = () => {
   const [stores, setStores] = useState([]);

   useEffect(() => {
      fetch('http://localhost:8080/analyseStores')
         .then(response => response.json())
         .then(data => {
            const sortedStores = Object.values(data).sort((a, b) => b.averageAnalysisPoints - a.averageAnalysisPoints);
            setStores(sortedStores);
         })
         .catch(error => console.error('Error fetching store data:', error));
   }, []);

   return (
      <div className="store-analysis">
         {stores.map((store, index) => (
         <div key={index} className="store">
            <h2>{`${index + 1}. ${store.name}`}</h2>
            <p>Address: {store.address}</p>
            <p>Distance: {store.distance.toFixed(2)} miles</p>
            <p>Travel Time: {store.travelTime.toFixed(2)} minutes</p>
            <p>Analysis Points: {store.analysisPoints.toFixed(2)}</p>
            <div className="matched-items">
               <h3>Matched Items:</h3>
               <div className="store-analysis">
                  <AnalysisCard key={index} data={store} />
               </div>
            </div>
            <div className="not-matched-items">
               {store.notMatchedItems.length > 0 && <h3>Items Not Found:</h3>}
               <ul>
               {store.notMatchedItems.map((item, idx) => (
                  <li key={idx}>{`${item.name} - $${item.price} x${item.quantity}`}</li>
               ))}
               </ul>
            </div>
         </div>
         ))}
      </div>
   );
};

export default AnalyzeStores;
