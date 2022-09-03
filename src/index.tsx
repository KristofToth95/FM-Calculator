import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

var firstOperand: Array<number> = [];
var secondOperand: Array<number> = [];
var operation: String = "";
var isFloat: false;

function joinArray(arr: Array<number>) {
  return parseFloat(arr.join("")) || 0;
}

function Calculator() {
  const [output, setOutput] = useState(0);

  const refreshOutput = () => {
    setOutput(joinArray(firstOperand));
  };

  const handleNumInput = (i) => {
    if (operation === "=") {
      operation = "";
      firstOperand = [];
    }
    if (isFloat && i === ".") {
      return;
    }
    firstOperand.push(i);
    refreshOutput();
  };

  const handleCommInput = (comm) => {
    switch (true) {
      case comm === "DEL":
        if (firstOperand.length > 0) {
          if (secondOperand.length > 0) {
            firstOperand = [];
          } else {
            firstOperand.pop();
            refreshOutput();
          }
        }
        break;
      case comm === "RESET":
        firstOperand = [];
        secondOperand = [];
        operation = "";
        setOutput(0);
        break;
      case comm === "+" || comm === "-" || comm === "*" || comm === "/":
        if (operation) {
          setOutput(calculate());
          secondOperand = [calculate()];
        } else {
          secondOperand = firstOperand;
        }
        firstOperand = [];
        operation = comm;
        break;
      case comm === "=":
        setOutput(calculate());
        secondOperand = [calculate()];
    }
  };

  const calculate = () => {
    return eval(
      `${parseInt(secondOperand.join(""))} ${operation} ${parseInt(
        firstOperand.join("")
      )}`
    );
  };

  return (
    <>
      <Screen
        output={output}
        firstOp={joinArray(firstOperand)}
        secondOp={joinArray(secondOperand)}
      />
      <Keypad
        onClickNum={(input) => handleNumInput(input)}
        onClickComm={(comm) => handleCommInput(comm)}
      />
    </>
  );
}

function Screen(props: { output: number; firstOp: number; secondOp: number }) {
  // console.log(props.output);
  const arrayToString = () => {
    return props.output.toLocaleString("en-US");
  };

  return (
    <>
      <div>Első operandus: {props.firstOp}</div>
      <div>Második operandus: {props.secondOp}</div>
      <div>Eredmeny:{arrayToString()}</div>)
    </>
  );
}

function Keypad(props: { onClickNum; onClickComm }) {
  const click = (button) => {
    props.onClickNum(button);
  };
  return (
    <div>
      <button onClick={() => click(1)}>1</button>
      <button onClick={() => click(2)}>2</button>
      <button onClick={() => click(3)}>3</button>
      <button onClick={() => click(".")}>.</button>
      <button onClick={() => props.onClickComm("DEL")}>DEL</button>
      <button onClick={() => props.onClickComm("+")}>+</button>
      <button onClick={() => props.onClickComm("-")}>-</button>
      <button onClick={() => props.onClickComm("=")}>=</button>
      <button onClick={() => props.onClickComm("RESET")}>RESET</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
);
