import axios from "axios";
import { useEffect, useState } from "react";
import CategorieCard from "../CategorieCard/CategorieCard";
import "./Categories.css";
const Categories = () => {
  const [categorCards, setCategorCards] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://fakestoreapi.com/products",
      withCredentials: false,
    })
      .then((res) => {
        setCategorCards(res.data);
      })
      .catch((err) => { 
        console.log(err);
      });
  }, []);

  return (
    <div className="big-continer">
      <h3 className="head-text">Categories</h3>
      <div className="continer-category">
        {categorCards.slice(0, 4).map((card, index) => {
          return (
            <div key={index}>
              <CategorieCard image={card.image} category={card.category} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
