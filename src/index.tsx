import React, { Fragment, useEffect, useState } from "react";
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
        if (firstOperand && secondOperand) {
          setOutput(calculate());
          secondOperand = [calculate()];
        }
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
    <div className="calculator">
      <ThemeSlider />
      <Screen output={output} />
      <Keypad
        onClickNum={(input) => handleNumInput(input)}
        onClickComm={(comm) => handleCommInput(comm)}
      />
    </div>
  );
}

function Screen(props: { output: string }) {
  const arrayToString = () => {
    return parseFloat(props.output).toLocaleString("en-US");
  };

  return (
    <div className="screen">
      <div>{arrayToString()}</div>
    </div>
  );
}

function ThemeSlider() {
  const [toggle, setToggle] = useState([
    { opacity: 1 },
    { opacity: 0 },
    { opacity: 0 },
  ]);

  const toggleEvent = (num: number) => {
    let temp = [...toggle];
    temp[num] = { opacity: 1 };
    temp.forEach((el, i) => {
      if (i != num) {
        temp[i] = { opacity: 0 };
      }
    });
    setToggle(temp);
  };

  return (
    <div className="container">
      <span className="app_label">calc</span>
      <div className="toggle">
        <span className="toggle_label">THEME</span>
        <div className="toggle_button">
          <div className="labels">
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>
          <div className="buttons">
            <input
              type="radio"
              className="button"
              style={toggle[0]}
              onClick={() => toggleEvent(0)}
              name="toggle"
              id="one"
            />
            <input
              type="radio"
              className="button"
              name="toggle"
              style={toggle[1]}
              onClick={() => toggleEvent(1)}
              id="two"
            />
            <input
              type="radio"
              className="button"
              name="toggle"
              style={toggle[2]}
              onClick={() => toggleEvent(2)}
              id="three"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Keypad(props: { onClickNum; onClickComm }) {
  const click = (button) => {
    props.onClickNum(button);
  };
  return (
    <div className="keypad">
      <button onClick={() => click(7)}>7</button>
      <button onClick={() => click(8)}>8</button>
      <button onClick={() => click(9)}>9</button>
      <button className="blueKey" onClick={() => props.onClickComm("DEL")}>
        DEL
      </button>
      <button onClick={() => click(4)}>4</button>
      <button onClick={() => click(5)}>5</button>
      <button onClick={() => click(6)}>6</button>
      <button onClick={() => props.onClickComm("+")}>+</button>
      <button onClick={() => click(1)}>1</button>
      <button onClick={() => click(2)}>2</button>
      <button onClick={() => click(3)}>3</button>
      <button onClick={() => props.onClickComm("-")}>-</button>
      <button onClick={() => props.onClickComm(".")}>.</button>
      <button onClick={() => click(0)}>0</button>
      <button onClick={() => props.onClickComm("/")}>/</button>
      <button onClick={() => props.onClickComm("*")}>x</button>
      <button
        className="blueKey longKey"
        onClick={() => props.onClickComm("RESET")}
      >
        RESET
      </button>
      <button className="redKey longKey" onClick={() => props.onClickComm("=")}>
        =
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
);
