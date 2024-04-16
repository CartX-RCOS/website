import React, { useState, useEffect } from 'react';
import AnalysisCard from '../../components/AnalysisCard/AnalysisCard';
import StoreCard from '../../components/StoreCard/StoreCard';

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
            <StoreCard key={index} store={store} index={index} />
            <div className="matched-items">
               <h3>Matched Items:</h3>
               <div className="store-analysis">
                  <AnalysisCard key={index} data={store} matched={true} />
               </div>
            </div>
            <div className="not-matched-items">
               {store.notMatchedItems.length > 0 && <h3>Not Found:</h3>}
               <div className="store-analysis">
                  <AnalysisCard key={index} data={store} matched={false} />
               </div>
            </div>
         </div>
         ))}
      </div>
   );
};

export default AnalyzeStores;
