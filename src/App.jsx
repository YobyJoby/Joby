// src/App.jsx
import React, { useState, useEffect } from 'react';
import { MainMenu, ViewCartButton, BackToMenuButton, CheckoutButton } from './Buttons';
import menu from './menu';
import Cart from './Cart';
import Checkout from './Checkout';
import ThankYou from './ThankYou';
import Item from './Item';

const TAX_RATE = 0.13;
const BUTTON_COLOR = '#4605e5';

const containerStyle = {
  padding: '60px 20px 20px 20px',
  fontFamily: 'Arial',
};

const topRightButtonsWrapper = {
  display: 'flex',
  gap: 10,
  justifyContent: 'flex-end',
  marginBottom: 20,
  paddingRight: 20,
  maxWidth: 1260,
  marginLeft: 'auto',
  marginRight: 'auto',
};

function App() {
  const [view, setView] = useState('main');
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [selectedModifiers, setSelectedModifiers] = useState([]);
  const [selectedSecondModifiers, setSelectedSecondModifiers] = useState([]);
  const [cart, setCart] = useState([]);
  const [promptMessage, setPromptMessage] = useState('');
  const [showSecondModifiers, setShowSecondModifiers] = useState(false);

  const toggleInArray = (array, item, isSingleChoice = false) => {
    const exists = array.find(m => m.name === item.name);
    if (isSingleChoice) return exists ? [] : [item];
    return exists ? array.filter(m => m.name !== item.name) : [...array, item];
  };

  const openSubMenu = (menuItem) => {
    setSelectedMenu(menuItem);
    setSelectedSubItem(null);
    setSelectedModifiers([]);
    setSelectedSecondModifiers([]);
    setPromptMessage('');
    setShowSecondModifiers(false);
    setView('submenu');
  };

  const addItemToCart = (item, modifiers, secondMods) => {
    let price = item.price;
    if (selectedMenu?.id === 6) {
      price += modifiers.length > 1 ? (modifiers.length - 1) * 1 : 0;
    } else {
      price += modifiers.reduce((acc, m) => acc + (m.price || 0), 0);
    }
    price += secondMods.reduce((acc, m) => acc + (m.price || 0), 0);

    const modsNames = modifiers.map(m => m.name);
    const secondModsNames = secondMods.map(m => m.name);

    const existingIndex = cart.findIndex(
      c =>
        c.name === item.name &&
        JSON.stringify(c.modifiers) === JSON.stringify(modsNames) &&
        JSON.stringify(c.secondModifiers) === JSON.stringify(secondModsNames)
    );

    if (existingIndex !== -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([
        ...cart,
        {
          id: `${item.id}-${Date.now()}`,
          name: item.name,
          basePrice: item.price,
          modifiers: modsNames,
          secondModifiers: secondModsNames,
          price,
          image: item.image,
          quantity: 1,
        },
      ]);
    }
  };

  const toggleModifier = (modifier) => {
    const isSizeModifier = ['Medium', 'Large', 'X-Large'].includes(modifier.name);

    if (selectedMenu?.id === 6) {
      // For Bubble Coffee (id 6), toggle modifier normally without auto-adding
      const newSelectedModifiers = toggleInArray(selectedModifiers, modifier, isSizeModifier);
      setSelectedModifiers(newSelectedModifiers);

      if (selectedSubItem) {
        // If second modifiers exist, show them
        const hasSecondModifiers =
          (selectedSubItem.secondModifiers?.length ?? selectedMenu?.secondModifiers?.length ?? 0) > 0;

        if (hasSecondModifiers) {
          setShowSecondModifiers(true);
        }
      }
    } else if (isSizeModifier) {
      // For other menus, single select size modifier
      const newSelectedModifiers = toggleInArray(selectedModifiers, modifier, true);
      setSelectedModifiers(newSelectedModifiers);

      if (selectedSubItem) {
        const hasSecondModifiers =
          (selectedSubItem.secondModifiers?.length ?? selectedMenu?.secondModifiers?.length ?? 0) > 0;

        if (hasSecondModifiers) {
          setShowSecondModifiers(true);
        } else {
          addItemToCart(selectedSubItem, newSelectedModifiers, selectedSecondModifiers);
          resetSelectionAndView();
        }
      }
    } else {
      // Other modifiers toggle normally
      setSelectedModifiers(toggleInArray(selectedModifiers, modifier));
    }
  };

  const toggleSecondModifier = (modifier) => {
    const newSecondMods = toggleInArray(selectedSecondModifiers, modifier);
    setSelectedSecondModifiers(newSecondMods);

    if (selectedSubItem) {
      addItemToCart(selectedSubItem, selectedModifiers, newSecondMods);
      resetSelectionAndView();
    }
  };

  const resetSelectionAndView = () => {
    setSelectedSubItem(null);
    setSelectedModifiers([]);
    setSelectedSecondModifiers([]);
    setShowSecondModifiers(false);
    setView('added');
  };

  const addToCartClicked = (subItem) => {
    const mergedItem = {
      ...subItem,
      modifiers: subItem.modifiers ?? selectedMenu?.modifiers ?? [],
      secondModifiers: subItem.secondModifiers ?? selectedMenu?.secondModifiers ?? [],
    };
    if ((mergedItem.modifiers.length === 0 && (mergedItem.secondModifiers?.length ?? 0) === 0)) {
      addItemToCart(mergedItem, [], []);
      setView('added');
    } else {
      setSelectedSubItem(mergedItem);
      setSelectedModifiers([]);
      setSelectedSecondModifiers([]);
      setPromptMessage('');
      setShowSecondModifiers(false);
      setView('item');
    }
  };

  const confirmSelection = () => {
    const currentMods = selectedSubItem?.modifiers ?? selectedMenu?.modifiers ?? [];
    if (currentMods.length && ![6, 7].includes(selectedMenu?.id) && selectedModifiers.length === 0) {
      alert('Please select a size before proceeding.');
      return;
    }
    addItemToCart(selectedSubItem, selectedModifiers, selectedSecondModifiers);
    resetSelectionAndView();
  };

  useEffect(() => {
    if (view === 'added') {
      const timer = setTimeout(() => setView('main'), 2000);
      return () => clearTimeout(timer);
    }
  }, [view]);

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));

  const updateQuantity = (id, qty) => {
    if (qty <= 0) removeFromCart(id);
    else setCart(cart.map(i => (i.id === id ? { ...i, quantity: qty } : i)));
  };

  const placeOrder = () => setView('exit');

  const subtotal = cart.reduce((a, i) => a + i.price * i.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const goBackToMenu = () => setView('main');
  const goToCart = () => setView('cart');
  const goToCheckout = () => setView('checkout');

  const renderTopRightButtons = () => (
    <div style={topRightButtonsWrapper}>
      {!['main', 'exit', 'added'].includes(view) && <BackToMenuButton onClick={goBackToMenu} />}
      {!['cart', 'exit', 'added'].includes(view) && (
        <ViewCartButton onClick={goToCart} cartCount={cart.length} />
      )}
      {!['checkout', 'exit', 'added'].includes(view) && <CheckoutButton onClick={goToCheckout} />}
    </div>
  );

  return (
    <div className="app-container" style={containerStyle}>
      {renderTopRightButtons()}

      {view === 'main' && (
        <>
          <div
            style={{
              width: 540,
              margin: '0 auto 40px auto',
              textAlign: 'center',
              position: 'relative',
              left: -25,
            }}
          >
            <img
              src="/Yoby-Joby-MENU-Title.png"
              alt="Yoby Joby Menu Title"
              style={{ width: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
              draggable={false}
            />
          </div>
          <MainMenu menu={menu} onSelectItem={openSubMenu} />
        </>
      )}

      {view === 'submenu' && selectedMenu && (
        <>
          <h2 style={{ textAlign: 'center', color: BUTTON_COLOR, marginBottom: 20 }}>
            {selectedMenu.name}
          </h2>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 20,
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            {selectedMenu.subMenu.map(subItem => (
              <div
                key={subItem.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: 8,
                  width: 150,
                  padding: 6,
                  textAlign: 'center',
                  boxSizing: 'border-box',
                  position: 'relative',
                  userSelect: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div onClick={() => addToCartClicked(subItem)} style={{ cursor: 'pointer' }}>
                  <img
                    src={subItem.image}
                    alt={subItem.name}
                    style={{ maxWidth: '100%', height: 'auto' }}
                    draggable={false}
                  />
                  <div style={{ fontWeight: 'bold', marginTop: 6 }}>{subItem.name}</div>
                  {subItem.effect && (
                    <div
                      style={{
                        fontSize: 10,
                        color: 'gray',
                        marginTop: 4,
                        fontStyle: 'italic',
                      }}
                    >
                      {subItem.effect}
                    </div>
                  )}
                  {subItem.ingredients && (
                    <div
                      style={{
                        fontSize: 10,
                        color: 'gray',
                        marginTop: 2,
                        fontStyle: 'italic',
                      }}
                    >
                      {subItem.ingredients}
                    </div>
                  )}
                  <div style={{ marginTop: 6, fontWeight: 'bold' }}>${subItem.price.toFixed(2)}</div>
                </div>
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCartClicked(subItem)}
                  style={{
                    marginTop: 'auto',
                    padding: '7.5px 0',
                    fontSize: '0.825em',
                    width: '75%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    backgroundColor: 'rgba(70, 5, 229, 0.75)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={e =>
                    (e.currentTarget.style.backgroundColor = 'rgba(126, 87, 194, 0.75)')
                  }
                  onMouseLeave={e =>
                    (e.currentTarget.style.backgroundColor = 'rgba(70, 5, 229, 0.75)')
                  }
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {view === 'item' && selectedSubItem && (
        <Item
          item={selectedSubItem}
          selectedMenu={selectedMenu}
          onBack={() => setView('submenu')}
          onConfirm={confirmSelection}
          selectedModifiers={selectedModifiers}
          selectedSecondModifiers={selectedSecondModifiers}
          toggleModifier={toggleModifier}
          toggleSecondModifier={toggleSecondModifier}
          showSecondModifiers={showSecondModifiers}
        />
      )}

      {view === 'cart' && (
        <Cart
          cartItems={cart}
          onBackToMenu={goBackToMenu}
          onGoToCheckout={goToCheckout}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />
      )}

      {view === 'checkout' && (
        <Checkout
          cart={cart}
          subtotal={subtotal}
          tax={tax}
          total={total}
          placeOrder={placeOrder}
          BUTTON_COLOR={BUTTON_COLOR}
          onBackToMenu={goBackToMenu}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />
      )}

      {view === 'exit' && (
        <ThankYou
          total={total}
          onReturnToMenu={() => {
            setCart([]);
            setView('main');
          }}
        />
      )}

      {view === 'added' && <AddedMessage buttonColor={BUTTON_COLOR} />}
    </div>
  );
}

const AddedMessage = ({ buttonColor }) => (
  <div
    style={{
      textAlign: 'center',
      marginTop: 100,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}
  >
    <img
      src="/Yoby Joby - VECTOR (Sticker).png"
      alt="Yoby Joby Sticker"
      style={{ maxWidth: 400, marginBottom: 30 }}
      draggable={false}
    />
    <h2 style={{ fontSize: '1.8rem', color: buttonColor }}>Item has been added to your Cart</h2>
  </div>
);

export default App;
