import "./CategorieCard.css";

const CategorieCard = (props) => {
  return (
    <div className="card-continer">
      <img src={props.image} className="card-img-top" alt="..." />
      <div style={{'backgroundColor': '#46965465'}} className="card-body">
        <h5 className="card-title">{props.category}</h5>
      </div>
    </div>
  );
};

export default CategorieCard;
