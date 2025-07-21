// ThankYou.jsx
import React from 'react';

const ThankYou = ({ total, onReturnToMenu }) => {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>Thank you for your order!</h1>
      <h2>Total: ${total.toFixed(2)}</h2>
      <img
        src="/Yoby Joby - VECTOR (Sticker).png"
        alt="Yoby Joby Logo"
        style={{ marginTop: '20px', maxWidth: '300px', cursor: 'pointer' }}
        onClick={onReturnToMenu}
      />
    </div>
  );
};

export default ThankYou;
