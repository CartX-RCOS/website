import React, { useState, useEffect } from 'react';
import './Card.css';

const Card = ({ data }) => {
  const [imageSrc, setImageSrc] = useState('');
  const [productSize, setProductSize] = useState('');

  useEffect(() => {
    const checkImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    };

    const findValidImage = async () => {
      for (let url of data.images_links) {
        if (await checkImage(url)) {
          setImageSrc(url);
          return;
        }
      }

      for (let matchKey in data.matches) {
        for (let url of data.matches[matchKey].images_links) {
          if (await checkImage(url)) {
            setImageSrc(url);
            return;
          }
        }
      }
    };

    findValidImage();
    const formatProductSize = () => {
      // Check if data.size contains any number
      const containsNumber = /\d/.test(data.size);
      if (!containsNumber && data.size && data.quantity) {
        // Combine data.quantity and data.size if data.size has no number
        return `${data.quantity} ${data.size}`;
      }
      // Return original size if condition not met
      return data.size;
    };

     setProductSize(formatProductSize());
  }, [data.images_links, data.matches, data.size, data.quantity]);


  

  return (
    <>
      <div className="product-card">
        <img src={imageSrc} alt="Product name"/>
        <div className="info">
          <h3>{data.name}</h3>
          <p>{productSize}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
