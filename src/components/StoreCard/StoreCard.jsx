import React from 'react';
import './StoreCard.css';
import shoprite from '../../assets/Store-logos/shoprite.png';

const StoreCard = ({ store, index }) => {
  return (
    <div className="store-card">
      <img src={shoprite} alt={`${store.name}`} className="store-image" />
      <div className="store-details">
        <div className="store-card-header">
          <h2>{`${store.name}`}</h2>
        </div>
        <div className="store-card-info">
          <p>Address: {store.address}</p>
          <p>Distance: {store.distance.toFixed(2)} miles</p>
          <p>Travel Time: {store.travelTime.toFixed(2)} minutes</p>
          <p>Analysis Points: {store.analysisPoints.toFixed(2)}</p>
        </div>
        <div className="store-card-footer">
          {/* Your additional footer information here */}
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
