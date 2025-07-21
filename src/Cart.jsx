import React from "react";

const BUTTON_COLOR = "#4605e5";

export default function Cart({
  cartItems,
  onBackToMenu,
  onGoToCheckout,
  onRemoveFromCart,
  onUpdateQuantity,
}) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1260,
        margin: "40px auto",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ textAlign: "center", color: BUTTON_COLOR, marginBottom: 30 }}>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: 20 }}>Your cart is empty.</p>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              marginBottom: 30,
              width: "100%",
            }}
          >
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  border: `1px solid ${BUTTON_COLOR}`,
                  borderRadius: 8,
                  padding: 10,
                  alignItems: "center",
                  gap: 15,
                  backgroundColor: "#fafafa",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 6 }}
                  draggable={false}
                />

                <div style={{ flexGrow: 1 }}>
                  <div
                    style={{ fontWeight: "bold", fontSize: 18, marginBottom: 6 }}
                    title={item.name}
                  >
                    {item.name}
                  </div>

                  {item.modifiers.length > 0 && (
                    <div style={{ fontSize: 15, color: "#555" }}>
                      Size: {item.modifiers.join(", ")}
                    </div>
                  )}

                  {item.secondModifiers.length > 0 && (
                    <div style={{ fontSize: 15, color: "#555" }}>
                      Extras: {item.secondModifiers.join(", ")}
                    </div>
                  )}

                  <div
                    style={{
                      fontSize: 16,
                      color: "#333",
                      marginTop: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    Quantity:
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      style={{
                        padding: "6px 12px",
                        fontSize: 18,
                        fontWeight: "bold",
                        cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
                        opacity: item.quantity <= 1 ? 0.5 : 1,
                        borderRadius: 6,
                        border: `1px solid ${BUTTON_COLOR}`,
                        background: "white",
                        color: BUTTON_COLOR,
                      }}
                    >
                      −
                    </button>
                    <span style={{ fontSize: 18 }}>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      style={{
                        padding: "6px 12px",
                        fontSize: 18,
                        fontWeight: "bold",
                        cursor: "pointer",
                        borderRadius: 6,
                        border: `1px solid ${BUTTON_COLOR}`,
                        background: "white",
                        color: BUTTON_COLOR,
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    minWidth: 70,
                    textAlign: "right",
                  }}
                >
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  style={{
                    marginLeft: 15,
                    backgroundColor: "#e53935",
                    color: "white",
                    border: "none",
                    borderRadius: 5,
                    padding: "6px 10px",
                    cursor: "pointer",
                    userSelect: "none",
                    fontWeight: "bold",
                  }}
                  title="Remove Item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div
            style={{
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "right",
              marginBottom: 30,
              borderTop: "1px solid #ccc",
              paddingTop: 10,
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            Subtotal: ${subtotal.toFixed(2)}
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              onClick={onGoToCheckout}
              style={{
                backgroundColor: BUTTON_COLOR,
                color: "white",
                border: "none",
                padding: "14px 40px",
                borderRadius: 8,
                fontSize: 20,
                fontWeight: "bold",
                cursor: "pointer",
                userSelect: "none",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5a04c2")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BUTTON_COLOR)}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
