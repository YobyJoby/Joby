import React, { useState } from "react";
import { Buttons, AddToCartButton, BackToMenuButton, ViewCartButton, CheckoutButton } from "./Buttons";
import ModifierPanel from "./ModifierPanel";

export default function SubMenuView({
  category,
  onBackToMenu,
  onAddToCart,
  onGoToCart,
  onGoToCheckout,
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModifiers, setShowModifiers] = useState(false);
  const [selectedModifiers, setSelectedModifiers] = useState([]);
  const [selectedSecondModifiers, setSelectedSecondModifiers] = useState([]);

  if (!category) return null;

  const openModifiers = (item) => {
    setSelectedItem(item);
    setSelectedModifiers([]);
    setSelectedSecondModifiers([]);
    setShowModifiers(true);
  };

  const handleConfirmAddToCart = () => {
    if (!selectedItem) return;
    onAddToCart({
      ...selectedItem,
      quantity: 1,
      modifiers: selectedModifiers,
      secondModifiers: selectedSecondModifiers,
    });
    setShowModifiers(false);
    setSelectedItem(null);
    setSelectedModifiers([]);
    setSelectedSecondModifiers([]);
  };

  const handleCancelModifiers = () => {
    setShowModifiers(false);
    setSelectedItem(null);
    setSelectedModifiers([]);
    setSelectedSecondModifiers([]);
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 15, marginBottom: 20 }}>
        <BackToMenuButton onClick={onBackToMenu} />
        <ViewCartButton onClick={onGoToCart} />
        <CheckoutButton onClick={onGoToCheckout} />
      </div>

      <h2 style={{ textAlign: "center", marginBottom: 20 }}>{category.name}</h2>

      {!showModifiers ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
          {category.subMenu.map((item) => (
            <div
              key={item.id}
              style={{
                cursor: "pointer",
                border: "1px solid #ccc",
                borderRadius: 8,
                width: 180,
                padding: 10,
                textAlign: "center",
                userSelect: "none",
                boxShadow: "0 0 8px rgba(70,5,229,0.4)",
              }}
              onClick={() => openModifiers(item)}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", height: 125, objectFit: "contain", borderRadius: 8 }}
                draggable={false}
              />
              <h3 style={{ marginTop: 10 }}>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <ModifierPanel
          item={selectedItem}
          selectedModifiers={selectedModifiers}
          selectedSecondModifiers={selectedSecondModifiers}
          setSelectedModifiers={setSelectedModifiers}
          setSelectedSecondModifiers={setSelectedSecondModifiers}
          onConfirm={handleConfirmAddToCart}
          onCancel={handleCancelModifiers}
        />
      )}
    </div>
  );
}
