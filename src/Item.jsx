import React, { useEffect } from "react";

const BUTTON_COLOR = "#4605e5";

export default function Item({
  item,
  selectedMenu,
  onBack,
  selectedModifiers,
  selectedSecondModifiers,
  toggleModifier,
  toggleSecondModifier,
  addToCartImmediate,
  showSecondModifiers,
}) {
  useEffect(() => {
    if (item.modifiers.length === 0) {
      addToCartImmediate([], []);
    } else if (
      item.modifiers.length > 0 &&
      item.secondModifiers.length === 0 &&
      selectedModifiers.length === 1
    ) {
      addToCartImmediate(selectedModifiers, []);
    } else if (
      item.modifiers.length > 0 &&
      item.secondModifiers.length > 0 &&
      selectedModifiers.length === 1 &&
      selectedSecondModifiers.length === 1
    ) {
      addToCartImmediate(selectedModifiers, selectedSecondModifiers);
    }
  }, [selectedModifiers, selectedSecondModifiers, item, addToCartImmediate]);

  const showSecondMods = selectedModifiers.length > 0 && item.secondModifiers.length > 0;

  // Wrap check for modifier question and price display
  const isWrapWithMuscleUp =
    item.modifiers.length > 0 &&
    item.modifiers.every((mod) =>
      ["No, thanks", "Extra Cheese", "Extra Chicken Breast"].includes(mod.name)
    );

  // Bubble Tea or Bubble Coffee detection by menu id (1 or 2 as per your menu.js)
  const isBubbleTeaOrCoffee = selectedMenu?.id === 1 || selectedMenu?.id === 2;

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "20px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "#fff",
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        border: "2px solid #ccc",
      }}
    >
      <button onClick={onBack} className="styled-button" style={{ marginBottom: 20 }}>
        &lt; Back
      </button>

      <div style={{ textAlign: "center" }}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "12px",
            marginBottom: 12,
            objectFit: "cover",
          }}
          draggable={false}
        />
        <h2 style={{ color: BUTTON_COLOR, fontSize: "22px", margin: "10px 0" }}>
          {item.name}
        </h2>
        <p style={{ fontSize: "16px", color: "#666", marginBottom: "16px" }}>
          {item.description}
        </p>
      </div>

      {!showSecondModifiers && item.modifiers.length > 0 && (
        <>
          <h3 style={{ color: BUTTON_COLOR, fontSize: 16 }}>
            {isWrapWithMuscleUp ? "Want To Muscle It Up?" : "What size are you thinkin'?"}
          </h3>
          <ModifierSelector
            modifiers={item.modifiers}
            selectedModifiers={selectedModifiers}
            toggleModifier={toggleModifier}
            showPrice={isWrapWithMuscleUp}
          />
        </>
      )}

      {showSecondModifiers && (
        <>
          <h3 style={{ color: BUTTON_COLOR, fontSize: 16 }}>
            {isBubbleTeaOrCoffee ? "Extra Bubbles are Delicious!" : "Want to muscle it up?"}
          </h3>
          <ModifierSelector
            modifiers={
              isBubbleTeaOrCoffee
                ? [
                    { name: "No, Thanks", price: 0 },
                    { name: "Extra Bubbles", price: 1.0 },
                  ]
                : item.secondModifiers
            }
            selectedModifiers={selectedSecondModifiers}
            toggleModifier={toggleSecondModifier}
            showPrice={true}
          />
        </>
      )}
    </div>
  );
}

const ModifierSelector = ({ modifiers, selectedModifiers, toggleModifier, showPrice }) => (
  <div
    style={{
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: 10,
    }}
  >
    {modifiers.map((mod) => {
      const isChecked = selectedModifiers.some((m) => m.name === mod.name);
      return (
        <button
          key={mod.name}
          type="button"
          onClick={() => toggleModifier(mod)}
          className={`styled-button${isChecked ? " selected" : ""}`}
          style={{ minWidth: 90, fontSize: 14 }}
        >
          {mod.name}
          {showPrice && mod.price ? ` (+$${mod.price.toFixed(2)})` : ""}
        </button>
      );
    })}
  </div>
);
