import './Content.css'
import ItemSelector from '../ItemSelector/ItemSelector'

const Content = (props) => {
   

   return (
      <div className="content" style={!props.sidebar ? { width: "100vw", left: "0%" } : null }>
         { props.onAnalysis ? (
            <h1>Analysis</h1>
         ) : (
            <ItemSelector sidebar={props.sidebar} data={props.data} setCart={props.setCart} cart={props.cart} />
         )}
      </div>
   )

}


export default Content
