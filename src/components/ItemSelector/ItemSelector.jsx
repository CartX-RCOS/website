import { React } from 'react';
import Card from '../Card/Card';
import './ItemSelector.css'

const Cart = (props) => {
    

  // adds to cart
  const addToCart = (product) => {
    props.setCart(currentCart => [...currentCart, product]);
  };

  //removes from cart
  const removeFromCart = (product) => {
    const target_id = product._id;
    props.setCart(currentCart => {
      return currentCart.filter(item => item._id !== target_id);
    })
  }

  return (
   <>
    <div className="content-wrapper">
      <div className="content" style={!props.sidebar ? { width: "100vw", left: "0%" } : null }>
        {
          props.data && props.data.map((item) => (
            <Card key={item._id} data={item} addToCart={addToCart} removeFromCart={removeFromCart}/>
          ))
        }
      </div>   
    </div>
   </>
  )
}

export default Cart

