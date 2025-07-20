import React from 'react';

export default function Checkout({
  cart,
  subtotal,
  tax,
  total,
  placeOrder,
  BUTTON_COLOR,
}) {
  return (
    <div>
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. Please add items before checkout.</p>
      ) : (
        <div>
          <p>Please review your order and place it.</p>

          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '80px', height: '80px', objectFit: 'contain' }}
              />
              <div style={{ marginLeft: '15px', flex: 1 }}>
                <h4>{item.name}</h4>
                {(item.modifiers.length > 0 || item.secondModifiers.length > 0) && (
                  <p>
                    {item.modifiers.length > 0 && <>Modifiers: {item.modifiers.join(', ')}<br /></>}
                    {item.secondModifiers.length > 0 && <>Extras: {item.secondModifiers.join(', ')}</>}
                  </p>
                )}
                <p>Price: ${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax (13%): ${tax.toFixed(2)}</p>
            <p>Total: ${total.toFixed(2)}</p>
          </div>

          <button
            onClick={placeOrder}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              backgroundColor: BUTTON_COLOR,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '18px',
              boxShadow: `0 2px 8px ${BUTTON_COLOR}aa`,
            }}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}