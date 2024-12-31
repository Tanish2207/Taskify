import React, { useState, useRef } from 'react';

const InputOnButtonClick = () => {
  const [showInput, setShowInput] = useState(false); // To control input field visibility
  const inputRef = useRef(null); // Reference for the input field

  const handleButtonClick = () => {
    setShowInput(true); // Show the input field
    setTimeout(() => {
      inputRef.current?.focus(); // Focus the input field to open the keyboard
    }, 0);
  };

  const handleInputChange = (e) => {
    console.log("Input Value:", e.target.value); // Handle input changes
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={handleButtonClick}>Click to Open Input</button>
      {showInput && (
        <input
          type="text"
          ref={inputRef}
          placeholder="Type something..."
          onChange={handleInputChange}
          style={{ display: "block", marginTop: "10px", padding: "5px" }}
        />
      )}
    </div>
  );
};

export default InputOnButtonClick;
