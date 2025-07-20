import React from 'react';
import { SUBMENU_DATA } from './menu';

export default function SubMenu({ item, onAddToCart, onBack }) {
  const submenuItems = SUBMENU_DATA[item.id] || [];

  return (
    <div>
      <h2>{item.name} Options</h2>
      <button onClick={onBack}>Back</button>
      <ul>
        {submenuItems.map(sub => (
          <li key={sub.id}>
            {sub.name} - ${sub.price.toFixed(2)}{' '}
            <button onClick={() => onAddToCart(sub)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}// src/SubMenu.jsx
import React, { useState } from "react";
import Buttons from "./Buttons"; // reusable buttons and main menu components
import ModifierPanel from "./ModifierPanel";

export default function SubMenu({
  category,
  onBackToMenu,
  onGoToCart,
  onGoToCheckout,
  onAddToCart,
}) {
  const { name, subMenu, modifiers = [], secondModifiers = [] } = category;

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedModifiers, setSelectedModifiers] = useState([]);
  const [selectedSecondModifiers, setSelectedSecondModifiers] = useState([]);

  const handleToggleModifier = (mod) => {
    setSelectedModifiers((prev) =>
      prev.some((m) => m.name === mod.name)
        ? prev.filter((m) => m.name !== mod.name)
        : [...prev, mod]
    );
  };

  const handleToggleSecondModifier = (mod) => {
    setSelectedSecondModifiers((prev) =>
      prev.some((m) => m.name === mod.name)
        ? prev.filter((m) => m.name !== mod.name)
        : [...prev, mod]
    );
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;
    onAddToCart({
      ...selectedItem,
      modifiers: selectedModifiers,
      secondModifiers: selectedSecondModifiers,
      quantity: 1,
    });
    setSelectedItem(null);
    setSelectedModifiers([]);
    setSelectedSecondModifiers([]);
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 10px", position: "relative" }}>
      <Buttons
        onBackToMenu={onBackToMenu}
        onGoToCart={onGoToCart}
        onGoToCheckout={onGoToCheckout}
        hideBackToMenu={false}
        hideCart={false}
        hideCheckout={false}
      />

      <h2 style={{ textAlign: "center", marginTop: 60 }}>{name}</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        {subMenu.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            style={{
              cursor: "pointer",
              border: selectedItem?.id === item.id ? "2px solid #4605e5" : "1px solid #ccc",
              borderRadius: 8,
              padding: 10,
              width: 150,
              textAlign: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              userSelect: "none",
            }}
          >
            <img src={item.image} alt={item.name} style={{ width: "100%", height: "auto", marginBottom: 10 }} />
            <div>{item.name}</div>
            <div>${item.price.toFixed(2)}</div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <ModifierPanel
          modifiers={modifiers}
          secondModifiers={secondModifiers}
          selectedModifiers={selectedModifiers}
          selectedSecondModifiers={selectedSecondModifiers}
          onToggleModifier={handleToggleModifier}
          onToggleSecondModifier={handleToggleSecondModifier}
          onConfirm={handleAddToCart}
          onCancel={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Snack Bar Menu</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.jsx"></script>
  </body>
</html>
