import React from 'react';

export function ViewCartButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: '#4605e5',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
      }}
    >
      View Cart
    </button>
  );
}

export function BackToMenuButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: '#777',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
      }}
    >
      Back to Menu
    </button>
  );
}

export function CheckoutButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: '#4605e5',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
      }}
    >
      Checkout
    </button>
  );
}

export function AddToCartButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: '#4605e5',
        color: 'white',
        padding: '6px 12px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px',
      }}
    >
      Add to Cart
    </button>
  );
}

export function MainMenu({ menu, onSelectItem }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
      }}
    >
      {menu.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelectItem(item)}
          style={{
            cursor: 'pointer',
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '10px',
            width: '140px',
            textAlign: 'center',
            userSelect: 'none',
            boxShadow: '0 0 8px rgba(70,5,229,0.4)',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            draggable={false}
          />
          <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '16px' }}>
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
}