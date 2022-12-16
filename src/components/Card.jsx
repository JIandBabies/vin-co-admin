import { Link } from "react-router-dom";

const Card = ({ productList }) => {
  return (
    <div className="border">
      <Link to={`/product/${productList.id}`}>
        <div>{productList.title}</div>
        <img src={productList.thumbnail} alt="" />
        <div>{productList.price.toLocaleString()}</div>
      </Link>
    </div>
  );
};
export default Card;
