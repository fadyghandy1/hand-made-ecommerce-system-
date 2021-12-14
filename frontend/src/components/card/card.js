import React from "react";
import "./card.scss";
import { Link } from "react-router-dom";
export function Card({name, description, image, price,id}) {
  // const products = [
  //   {
  //     name: "labtop lenovo ",
  //     image: "",
  //     price: "5$",
  //   },
  // ];
  return (
    <>
        
          <div className="col-lg-3 col-sm-8 col-md-5 card-div-parent text-center bg-light px-1 my-5 mx-4">
                  <img  className="cart-image" src={image} alt="" />
               
                    <p className="pt-1" id="name-display">
                      {name}
                    </p>

                    <div className="d-flex justify-content-center">
                    <small className="px-1">EGP</small>

                      <h5>{price}</h5>
                    </div>
                    <Link className="button-details cart-button py-1" to={`/product/${id}`}>
                        Details
                      </Link>{" "}
                
               
            </div>
    
     
       
         
    </>
  );
}
