import React from "react";
import CategoryItem from "./CategoryItem";

function HomeCategoryBox(props) {
  return (
    <div className="category-box">
      <h2 className="category-heading">{props.heading}</h2>

      <div className="category-items">
        {props.items.map(
          (
            item,
            index, //map for items
          ) => (
            <CategoryItem
              key={index}
              id={item.id}
              title={item.title}
              value={item.value}
              image={item.image}
            />
          ),
        )}
      </div>
    </div>
  );
}

export default HomeCategoryBox;
