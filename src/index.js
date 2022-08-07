import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function Button(props) {
  return <button className="button">{props.value}</button>;
}

function Screen(props) {
  return (
    <div className={props.className}>
      <span>{props.value}</span>
    </div>
  );
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: null,
    };
  }
  renderScreen() {
    return <div>asdfasdf</div>;
  }
  render() {
    return (
      <div className="calculator">
        <div className="toggle"></div>
        <Screen className="screen" value="012012" />
        <div className="keypad"></div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
);
