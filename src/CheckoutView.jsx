import React, { useState } from "react";
import { BackToMenuButton, ViewCartButton, CheckoutButton } from "./Buttons";
import ThankYou from "./ThankYou";
import emailjs from "@emailjs/browser";

export default function CheckoutView({
  cartItems,
  onBackToMenu,
  onGoToCart,
  clearCart,
}) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const subtotal = cartItems.reduce((acc, item) => {
    let basePrice = item.price;
    let modifiersPrice = 0;

    if (item.modifiers) {
      modifiersPrice = item.modifiers.reduce((sum, mod) => sum + (mod.price || 0), 0);
    }
    if (item.secondModifiers) {
      modifiersPrice += item.secondModifiers.reduce((sum, mod) => sum + (mod.price || 0), 0);
    }
    return acc + (basePrice + modifiersPrice) * item.quantity;
  }, 0);

  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  const sendEmail = () => {
    if (!email) {
      setError("Please enter an email address.");
      return;
    }

    setSending(true);
    setError(null);

    const orderDetails = cartItems.map((item, i) => {
      const mods = item.modifiers?.map((m) => m.name).join(", ") || "None";
      const addOns = item.secondModifiers?.map((m) => m.name).join(", ") || "None";

      return `
        Item ${i + 1}: ${item.name}
        Quantity: ${item.quantity}
        Modifiers: ${mods}
        Add-ons: ${addOns}
        Price: $${((item.price + (item.modifiers?.reduce((sum, m) => sum + (m.price || 0), 0) || 0) + (item.secondModifiers?.reduce((sum, m) => sum + (m.price || 0), 0) || 0)) * item.quantity).toFixed(2)}
      `;
    }).join("\n\n");

    const templateParams = {
      to_email: email,
      message: `Thank you for your order! Here are the details:\n\n${orderDetails}\n\nSubtotal: $${subtotal.toFixed(2)}\nTax (13%): $${tax.toFixed(2)}\nTotal: $${total.toFixed(2)}`,
    };

    emailjs
      .send(
        "service_vlrdvn5",
        "template_5v1qnc3",
        templateParams,
        "o2epW4k4t7fxZrMyN"
      )
      .then(() => {
        setSent(true);
        clearCart();
      })
      .catch(() => {
        setError("Failed to send email. Please try again.");
      })
      .finally(() => {
        setSending(false);
      });
  };

  if (sent) {
    return <ThankYou total={total} onReturnToMenu={onBackToMenu} />;
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
      <BackToMenuButton onClick={onBackToMenu} />
      {/* You might want to add other buttons here if needed */}

      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Checkout</h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your cart is empty.</p>
      ) : (
        <>
          <div>
            {cartItems.map((item, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 10,
                  borderBottom: "1px solid #ccc",
                  paddingBottom: 10,
                }}
              >
                <div style={{ fontWeight: "bold" }}>{item.name}</div>
                <div>
                  Quantity: {item.quantity} &nbsp; | &nbsp;
                  Price: $
                  {(
                    (item.price +
                      (item.modifiers?.reduce((sum, m) => sum + (m.price || 0), 0) || 0) +
                      (item.secondModifiers?.reduce((sum, m) => sum + (m.price || 0), 0) || 0)) *
                    item.quantity
                  ).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 20,
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "right",
            }}
          >
            Subtotal: ${subtotal.toFixed(2)}
            <br />
            Tax (13%): ${tax.toFixed(2)}
            <br />
            Total: ${total.toFixed(2)}
          </div>

          <div style={{ marginTop: 30 }}>
            <label htmlFor="email" style={{ fontWeight: "bold" }}>
              Email Address:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                marginTop: 8,
                marginBottom: 12,
                fontSize: 16,
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                color: "red",
                marginBottom: 12,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <button
            onClick={sendEmail}
            disabled={sending}
            style={{
              width: "100%",
              backgroundColor: "#4605e5",
              color: "white",
              fontWeight: "bold",
              padding: 15,
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontSize: 18,
            }}
          >
            {sending ? "Sending..." : "Place Order"}
          </button>
        </>
      )}
    </div>
  );
}
