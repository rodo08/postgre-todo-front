import { Link } from "react-router-dom";

const MenuItem = ({ itemImage, title, description, route }) => {
  return (
    <Link to={route} className="w-full">
      {itemImage}
      <div className="pt-4">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </Link>
  );
};
export default MenuItem;
