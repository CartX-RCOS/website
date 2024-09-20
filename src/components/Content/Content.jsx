import './Content.css'
import ItemSelector from '../ItemSelector/ItemSelector'

const Content = (props) => {
   

   return (
      <div>
         <ItemSelector sidebar={props.sidebar} data={props.data} setCart={props.setCart} cart={props.cart} />
      </div>
   )

}


export default Content
