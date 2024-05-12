import React, { useState, useEffect } from 'react';
import { useCart } from '../../CartProvider';
import './Card.css';

const Card = ({ data }) => {

  // eslint-disable-next-line
  const { cartItems, addItemToCart, removeItemFromCart } = useCart();
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

  const isInCart = cartItems.some(item => item._id === data._id);

  return (
    <>
      <div className="product-card">
        <img src={imageSrc} alt="Product name"/>
        <div className="info">
          <h3>{data.name}</h3>
          <p>Price : {data.price}</p>
          
          <button
            onClick={() => isInCart ? removeItemFromCart(data) : addItemToCart(data)}
            className={isInCart ? 'addToCart added' : 'addToCart'}>
            {isInCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>  
        
        </div>
      </div>
    </>
  );
};

export default Card;