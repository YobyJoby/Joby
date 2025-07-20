ModifierPanel.jsx - // src/ModifierPanel.jsx
import React from "react";

export default function ModifierPanel({
  modifiers,
  secondModifiers = [],
  selectedModifiers,
  selectedSecondModifiers,
  onToggleModifier,
  onToggleSecondModifier,
  onConfirm,
  onCancel,
}) {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        maxWidth: 900,
        margin: "20px auto 0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ textAlign: "center" }}>Select Modifiers</h3>

      {modifiers.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>Modifiers:</strong>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 5 }}>
            {modifiers.map((mod) => {
              const selected = selectedModifiers.some((m) => m.name === mod.name);
              return (
                <button
                  key={mod.name}
                  onClick={() => onToggleModifier(mod)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 5,
                    border: selected ? "2px solid #4605e5" : "1px solid #ccc",
                    backgroundColor: selected ? "#e3dfff" : "white",
                    cursor: "pointer",
                  }}
                >
                  {mod.name} {mod.price > 0 ? + $${mod.price.toFixed(2)} : ""}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {secondModifiers.length > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>Extras:</strong>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 5 }}>
            {secondModifiers.map((mod) => {
              const selected = selectedSecondModifiers.some((m) => m.name === mod.name);
              return (
                <button
                  key={mod.name}
                  onClick={() => onToggleSecondModifier(mod)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 5,
                    border: selected ? "2px solid #4605e5" : "1px solid #ccc",
                    backgroundColor: selected ? "#e3dfff" : "white",
                    cursor: "pointer",
                  }}
                >
                  {mod.name} {mod.price > 0 ? + $${mod.price.toFixed(2)} : ""}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <button
          onClick={onCancel}
          style={{
            padding: "10px 20px",
            borderRadius: 5,
            cursor: "pointer",
            backgroundColor: "#ccc",
            border: "none",
          }}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          style={{
            padding: "10px 20px",
            borderRadius: 5,
            cursor: "pointer",
            backgroundColor: "#4605e5",
            color: "white",
            border: "none",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}