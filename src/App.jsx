// src/App.jsx
import React, { useState, useEffect } from 'react';
import { MainMenu, ViewCartButton, BackToMenuButton, CheckoutButton } from './Buttons';
import menu from './menu';
import Cart from './Cart';
import Checkout from './Checkout';
import ThankYou from './ThankYou';

const TAX_RATE = 0.13;
const BUTTON_COLOR = '#4605e5';

function App() {
  const [view, setView] = useState('main'); // 'main' | 'submenu' | 'cart' | 'checkout' | 'exit' | 'added'
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [selectedModifiers, setSelectedModifiers] = useState([]);
  const [selectedSecondModifiers, setSelectedSecondModifiers] = useState([]);
  const [cart, setCart] = useState([]);
  const [promptMessage, setPromptMessage] = useState('');

  const openSubMenu = (menuItem) => {
    setSelectedMenu(menuItem);
    setSelectedSubItem(null);
    setSelectedModifiers([]);
    setSelectedSecondModifiers([]);
    setPromptMessage('');
    setView('submenu');
  };

  const toggleModifier = (modifier) => {
    if (selectedMenu?.id === 6) {
      // Allow multiple proteins; first free, others +$1 (logic elsewhere)
      const exists = selectedModifiers.find((m) => m.name === modifier.name);
      if (exists) {
        setSelectedModifiers(selectedModifiers.filter((m) => m.name !== modifier.name));
      } else {
        setSelectedModifiers([...selectedModifiers, modifier]);
      }
    } else {
      if (['Medium', 'Large', 'X-Large'].includes(modifier.name)) {
        setSelectedModifiers([modifier]);
      } else {
        const exists = selectedModifiers.find((m) => m.name === modifier.name);
        if (exists) {
          setSelectedModifiers(selectedModifiers.filter((m) => m.name !== modifier.name));
        } else {
          setSelectedModifiers([...selectedModifiers, modifier]);
        }
      }
    }
  };

  const toggleSecondModifier = (modifier) => {
    const exists = selectedSecondModifiers.find((m) => m.name === modifier.name);
    if (exists) {
      setSelectedSecondModifiers(selectedSecondModifiers.filter((m) => m.name !== modifier.name));
    } else {
      setSelectedSecondModifiers([...selectedSecondModifiers, modifier]);
    }
  };

  const addToCartClicked = (subItem) => {
    const itemModifiers = subItem.modifiers ?? selectedMenu.modifiers ?? [];

    if (!itemModifiers || itemModifiers.length === 0) {
      addItemToCart(subItem, [], []);
      setView('added');
    } else {
      setSelectedSubItem(subItem);
      setSelectedModifiers([]);
      setSelectedSecondModifiers([]);
      setPromptMessage('');
      setView('submenu');
    }
  };

  const confirmSelection = () => {
    const currentModifiers = selectedSubItem?.modifiers ?? selectedMenu?.modifiers ?? [];

    if (
      currentModifiers.length > 0 &&
      ![6, 7].includes(selectedMenu.id) &&
      selectedModifiers.length === 0
    ) {
      alert('Please select a size before proceeding.');
      return;
    }
    addItemToCart(selectedSubItem, selectedModifiers, selectedSecondModifiers);
    setPromptMessage('');
    setSelectedSubItem(null);
    setSelectedModifiers([]);
    setSelectedSecondModifiers([]);
    setView('added');
  };

  useEffect(() => {
    if (view === 'added') {
      const timer = setTimeout(() => {
        setView('main');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [view]);

  const addItemToCart = (item, modifiers, secondMods) => {
    let price = item.price;

    // Calculate upcharges: first protein modifier free, others +1
    if (selectedMenu?.id === 6) {
      // Count protein modifiers beyond first
      const extraProteinCount = modifiers.length > 1 ? modifiers.length - 1 : 0;
      price += extraProteinCount * 1;
    } else {
      modifiers.forEach((mod) => {
        price += mod.price || 0;
      });
    }

    secondMods.forEach((mod) => {
      price += mod.price || 0;
    });

    const modifiersNames = modifiers.map((m) => m.name);
    const secondModsNames = secondMods.map((m) => m.name);

    const existingIndex = cart.findIndex(
      (cartItem) =>
        cartItem.name === item.name &&
        JSON.stringify(cartItem.modifiers) === JSON.stringify(modifiersNames) &&
        JSON.stringify(cartItem.secondModifiers) === JSON.stringify(secondModsNames)
    );

    if (existingIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      const cartItem = {
        id: `${item.id}-${Date.now()}`,
        name: item.name,
        basePrice: item.price,
        modifiers: modifiersNames,
        secondModifiers: secondModsNames,
        price,
        image: item.image,
        quantity: 1,
      };
      setCart([...cart, cartItem]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    }
  };

  const placeOrder = () => {
    setView('exit');
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const goBackToMenu = () => setView('main');
  const goToCart = () => setView('cart');
  const goToCheckout = () => setView('checkout');

  const renderTopRightButtons = () => (
    <div
      style={{
        display: 'flex',
        gap: 10,
        justifyContent: 'flex-end',
        marginBottom: 20,
        paddingRight: 20,
        maxWidth: 1260,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {view !== 'main' && view !== 'exit' && view !== 'added' && (
        <BackToMenuButton onClick={goBackToMenu} />
      )}
      {view !== 'cart' && view !== 'exit' && view !== 'added' && (
        <ViewCartButton onClick={goToCart} cartCount={cart.length} />
      )}
      {view !== 'checkout' && view !== 'exit' && view !== 'added' && (
        <CheckoutButton onClick={goToCheckout} />
      )}
    </div>
  );

  return (
    <div className="app-container" style={{ padding: '60px 20px 20px 20px', fontFamily: 'Arial' }}>
      {renderTopRightButtons()}

      {view === 'main' && (
        <>
          <div
            style={{
              width: 540,
              margin: '0 auto 40px auto',
              textAlign: 'center',
              position: 'relative',
              left: '-25px',
            }}
          >
            <img
              src="/Yoby-Joby-MENU-Title.png"
              alt="Yoby Joby Menu Title"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                margin: '0 auto',
              }}
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
              gap: '20px',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            {selectedMenu.subMenu.map((subItem) => (
              <div
                key={subItem.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  width: '150px',
                  padding: '6px',
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
                  <div style={{ fontWeight: 'bold', marginTop: '6px' }}>{subItem.name}</div>
                  {subItem.effect && (
                    <div
                      style={{
                        fontSize: '10px',
                        color: 'gray',
                        marginTop: '4px',
                        fontStyle: 'italic',
                      }}
                    >
                      {subItem.effect}
                    </div>
                  )}
                  {subItem.ingredients && (
                    <div
                      style={{
                        fontSize: '10px',
                        color: 'gray',
                        marginTop: '2px',
                        fontStyle: 'italic',
                      }}
                    >
                      {subItem.ingredients}
                    </div>
                  )}
                  <div style={{ marginTop: '6px', fontWeight: 'bold' }}>
                    ${subItem.price.toFixed(2)}
                  </div>
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
                    borderRadius: '6px',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = 'rgba(126, 87, 194, 0.75)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'rgba(70, 5, 229, 0.75)')
                  }
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {selectedSubItem && (
            <>
              {/* YOUR CUSTOM SENTENCE ABOVE THE PROTEIN MODIFIERS */}
              {(selectedSubItem?.modifiers ?? selectedMenu.modifiers)?.length > 0 && (
                <div
                  style={{
                    maxWidth: 480,
                    margin: '0 auto 12px auto',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: BUTTON_COLOR,
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  }}
                >
                  Please choose your protein. Additional protein is +$1.
                </div>
              )}

              {/* FIRST MODIFIERS WITHOUT UPCHARGES DISPLAYED */}
              {(selectedSubItem?.modifiers ?? selectedMenu.modifiers)?.length > 0 && (
                <div
                  style={{
                    marginBottom: '20px',
                    borderTop: '1px solid #ccc',
                    paddingTop: '10px',
                    maxWidth: 480,
                    margin: '0 auto',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '12px',
                      fontSize: '16px',
                      color: BUTTON_COLOR,
                      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    }}
                  >
                    Select Size:
                  </div>
                  <div
                    style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
                  >
                    {(selectedSubItem?.modifiers ?? selectedMenu.modifiers).map((mod) => {
                      const isChecked = selectedModifiers.some((m) => m.name === mod.name);
                      const isRadio = ['Medium', 'Large', 'X-Large'].includes(mod.name);
                      return (
                        <label
                          key={mod.name}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            border: isChecked ? `2px solid ${BUTTON_COLOR}` : '1px solid #ccc',
                            borderRadius: '6px',
                            padding: '8px 14px',
                            fontWeight: '600',
                            userSelect: 'none',
                            backgroundColor: isChecked ? '#e6e0ff' : 'white',
                            transition: 'all 0.3s ease',
                            boxShadow: isChecked ? `0 0 8px 2px rgba(70,5,229,0.4)` : 'none',
                          }}
                        >
                          <input
                            type={isRadio ? 'radio' : 'checkbox'}
                            name={isRadio ? 'size' : mod.name}
                            checked={isChecked}
                            onChange={() => toggleModifier(mod)}
                            style={{ marginRight: '8px', cursor: 'pointer' }}
                          />
                          {mod.name}
                          {/* No price shown here, intentionally hidden */}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECONDARY MODIFIERS */}
              {selectedModifiers.length > 0 &&
                selectedMenu.secondModifiers &&
                selectedMenu.secondModifiers.length > 0 && (
                  <div
                    style={{
                      marginBottom: '20px',
                      borderTop: '1px solid #ccc',
                      paddingTop: '10px',
                      maxWidth: 480,
                      margin: '0 auto',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 'bold',
                        marginBottom: '12px',
                        fontSize: '16px',
                        color: BUTTON_COLOR,
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                      }}
                    >
                      Add Extras:
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        gap: '12px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                      }}
                    >
                      {selectedMenu.secondModifiers.map((mod) => {
                        const isChecked = selectedSecondModifiers.some((m) => m.name === mod.name);
                        return (
                          <label
                            key={mod.name}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              cursor: 'pointer',
                              border: isChecked ? `2px solid ${BUTTON_COLOR}` : '1px solid #ccc',
                              borderRadius: '6px',
                              padding: '8px 14px',
                              fontWeight: '600',
                              userSelect: 'none',
                              backgroundColor: isChecked ? '#e6e0ff' : 'white',
                              transition: 'all 0.3s ease',
                              boxShadow: isChecked ? `0 0 8px 2px rgba(70,5,229,0.4)` : 'none',
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleSecondModifier(mod)}
                              style={{ marginRight: '8px', cursor: 'pointer' }}
                            />
                            {mod.name} {mod.price > 0 ? `+ $${mod.price.toFixed(2)}` : ''}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

              {selectedModifiers.length > 0 && (
                <div style={{ textAlign: 'center', marginTop: 10 }}>
                  <button
                    onClick={confirmSelection}
                    style={{
                      backgroundColor: BUTTON_COLOR,
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '16px',
                    }}
                  >
                    Confirm Selection
                  </button>
                </div>
              )}
            </>
          )}
        </>
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

      {view === 'added' && (
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
            style={{ maxWidth: 200, marginBottom: 30 }}
            draggable={false}
          />
          <h2 style={{ fontSize: '1.8rem', color: BUTTON_COLOR }}>
            Item has been added to your Cart
          </h2>
        </div>
      )}
    </div>
  );
}

export default App;
