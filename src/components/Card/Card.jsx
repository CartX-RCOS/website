import React from 'react';
import './Card.css';
import {MDBCard, MDBCardBody, MDBCardImage, MDBRipple } from "mdb-react-ui-kit";

const Card = ({ data }) => {
  console.log(data.images_links?.[0]?.product_image_url ?? 'Default URL');
   return (
      <>
         <MDBCard>
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image rounded hover-zoom"
            >
              <MDBCardImage
                src={data.images_links?.[0]?.product_image_url ?? ""} 
                fluid
                className="w-100"
              />
              <a href="#!">
                <div className="hover-overlay">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </div>
              </a>
            </MDBRipple>
            <MDBCardBody>
              <a href="#!" className="text-reset">
                <h5 className="card-title mb-3">{data.name}</h5>
              </a>
              <a href="#!" className="text-reset">
                {/* <p>{data.size}</p> */}
              </a>
            </MDBCardBody>
         </MDBCard>
      </>
   );
};

export default Card;
