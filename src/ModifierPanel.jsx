// src/Item.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ModifierPanel from "./ModifierPanel";
import { CartContext } from "./CartContext";

const BUTTON_COLOR = "#4605e5";

export default function Item({ menu }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const selectedMenu = menu.find((m) =>
    m.items.some((i) => i.name === id)
  );

  const item = selectedMenu?.items.find((i) => i.name === id);

  const [selectedModifiers, setSelectedModifiers] = useState([]);
  const [selectedSecondModifiers, setSelectedSecondModifiers] = useState([]);
  const [showSecondModifiers, setShowSecondModifiers] = useState(false);

  useEffect(() => {
    setSelectedModifiers([]);
    setSelectedSecondModifiers([]);
    setShowSecondModifiers(false);
  }, [item]);

  const toggleModifier = (mod) => {
    const alreadySelected = selectedModifiers.some((m) => m.name === mod.name);
    let updated;

    if (alreadySelected) {
      updated = selectedModifiers.filter((m) => m.name !== mod.name);
    } else {
      updated = [mod]; // Only allow one modifier at a time
    }

    setSelectedModifiers(updated);

    const isBubbleTeaOrCoffee = selectedMenu?.id === 8 || selectedMenu?.id === 9;
    const hasSecondModifiers =
      isBubbleTeaOrCoffee || (item?.secondModifiers?.length > 0);

    setShowSecondModifiers(hasSecondModifiers);
  };

  const toggleSecondModifier = (mod) => {
    const alreadySelected = selectedSecondModifiers.some((m) => m.name === mod.name);
    let updated;

    if (alreadySelected) {
      updated = selectedSecondModifiers.filter((m) => m.name !== mod.name);
    } else {
      updated = [mod]; // Only allow one second modifier at a time
    }

    setSelectedSecondModifiers(updated);
  };

  const handleAddToCart = () => {
    const finalItem = {
      ...item,
      modifiers: selectedModifiers,
      secondModifiers: selectedSecondModifiers,
      quantity: 1,
    };
    addToCart(finalItem);
    navigate("/menu");
  };

  if (!item) return <div>Item not found</div>;

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h1 style={{ fontSize: "2rem", marginBottom: 20 }}>{item.name}</h1>
      <img
        src={item.image}
        alt={item.name}
        style={{
          width: "50%",
          maxWidth: 400,
          borderRadius: 20,
          marginBottom: 20,
        }}
      />
      <ModifierPanel
        item={item}
        selectedModifiers={selectedModifiers}
        selectedSecondModifiers={selectedSecondModifiers}
        toggleModifier={toggleModifier}
        toggleSecondModifier={toggleSecondModifier}
        selectedMenu={selectedMenu}
        showSecondModifiers={showSecondModifiers}
      />
      <button
        onClick={handleAddToCart}
        style={{
          marginTop: 40,
          padding: "12px 24px",
          backgroundColor: BUTTON_COLOR,
          color: "white",
          fontWeight: "bold",
          fontSize: "1.2rem",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
