import React from 'react';
import MainMenu from './MainMenu';

export default function MainMenuView({ menu, onSelectItem }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src="Yoby-Joby-MENU-Title.png"
        alt="Yoby Joby Menu Title"
        style={{ width: '80%', maxWidth: '500px', marginBottom: '20px' }}
        draggable={false}
      />
      <MainMenu menu={menu} onSelectItem={onSelectItem} />
    </div>
  );
}
