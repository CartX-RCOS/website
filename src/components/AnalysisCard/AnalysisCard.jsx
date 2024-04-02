import React from 'react';
import './AnalysisCard.css'; 

const AnalysisCard = ({ data }) => {
   console.log(data)
   return (
      <div className="product-card">
         <div className="matched-items-container">
         {data.matchedItems.map((item, idx) => (
            <div key={idx} className="matched-item">
               <p>{item.name} - ${item.price} x{item.quantity}</p>
            </div>
         ))}
         </div>
      </div>
   );
};

export default AnalysisCard;
