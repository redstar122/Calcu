import { useState } from 'react';
import './App.css';

function CalcDisplay({ value }) {
  return <div className="Display">{value}</div>;
}

function CalcButton({ label, onClick, variant }) {
  return (
    <button type="button" className={`Button ${variant}`} onClick={() => onClick(label)}>
      {label}
    </button>
  );
}

function App() {
  const [display, setDisplay] = useState('0');

  const buttons = [
    { label: '7', variant: 'number' },
    { label: '8', variant: 'number' },
    { label: '9', variant: 'number' },
    { label: '÷', variant: 'operator' },
    { label: '4', variant: 'number' },
    { label: '5', variant: 'number' },
    { label: '6', variant: 'number' },
    { label: '×', variant: 'operator' },
    { label: '1', variant: 'number' },
    { label: '2', variant: 'number' },
    { label: '3', variant: 'number' },
    { label: '-', variant: 'operator' },
    { label: '0', variant: 'number' },
    { label: 'CLR', variant: 'clear' },
    { label: '=', variant: 'equal' },
    { label: '+', variant: 'operator' },
  ];

  const handleButtonClick = (value) => {
    if (value === 'CLR') {
      setDisplay('0');
      return;
    }

    if (value === '=') {
      try {
        const sanitized = display.replace(/×/g, '*').replace(/÷/g, '/');
        const result = Function(`"use strict"; return (${sanitized});`)();
        setDisplay(String(result));
      } catch {
        setDisplay('Error');
      }
      return;
    }

    setDisplay((prev) => {
      if (prev === 'Error') return value;
      if (prev === '0' && /[0-9]/.test(value)) return value;
      if (prev === '0' && /[÷×+\-]/.test(value)) return `0${value}`;
      return prev + value;
    });
  };

  return (
    <div className="App">
      <div className="Header">Calculator of Rhedjhie Calma - WMD3A</div>
      <div className="Calculator">
        <CalcDisplay value={display} />
        <div className="Keypad">
          {buttons.map(({ label, variant }) => (
            <CalcButton key={label} label={label} variant={variant} onClick={handleButtonClick} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
