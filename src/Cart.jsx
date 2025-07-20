import React from 'react';
import { BackToMenuButton, CheckoutButton } from './Buttons';

export default function Cart({
  cartItems,
  onBackToMenu,
  onGoToCheckout,
  onRemoveFromCart,
}) {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '20px 10px', position: 'relative' }}>
      {/* Top Buttons */}
      <BackToMenuButton view="cart" onClick={onBackToMenu} />
      <CheckoutButton view="cart" onClick={onGoToCheckout} />
      {/* No ViewCartButton here, because we're already on cart */}

      <h2 style={{ textAlign: 'center', marginTop: 60, marginBottom: 20 }}>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ccc',
                borderRadius: 8,
                padding: 10,
                marginBottom: 12,
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6 }}
                draggable={false}
              />
              <div style={{ marginLeft: 12, flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</div>
                {(item.modifiers.length > 0 || item.secondModifiers.length > 0) && (
                  <div style={{ fontSize: 12, color: 'gray', marginTop: 4 }}>
                    {item.modifiers.length > 0 && <>Modifiers: {item.modifiers.join(', ')}<br /></>}
                    {item.secondModifiers.length > 0 && <>Extras: {item.secondModifiers.join(', ')}</>}
                  </div>
                )}
                <div style={{ marginTop: 6, fontWeight: 'bold' }}>
                  ${ (item.price * item.quantity).toFixed(2) }
                </div>
              </div>
              <button
                onClick={() => onRemoveFromCart(item.id)}
                style={{
                  backgroundColor: '#e53935',
                  color: 'white',
                  border: 'none',
                  borderRadius: 5,
                  padding: '6px 10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
                aria-label={`Remove ${item.name} from cart`}
              >
                Remove
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
