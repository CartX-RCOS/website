import { React, useState } from 'react';
import Card from '../Card/Card';
import './Content.css'

const Content = (props) => {
    const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? savedCart : [];
  });

  // adds to cart
  const addToCart = (product, store) => {

    setCart(currentCart => [...currentCart, ...product]);
    0console.log(cart);
  };
  return (
   <>
    <div className="content-wrapper">
      <div className="content" style={!props.sidebar ? { width: "100vw", left: "0%" } : null }>
        {
          props.data && props.data.map((item) => (
            <Card key={item._id} data={item} isInCartPage={false} addToCart={addToCart}/>
          ))
        }
      </div>   
    </div>
   </>
  )
}

export default Content

