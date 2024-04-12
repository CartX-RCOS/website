import React, { useState, useEffect } from 'react';
import './Card.css';

const Card = (props) => {
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
      for (let url of props.data.images_links) {
        if (await checkImage(url)) {
          setImageSrc(url);
          return;
        }
      }

      for (let matchKey in props.data.matches) {
        for (let url of props.data.matches[matchKey].images_links) {
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
      const containsNumber = /\d/.test(props.data.size);
      if (!containsNumber && props.data.size && props.data.quantity) {
        // Combine data.quantity and data.size if data.size has no number
        return `${props.data.quantity} ${props.data.size}`;
      }
      // Return original size if condition not met
      return props.data.size;
    };

     setProductSize(formatProductSize());
  }, [props.data.images_links, props.data.matches, props.data.size, props.data.quantity]);


  const [isAdded, setIsAdded] = useState(false); // State to track if added to cart

  const handleAddToCart = () => {
    props.addToCart(props.product);
    setIsAdded(true); // Update state to indicate product is added
  };

  

  return (
    <>
      <div className="product-card">
        <button
          className={`addToCart ${isAdded || props.isInCartPage ? 'added' : ''}`}
          onClick={handleAddToCart}
          aria-label={isAdded || props.isInCartPage ? "Added to cart" : "Add to cart"}
      >
          {isAdded || props.isInCartPage ? '✓' : '+'}
      </button>
        <img src={imageSrc} alt="Product name"/>
        <div className="info">
          <h3>{props.data.name}</h3>
          <p>{productSize}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
