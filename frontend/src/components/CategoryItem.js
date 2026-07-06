import React from "react";
import { useNavigate } from "react-router-dom";

function CategoryItem(props) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/products/${props.id}`);
  }

  return (
    <div className="category-item" onClick={handleClick}>
      <img src={props.image} className="category-image" alt={props.title} />
      <h3 className="category-title">{props.title}</h3>
    </div>
  );
}

export default CategoryItem;