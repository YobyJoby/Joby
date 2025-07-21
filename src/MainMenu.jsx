import React, { useState, useRef } from 'react';
import menu from './menu';

const fullCode = `// full MainMenu.jsx code including copy button`;

function ModifiersPanel({
  modifiers,
  secondModifiers,
  selectedModifiers,
  selectedSecondModifiers,
  onToggleModifier,
  onToggleSecondModifier,
  confirm,
  cancel,
  promptMessage,
  isWraps,
}) {
  return (
    <div
      style={{
        marginTop: 20,
        padding: 15,
        border: '1px solid #666',
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
      }}
    >
      <h3>{promptMessage}</h3>

      {modifiers.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <p>{isWraps ? 'Select your modifiers:' : 'Select Size:'}</p>
          {modifiers.map((mod) => (
            <label key={mod.name} style={{ marginRight: 10 }}>
              <input
                type={isWraps ? 'checkbox' : 'radio'}
                name="modifier"
                checked={selectedModifiers.some((m) => m.name === mod.name)}
                onChange={() => onToggleModifier(mod)}
              />
              {mod.name}
              {!['Medium', 'Large', 'X-Large'].includes(mod.name) && mod.price > 0
                ? ` (+$${mod.price.toFixed(2)})`
                : ''}
            </label>
          ))}
        </div>
      )}

      {secondModifiers && secondModifiers.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <p>Add-ons:</p>
          {secondModifiers.map((mod) => (
            <label key={mod.name} style={{ marginRight: 10 }}>
              <input
                type="checkbox"
                checked={selectedSecondModifiers.some((m) => m.name === mod.name)}
                onChange={() => onToggleSecondModifier(mod)}
              />
              {mod.name}
              {mod.price > 0 ? ` (+$${mod.price.toFixed(2)})` : ''}
            </label>
          ))}
        </div>
      )}

      <button onClick={confirm} style={{ marginRight: 10 }}>
        Confirm
      </button>
      <button onClick={cancel}>Cancel</button>
    </div>
  );
}

