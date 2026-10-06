import React, { useState } from "react";
import "./Calculator.css";

// Update these to your personal details
const FULLNAME = "Rhedjhe Calma"; // full name to display when surname button is clicked
const SECTION = " wmc 3A";
const SURNAME = "LAYUG"; // short label for the button

export default function Calculator() {
  const [display, setDisplay] = useState("");
  const [lastInput, setLastInput] = useState("");
  const [showingFullname, setShowingFullname] = useState(false);

  const handleClick = (value) => {
    // If we are currently showing the full name from the surname button,
    // then the next button press (except Clear or another surname click)
    // should clear the fullname and start fresh with the new input.
    if (showingFullname) {
      if (value === 'C') {
        setDisplay('');
        setShowingFullname(false);
        setLastInput(value);
        return;
      }
      if (value === SURNAME) {
        // keep showing fullname if they click surname again
        setDisplay(FULLNAME);
        setShowingFullname(true);
        setLastInput(value);
        return;
      }
      // For other buttons, start fresh with that value
      setDisplay(value === '=' ? '' : value);
      setShowingFullname(false);
      setLastInput(value);
      // If they pressed '=', evaluate now (though it's probably not meaningful)
      if (value === '=') {
        try {
          const sanitized = value === '=' ? display.replace(/÷/g, "/") : display;
          // eslint-disable-next-line no-eval
          setDisplay(eval(sanitized).toString());
        } catch {
          setDisplay('Error');
        }
      }
      return;
    }

    if (value === "C") {
      setDisplay("");
      setShowingFullname(false);
    } else if (value === "=") {
      try {
        // Replace ÷ with / for eval
        const sanitized = display.replace(/÷/g, "/");
        // eslint-disable-next-line no-eval
        setDisplay(eval(sanitized).toString());
      } catch {
        setDisplay("Error");
      }
    } else {
      // Default: append the pressed value (numbers/operators)
      setDisplay((prev) => prev + value);
    }
    setLastInput(value);
  };

  const buttons = [
    "7", "8", "9", "÷",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", "C", "=", "+",
  ];

  return (
    <div className="calc-container">
  <h2 className="calc-title">Calculator of {FULLNAME} - {SECTION}</h2>
      <div className="calc-display">{display || "0"}</div>
      <div className="calc-buttons">
        {buttons.map((btn) => {
          const cls = btn === 'C' ? 'btn-clear' : btn === '=' ? 'btn-equal' : '';
          return (
            <button key={btn} className={cls} onClick={() => handleClick(btn)}>{btn}</button>
          );
        })}
      </div>
      {/* Surname button: when clicked, show the full name in the display */}
      <button
        className="surname-btn fullname-btn"
        onClick={() => {
          setDisplay(FULLNAME);
          setShowingFullname(true);
        }}
      >
        {SURNAME}
      </button>
    </div>
  );
}
