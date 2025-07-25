import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const BUTTON_COLOR = "#4605e5";

export default function Checkout({
  cart,
  subtotal,
  tax,
  total,
  placeOrder,
  onBackToMenu,
  onRemoveFromCart,
  onUpdateQuantity,
}) {
  const [isSending, setIsSending] = useState(false);

  const handleEmailOrder = () => {
    if (isSending) return;

    const checkoutDetails = `ORDER SUMMARY:\n\n${cart
      .map(
        (item) =>
          `• ${item.name} x${item.quantity}\n  Size: ${item.modifiers.join(", ")}\n  Extras: ${item.secondModifiers.join(", ")}\n  Total: $${(
            item.price * item.quantity
          ).toFixed(2)}\n`
      )
      .join("\n")}
\nSubtotal: $${subtotal.toFixed(2)}
\nTax (13%): $${tax.toFixed(2)}
\nTotal: $${total.toFixed(2)}`;

    setIsSending(true);

    emailjs
      .send(
        "service_v822ir4",
        "template_prnbbf1",
        { message: checkoutDetails },
        "7q-MiD1gTt9IMkSeb"
      )
      .then(
        () => {
          setIsSending(false);
          placeOrder();
        },
        (error) => {
          setIsSending(false);
          alert("Failed to send email:\n" + error.text);
        }
      );
  };

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
      <h2 style={{ textAlign: "center", color: BUTTON_COLOR, marginBottom: 30 }}>
        Checkout
      </h2>

      {cart.length === 0 ? (
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
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                  padding: 10,
                  border: `1px solid ${BUTTON_COLOR}`,
                  borderRadius: 8,
                  backgroundColor: "#fafafa",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 90,
                    height: 90,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
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
              </div>
            ))}
          </div>

          <div
            style={{
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Subtotal: ${subtotal.toFixed(2)}
          </div>
          <div
            style={{
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Tax (13%): ${tax.toFixed(2)}
          </div>
          <div
            style={{
              fontWeight: "bold",
              fontSize: 24,
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            Total: ${total.toFixed(2)}
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              onClick={handleEmailOrder}
              disabled={isSending}
              style={{
                backgroundColor: isSending ? "#888" : BUTTON_COLOR,
                color: "white",
                border: "none",
                padding: "14px 40px",
                borderRadius: 8,
                fontSize: 20,
                fontWeight: "bold",
                cursor: isSending ? "not-allowed" : "pointer",
                userSelect: "none",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (!isSending) e.currentTarget.style.backgroundColor = "#5a04c2";
              }}
              onMouseLeave={(e) => {
                if (!isSending) e.currentTarget.style.backgroundColor = BUTTON_COLOR;
              }}
            >
              {isSending ? "Sending Order..." : "Place Order"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
