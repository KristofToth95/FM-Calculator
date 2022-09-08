import React, { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

var firstOperand: Array<string> = [];
var secondOperand: Array<string> = [];
var operation: String = "";
var isFloat: boolean = false;

function joinArray(arr: Array<string>) {
  return arr.join("") || "0";
}

export const ThemeContext = createContext({
  theme: "first",
  switchTheme: (type: any) => {},
});

function Calculator() {
  const [output, setOutput] = useState<string>("0");
  const [theme, setTheme] = useState("first");

  const refreshOutput = () => {
    setOutput(joinArray(firstOperand));
  };

  const switchTheme = (themeType) => {
    setTheme(themeType);
    switch (true) {
      case themeType === "":
        document.querySelector("#root")?.setAttribute("class", "");
        document.querySelector("#root")?.classList.add("first");
        break;
      case themeType === "second":
        document.querySelector("#root")?.setAttribute("class", "");
        document.querySelector("#root")?.classList.add("second");
        break;
      case themeType === "third":
        document.querySelector("#root")?.setAttribute("class", "");
        document.querySelector("#root")?.classList.add("third");
        break;
    }
  };

  const handleNumInput = (i) => {
    console.log(theme);
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
      <ThemeContext.Provider value={{ theme: theme, switchTheme: switchTheme }}>
        <ThemeSlider />
        <Screen output={output} />
        <Keypad
          onClickNum={(input) => handleNumInput(input)}
          onClickComm={(comm) => handleCommInput(comm)}
        />
      </ThemeContext.Provider>
    </div>
  );
}

function Screen(props: { output: string }) {
  const theme = useContext(ThemeContext);

  const arrayToString = () => {
    return parseFloat(props.output).toLocaleString("en-US");
  };

  return (
    <div className={`screen ${theme.theme}`}>
      <div className={theme.theme}>{arrayToString()}</div>
    </div>
  );
}

function ThemeSlider() {
  const theme = useContext(ThemeContext);

  const [toggle, setToggle] = useState([
    { opacity: 1 },
    { opacity: 0 },
    { opacity: 0 },
  ]);

  const toggleEvent = (num: number) => {
    let temp = [...toggle];
    temp[num] = { opacity: 1 };
    switch (true) {
      case num === 0:
        theme.switchTheme("");
        break;
      case num === 1:
        theme.switchTheme("second");
        break;
      case num === 2:
        theme.switchTheme("third");
        break;
    }
    temp.forEach((el, i) => {
      if (i != num) {
        temp[i] = { opacity: 0 };
      }
    });
    setToggle(temp);
  };

  return (
    <div className="container">
      <span className={`app_label ${theme.theme}`}>calc</span>
      <div className="toggle">
        <span className={`toggle_label ${theme.theme}`}>THEME</span>
        <div className="toggle_button">
          <div className="labels">
            <span className={theme.theme}>1</span>
            <span className={theme.theme}>2</span>
            <span className={theme.theme}>3</span>
          </div>
          <div className={`buttons ${theme.theme}`}>
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
  const theme = useContext(ThemeContext);
  const click = (button) => {
    props.onClickNum(button);
  };

  console.log(`blueKey longKey ${theme.theme}`);

  return (
    <div className={`keypad ${theme.theme}`}>
      <button className={theme.theme} onClick={() => click(7)}>
        7
      </button>
      <button className={theme.theme} onClick={() => click(8)}>
        8
      </button>
      <button className={theme.theme} onClick={() => click(9)}>
        9
      </button>
      <button
        className={`blueKey ${theme.theme}`}
        onClick={() => props.onClickComm("DEL")}
      >
        DEL
      </button>
      <button className={theme.theme} onClick={() => click(4)}>
        4
      </button>
      <button className={theme.theme} onClick={() => click(5)}>
        5
      </button>
      <button className={theme.theme} onClick={() => click(6)}>
        6
      </button>
      <button className={theme.theme} onClick={() => props.onClickComm("+")}>
        +
      </button>
      <button className={theme.theme} onClick={() => click(1)}>
        1
      </button>
      <button className={theme.theme} onClick={() => click(2)}>
        2
      </button>
      <button className={theme.theme} onClick={() => click(3)}>
        3
      </button>
      <button className={theme.theme} onClick={() => props.onClickComm("-")}>
        -
      </button>
      <button className={theme.theme} onClick={() => props.onClickComm(".")}>
        .
      </button>
      <button className={theme.theme} onClick={() => click(0)}>
        0
      </button>
      <button className={theme.theme} onClick={() => props.onClickComm("/")}>
        /
      </button>
      <button className={theme.theme} onClick={() => props.onClickComm("*")}>
        x
      </button>
      <button
        className={`blueKey longKey ${theme.theme}`}
        onClick={() => props.onClickComm("RESET")}
      >
        RESET
      </button>
      <button
        className={`redKey longKey ${theme.theme}`}
        onClick={() => props.onClickComm("=")}
      >
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
