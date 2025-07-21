import React, { useState, useRef } from "react";
import Buttons from "./Buttons";
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
  const glowRefs = useRef({});

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

    // If no modifiers, apply glow effect
    if (modifiers.length === 0 && secondModifiers.length === 0) {
      const ref = glowRefs.current[selectedItem.id];
      if (ref) {
        ref.classList.add("glow");
        setTimeout(() => ref.classList.remove("glow"), 1000);
      }
    }

    setSelectedItem(null);
    setSelectedModifiers([]);
    setSelectedSecondModifiers([]);
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "20px 10px",
        position: "relative",
      }}
    >
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
            ref={(el) => (glowRefs.current[item.id] = el)}
            style={{
              border:
                selectedItem?.id === item.id ? "2px solid #4605e5" : "1px solid #ccc",
              borderRadius: 8,
              padding: 10,
              width: 150,
              minHeight: 280,
              textAlign: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              userSelect: "none",
              display: "flex",
              flexDirection: "column",
              cursor: "default",
            }}
          >
            <div
              onClick={() => setSelectedItem(item)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", height: "auto", marginBottom: 10 }}
              />
              <div>{item.name}</div>
              <div>${item.price.toFixed(2)}</div>
            </div>

            <button
              onClick={() => {
                if (modifiers.length || secondModifiers.length) {
                  setSelectedItem(item);
                } else {
                  setSelectedItem(item);
                  handleAddToCart();
                }
              }}
              style={{
                marginTop: "auto",
                backgroundColor: '#673ab7',
                color: 'white',
                border: 'none',
                borderRadius: 5,
                cursor: 'pointer',
                padding: '10px 20px',
                userSelect: 'none',
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {selectedItem && (modifiers.length > 0 || secondModifiers.length > 0) && (
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
