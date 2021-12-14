 import './CategoryProductCard.css'
 const CategoryProductCard = (props)=>{
    return (
        <div className="card-continer">
          <h5 className="card-title">{props.name}</h5>
          <img src={props.image} className="card-img-top" alt="..." />
          <div style={{'backgroundColor': props.color}} className="card-body card-price">
          <h5 >{props.price}$</h5>
          </div>
        </div>
      );
 }

 export default CategoryProductCard;