import React from "react";
import { useNavigate } from "react-router-dom";

const Menu = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/submenu/${categoryName}`);
  };

  return (
    <div>
      <h1>Main Menu</h1>
      <div className="menu-category" style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="item-card"
            onClick={() => handleCategoryClick(cat.name)}
            style={{ cursor: "pointer", width: 180, border: "1px solid #ccc", borderRadius: 8, padding: 10, textAlign: "center" }}
          >
            <img src={cat.image} alt={cat.name} className="item-image" style={{ width: "100%", borderRadius: 8 }} />
            <h2>{cat.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