export default function MainMenu() {
  const [view, setView] = useState('main'); // main | submenu | checkout | exit
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [selectedModifiers, setSelectedModifiers] = useState([]);
  const [selectedSecondModifiers, setSelectedSecondModifiers] = useState([]);
  const [cart, setCart] = useState([]);
  const [promptMessage, setPromptMessage] = useState('');
  const glowRefs = useRef({});

  const TAX_RATE = 0.13;

  // Helper to add glow class and remove after 1 second
  const triggerGlow = (id) => {
    return new Promise((resolve) => {
      const ref = glowRefs.current[id];
      if (ref) {
        ref.classList.add('glow');
        setTimeout(() => {
          ref.classList.remove('glow');
          resolve();
        }, 1000);
      } else {
        resolve();
      }
    });
  };

  // When a menu item clicked:
  // 1) Trigger glow for 1s
  // 2) THEN open submenu
  const openSubMenu = async (menuItem) => {
    await triggerGlow(menuItem.id);
    setSelectedMenu(menuItem);
    setSelectedSubItem(null);
    setSelectedModifiers([]);
    setSelectedSecondModifiers([]);
    setPromptMessage('');
    setView('submenu');
  };

  const toggleModifier = (modifier) => {
    if (selectedMenu?.id === 6) {
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

  // When Add to Cart button clicked in submenu view:
  // Just add item or show prompt accordingly
  const addToCartClicked = (subItem) => {
    setSelectedSubItem(subItem);
    setSelectedModifiers([]);
    setSelectedSecondModifiers([]);
    if (selectedMenu?.id === 6) {
      setPromptMessage('Would you like to supe it up?');
    } else if (
      selectedMenu?.modifiers.length > 0 &&
      ![6, 7].includes(selectedMenu.id)
    ) {
      setPromptMessage('What size are you thinking?');
    } else {
      addItemToCart(subItem, [], []);
    }
  };

  const confirmSelection = () => {
    if (
      selectedMenu?.modifiers.length > 0 &&
      ![6, 7].includes(selectedMenu.id) &&
      ['Medium', 'Large', 'X-Large'].some(
        (mod) => selectedModifiers.find((m) => m.name === mod) !== undefined
      ) === false
    ) {
      alert('Please select a size before proceeding.');
      return;
    }
    addItemToCart(selectedSubItem, selectedModifiers, selectedSecondModifiers);
    setPromptMessage('');
    setSelectedSubItem(null);
    setSelectedModifiers([]);
    setSelectedSecondModifiers([]);
  };

  // Add item with modifiers to cart
  const addItemToCart = (item, modifiers, secondMods) => {
    let price = item.price;
    modifiers.forEach((mod) => {
      price += mod.price;
    });
    secondMods.forEach((mod) => {
      price += mod.price;
    });

    const cartItem = {
      id: `${item.id}-${Date.now()}`,
      name: item.name,
      basePrice: item.price,
      modifiers: modifiers.map((m) => m.name),
      secondModifiers: secondMods.map((m) => m.name),
      price,
      image: item.image,
    };

    setCart([...cart, cartItem]);
    setView('main');
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // When View Cart clicked, glow the button for 1 second before showing cart
  const handleViewCartClick = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    setView('checkout');
  };

  const placeOrder = () => {
    setView('exit');
    setTimeout(() => {
      setCart([]);
      setView('main');
    }, 5000);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <div className="app-container" style={{ padding: 20, fontFamily: 'Arial', position: 'relative' }}>
      {/* Copy button fixed top right */}
      <button
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          padding: "6px 12px",
          backgroundColor: "#4605e5",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
          zIndex: 9999,
          userSelect: "none",
        }}
        onClick={() => {
          navigator.clipboard.writeText(fullCode).then(() => {
            alert("Code copied to clipboard!");
          });
        }}
        aria-label="Copy full MainMenu.jsx code"
      >
        Copy
      </button>

      {view !== 'checkout' && view !== 'exit' && (
        <button
          onClick={handleViewCartClick}
          style={{
            position: 'fixed',
            top: 60,
            right: 20,
            padding: '10px 20px',
            backgroundColor: '#673ab7',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
          View Cart ({cart.length})
        </button>
      )}

      {view === 'main' && (
        <>
          <div style={{ textAlign: 'center', marginBottom: 20, userSelect: 'none' }}>
            <img
              src="/Yoby-Joby-MENU-Title.png"
              alt=" "
              style={{ maxWidth: '100%', height: 'auto', display: 'inline-block' }}
              draggable={false}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 20,
              justifyContent: 'center',
            }}
          >
            {menu.map((menuItem) => (
              <div
                key={menuItem.id}
                ref={(el) => (glowRefs.current[menuItem.id] = el)}
                onClick={() => openSubMenu(menuItem)}
                style={{
                  cursor: 'pointer',
                  border: '1px solid #ccc',
                  borderRadius: 8,
                  width: 187.5,
                  padding: 12.5,
                  textAlign: 'center',
                  userSelect: 'none',
                  boxShadow: '0 0 8px rgba(70,5,229,0.4)',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <h3 style={{ fontSize: '1.25rem', marginBottom: 12.5 }}>{menuItem.name}</h3>
                <img
                  src={menuItem.image}
                  alt={menuItem.name}
                  style={{
                    width: '100%',
                    height: 125,
                    objectFit: 'contain',
                    borderRadius: 8,
                    userSelect: 'none',
                  }}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {view === 'submenu' && selectedMenu && (
        <>
          <button onClick={() => setView('main')} style={{ marginBottom: 15 }}>
            &larr; Back to Menu
          </button>
          <h2>{selectedMenu.name}</h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 20,
              justifyContent: 'center',
            }}
          >
            {selectedMenu.subMenu.map((subItem) => (
              <div
                key={subItem.id}
                style={{
                  cursor: 'pointer',
                  border: '1px solid #ccc',
                  borderRadius: 8,
                  width: 187.5,
                  padding: 12.5,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  userSelect: 'none',
                }}
              >
                <div>
                  <img
                    src={subItem.image}
                    alt={subItem.name}
                    style={{
                      width: '100%',
                      height: 125,
                      objectFit: 'contain',
                      borderRadius: 8,
                      userSelect: 'none',
                    }}
                    draggable={false}
                  />
                  <h4 style={{ fontSize: '1.25rem', marginTop: 12.5 }}>{subItem.name}</h4>
                  {subItem.effect && <p><em>{subItem.effect}</em></p>}
                  {subItem.ingredients && <p>{subItem.ingredients}</p>}
                  <p>${subItem.price.toFixed(2)}</p>
                </div>
                <button onClick={() => addToCartClicked(subItem)} style={{ marginTop: 10 }}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {promptMessage && (
            <ModifiersPanel
              modifiers={selectedMenu.modifiers}
              secondModifiers={selectedMenu.secondModifiers}
              selectedModifiers={selectedModifiers}
              selectedSecondModifiers={selectedSecondModifiers}
              onToggleModifier={toggleModifier}
              onToggleSecondModifier={toggleSecondModifier}
              confirm={confirmSelection}
              cancel={() => {
                setPromptMessage('');
                setSelectedSubItem(null);
                setSelectedModifiers([]);
                setSelectedSecondModifiers([]);
              }}
              promptMessage={promptMessage}
              isWraps={selectedMenu.id === 6}
            />
          )}
        </>
      )}

      {view === 'checkout' && (
        <>
          <button
            onClick={() => setView(selectedMenu ? 'submenu' : 'main')}
            style={{ marginBottom: 15 }}
          >
            &larr; Back to {selectedMenu ? selectedMenu.name : 'Menu'}
          </button>
          <h2>Checkout</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #ccc' }}>
                    <th style={{ textAlign: 'left', padding: 8 }}>Item</th>
                    <th style={{ textAlign: 'left', padding: 8 }}>Modifiers</th>
                    <th style={{ textAlign: 'right', padding: 8 }}>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: 50,
                              height: 50,
                              objectFit: 'contain',
                              borderRadius: 4,
                              userSelect: 'none',
                            }}
                            draggable={false}
                          />
                        )}
                        <div>
                          <strong>{item.name}</strong>
                        </div>
                      </td>
                      <td style={{ padding: 8 }}>
                        {item.modifiers.length > 0 && <div>Size: {item.modifiers.join(', ')}</div>}
                        {item.secondModifiers.length > 0 && <div>Add-ons: {item.secondModifiers.join(', ')}</div>}
                      </td>
                      <td style={{ padding: 8, textAlign: 'right' }}>${item.price.toFixed(2)}</td>
                      <td style={{ padding: 8, textAlign: 'center' }}>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            backgroundColor: '#ff4d4f',
                            color: 'white',
                            border: 'none',
                            borderRadius: 4,
                            padding: '5px 10px',
                            cursor: 'pointer',
                            userSelect: 'none',
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: 20, textAlign: 'right' }}>
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Tax (13%): ${tax.toFixed(2)}</p>
                <h3>Total: ${total.toFixed(2)}</h3>
              </div>

              <button
                onClick={placeOrder}
                style={{
                  marginTop: 20,
                  backgroundColor: '#673ab7',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: 5,
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                Place Order
              </button>
            </>
          )}
        </>
      )}

      {view === 'exit' && (
        <div style={{ textAlign: 'center', marginTop: 100 }}>
          <h2>Thank you for your order!</h2>
          <img
            src="/Yoby Joby - VECTOR (Sticker).png"
            alt=" "
            style={{ marginTop: 20, maxWidth: 200, height: 'auto', userSelect: 'none' }}
            draggable={false}
          />
        </div>
      )}
    </div>
  );
}
