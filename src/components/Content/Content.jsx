import React from 'react';
import Card from '../Card/Card';
import './Content.css'

const Content = (props) => {
  // console.log(props.data);
  return (
   <>
    <div className="content-wrapper">
      <div className="content" style={!props.sidebar ? { width: "100vw", left: "0%" } : null }>
        {
          props.data && props.data.map((item) => (
            <Card key={item._id} data={item}/>
          ))
        }
      </div>   
    </div>
   </>
  )
}

export default Content

