import React, { useState } from 'react';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const handleDigitClick = (digit) => {
    if (displayValue === '0' || waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue + digit);
    }
  };

  const handleDecimalClick = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const handleOperatorClick = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = () => {
    const inputValue = parseFloat(displayValue);

    if (operator === '+') {
      return firstOperand + inputValue;
    } else if (operator === '-') {
      return firstOperand - inputValue;
    } else if (operator === '*') {
      return firstOperand * inputValue;
    } else if (operator === '/') {
      return firstOperand / inputValue;
    }

    return inputValue;
  };

  const handleEqualClick = () => {
    const result = performCalculation();
    setDisplayValue(String(result));
    setFirstOperand(result);
    setOperator(null);
    setWaitingForSecondOperand(true);
  };

  const handleClearClick = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="keypad">
        <button onClick={handleClearClick} className="key key1">AC</button>
        <button onClick={() => handleOperatorClick('/')} className="key key1">/</button>
        <button onClick={() => handleOperatorClick('*')} className="key key1">*</button>
        <button onClick={() => handleOperatorClick('-')} className="key key1">-</button>
        <button onClick={() => handleDigitClick('7')} className="key">7</button>
        <button onClick={() => handleDigitClick('8')} className="key">8</button>
        <button onClick={() => handleDigitClick('9')} className="key">9</button>
        <button onClick={() =>  handleOperatorClick('+')}className="key">+</button>
        <button onClick={() => handleDigitClick('4')} className="key">4</button>
        <button onClick={() => handleDigitClick('5')} className="key">5</button>
        <button onClick={() => handleDigitClick('6')} className="key">6</button>
        <button onClick={handleEqualClick} className="key key1">=</button>
        <button onClick={() => handleDigitClick('1')} className="key">1</button>
        <button onClick={() => handleDigitClick('2')} className="key">2</button>
        <button onClick={() => handleDigitClick('3')} className="key">3</button>
        <button onClick={() => handleDigitClick('0')} className="key">0</button>
        <button onClick={handleDecimalClick} className="key">.</button>
      </div>
    </div>
  );
};

export default Calculator;