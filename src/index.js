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

class Keypad extends React.Component {
  constructor(props) {
    super(props);
  }
  renderButton(label, className) {
    return <button className={className}>{label}</button>;
  }
  render() {
    return (
      <div className={this.props.className}>
        {this.renderButton(7, "key")}
        {this.renderButton(8, "key")}
        {this.renderButton(9, "key")}
        {this.renderButton("DEL", "key blue")}
        {this.renderButton(4, "key")}
        {this.renderButton(5, "key")}
        {this.renderButton(6, "key")}
        {this.renderButton("+", "key")}
        {this.renderButton(1, "key")}
        {this.renderButton(2, "key")}
        {this.renderButton(3, "key")}
        {this.renderButton("-", "key")}
        {this.renderButton(".", "key")}
        {this.renderButton(0, "key")}
        {this.renderButton("/", "key")}
        {this.renderButton("x", "key")}
        {this.renderButton("RESET", "key blue reset")}
        {this.renderButton("=", "key red equal")}
      </div>
    );
  }
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
        <Screen className="screen" value="012,012" />
        <Keypad className="keypad" />
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
