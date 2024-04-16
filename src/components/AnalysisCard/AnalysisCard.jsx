import React from 'react';
import './AnalysisCard.css'; 

const AnalysisCard = ({ data, matched }) => {
   let d = matched ? data.matchedItems : data.notMatchedItems

   // const cardStyle = {
   //    width: matched ? '400px' : '270px'
   //  };
   return (
      <div className="product-card">
         <div className="matched-items-container">
            {d.map((item, idx) => (
               <div key={idx} className="matched-item">
                  <p>{item.name} - ${item.price} x{item.quantity}</p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default AnalysisCard;
