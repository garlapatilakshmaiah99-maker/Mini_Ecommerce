import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import CategoryItem from "../components/CategoryItem";

                                              // No need home category 
function Home() {
  const [activeCategories, setActiveCategories] = useState([]);

  async function fetchCategories() {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/categories/all"
      );

      const activeOnly = response.data.categories.filter((category) => {
        return category.status === "active";
      });

      setActiveCategories(activeOnly);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="hero-section">
      <h1 className="home-title">Welcome To ShopEasy</h1>

      <p>
        Discover the latest electronics and home essentials at the best prices.
      </p>

      <button>Shop Now</button>

      <div className="category-items">
        {activeCategories.map((category) => (
          <CategoryItem
            key={category._id}
            id={category._id}
            title={category.name}
            value={category.value}
            image={category.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;