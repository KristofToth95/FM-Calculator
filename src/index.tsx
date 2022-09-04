import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

var firstOperand: Array<string> = [];
var secondOperand: Array<string> = [];
var operation: String = "";
var isFloat: boolean = false;

function joinArray(arr: Array<string>) {
  return arr.join("") || "0";
}

function Calculator() {
  const [output, setOutput] = useState<string>("0");

  const refreshOutput = () => {
    setOutput(joinArray(firstOperand));
  };

  const handleNumInput = (i) => {
    if (operation === "=") {
      operation = "";
      firstOperand = [];
    }
    if (i === ".") {
      if (isFloat) {
        return;
      } else {
        isFloat = true;
      }
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
            if (firstOperand.pop() == ".") {
              isFloat = false;
            }
            firstOperand.pop();
            refreshOutput();
          }
        }
        break;
      case comm === "RESET":
        firstOperand = [];
        secondOperand = [];
        operation = "";
        setOutput("0");
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
        break;
      case comm === ".":
        if (!isFloat) {
          if (firstOperand.length == 0) {
            firstOperand.push("0");
            firstOperand.push(comm);
          } else {
            firstOperand.push(comm);
          }
          refreshOutput();
        }
    }
  };

  const calculate = () => {
    return eval(
      `${parseFloat(secondOperand.join(""))} ${operation} ${parseFloat(
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

function Screen(props: { output: string; firstOp: string; secondOp: string }) {
  const arrayToString = () => {
    return parseFloat(props.output).toLocaleString("en-US");
  };

  return (
    <>
      <div>Első operandus: {props.firstOp}</div>
      <div>Második operandus: {props.secondOp}</div>
      <div>Eredmeny: {arrayToString()}</div>
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
      <button onClick={() => props.onClickComm(".")}>.</button>
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
