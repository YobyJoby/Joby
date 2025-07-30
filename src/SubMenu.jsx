// src/SubMenu.jsx
import React, { useState, useRef } from "react";
import Buttons from "./Buttons";

export default function SubMenu({
  category,
  onBackToMenu,
  onGoToCart,
  onGoToCheckout,
  onAddToCart,
  onSelectItemForDetails, // new prop to open Item page
}) {
  const { name, subMenu, modifiers = [], secondModifiers = [] } = category;

  const glowRefs = useRef({});

  const handleAddToCartDirect = (item) => {
    onAddToCart({
      ...item,
      modifiers: [],
      secondModifiers: [],
      quantity: 1,
    });

    const ref = glowRefs.current[item.id];
    if (ref) {
      ref.classList.add("glow");
      setTimeout(() => ref.classList.remove("glow"), 1000);
    }
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
              border: "1px solid #ccc",
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
              onClick={() => onSelectItemForDetails(item)}
              style={{ cursor: "pointer", flexGrow: 1 }}
              title={`View details for ${item.name}`}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", height: "auto", marginBottom: 10 }}
                draggable={false}
              />
              <div>{item.name}</div>
              <div>${item.price.toFixed(2)}</div>
            </div>

            <button
              onClick={() => {
                if ((modifiers.length || secondModifiers.length) && onSelectItemForDetails) {
                  onSelectItemForDetails(item);
                } else {
                  handleAddToCartDirect(item);
                }
              }}
              style={{
                marginTop: "auto",
                backgroundColor: "#673ab7",
                color: "white",
                border: "none",
                borderRadius: 5,
                cursor: "pointer",
                padding: "10px 20px",
                userSelect: "none",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
