import React from "react";
import { BackToMenuButton, CheckoutButton } from "./Buttons";

export default function CartView({
  cartItems,
  onRemoveItem,
  onChangeQuantity,
  onBackToMenu,
  onGoToCheckout,
}) {
  const getItemTotal = (item) => {
    let basePrice = item.price;
    let modifiersPrice = 0;

    if (item.modifiers) {
      modifiersPrice = item.modifiers.reduce((acc, mod) => acc + (mod.price || 0), 0);
    }
    if (item.secondModifiers) {
      modifiersPrice += item.secondModifiers.reduce((acc, mod) => acc + (mod.price || 0), 0);
    }

    return (basePrice + modifiersPrice) * item.quantity;
  };

  const subtotal = cartItems.reduce((acc, item) => acc + getItemTotal(item), 0);

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <BackToMenuButton onClick={onBackToMenu} />
        <CheckoutButton onClick={onGoToCheckout} />
      </div>

      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 15,
                borderBottom: "1px solid #ccc",
                paddingBottom: 10,
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: 80, height: 80, objectFit: "cover", marginRight: 15 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "bold" }}>{item.name}</div>

                {item.modifiers && item.modifiers.length > 0 && (
                  <div style={{ fontSize: 14, color: "#555" }}>
                    Modifiers: {item.modifiers.map((m) => m.name).join(", ")}
                  </div>
                )}
                {item.secondModifiers && item.secondModifiers.length > 0 && (
                  <div style={{ fontSize: 14, color: "#555" }}>
                    Add-ons: {item.secondModifiers.map((m) => m.name).join(", ")}
                  </div>
                )}
              </div>

              <div style={{ marginRight: 10 }}>${getItemTotal(item).toFixed(2)}</div>

              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => onChangeQuantity(index, parseInt(e.target.value) || 1)}
                style={{ width: 50, marginRight: 10 }}
              />

              <button
                onClick={() => onRemoveItem(index)}
                style={{
                  backgroundColor: "#d32f2f",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <div
            style={{
              textAlign: "right",
              fontWeight: "bold",
              fontSize: 18,
              marginTop: 20,
            }}
          >
            Subtotal: ${subtotal.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}
