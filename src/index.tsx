import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function Keypad(props) {
  const click = (button) =>{
    props.onClick(button);
  }
  return (
    <div>
      <button onClick={() => click(1)}>1</button>
      <button onClick={() => click(2)}>2</button>
      <button>3</button>
      <button>DEL</button>
      <button>+</button>
      <button>-</button>
      <button>RESET</button>
    </div>
  );
}

function Calculator() {
  const [input, setInput] = useState(new Array());

  const handleInput = (input) => {
    console.log(input);
  };

  return <Keypad onClick={(input) => handleInput(input)} />;
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
);
