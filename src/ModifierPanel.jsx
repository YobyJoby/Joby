// src/ModifierPanel.jsx
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
  const isSelected = (group, option) => {
    return selectedModifiers[group]?.includes(option) || false;
  };

  const isSecondSelected = (group, option) => {
    return selectedSecondModifiers[group]?.includes(option) || false;
  };

  const handleToggle = (group, option, second = false) => {
    if (second) {
      onToggleSecondModifier(group, option);
    } else {
      onToggleModifier(group, option);
    }
  };

  const renderModifierGroup = (groupName, options, selected, second = false) => {
    const showUpchargeNotice =
      groupName.toLowerCase().includes("meat") ||
      groupName.toLowerCase().includes("protein");

    return (
      <div key={groupName} style={{ marginBottom: "20px" }}>
        <div style={{ fontWeight: "bold", marginBottom: "8px", fontSize: "16px" }}>
          {groupName}
        </div>

        {showUpchargeNotice && (
          <div style={{ color: "#4605e5", marginBottom: "8px", fontSize: "14px" }}>
            Choose your protein. Add a 2nd protein for +$1.
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {options.map((option) => {
            const selectedList = selected[groupName] || [];
            const selectedCount = selectedList.length;
            const isSelectedOption = selectedList.includes(option);

            return (
              <button
                key={option}
                onClick={() => handleToggle(groupName, option, second)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "6px",
                  border: isSelectedOption ? "2px solid #4605e5" : "1px solid #ccc",
                  backgroundColor: isSelectedOption ? "#eae4ff" : "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      {Object.entries(modifiers).map(([group, options]) =>
        renderModifierGroup(group, options, selectedModifiers)
      )}

      {Object.entries(secondModifiers).map(([group, options]) =>
        renderModifierGroup(group, options, selectedSecondModifiers, true)
      )}

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <button
          onClick={onConfirm}
          style={{
            backgroundColor: "#4605e5",
            color: "white",
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            marginRight: "12px",
          }}
        >
          Confirm
        </button>
        <button
          onClick={onCancel}
          style={{
            backgroundColor: "#777",
            color: "white",
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
