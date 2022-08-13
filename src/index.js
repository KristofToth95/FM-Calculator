import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function Button(props) {
  return (
    <button
      className={props.className}
      onClick={() => props.onClick(props.value)}
    >
      {props.value}
    </button>
  );
}

function Screen(props) {
  let output = props.value.join("").replace(/.{3}/g, "$&,");
  return (
    <div className={props.className}>
      <span>{output}</span>
    </div>
  );
}

class Keypad extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.className}>
        <Button value={7} className="key" onClick={this.props.input} />
        <Button value={8} className="key" onClick={this.props.input} />
        <Button value={9} className="key" onClick={this.props.input} />
        <Button value="DEL" className="key blue" onClick={this.props.input} />
        <Button value={4} className="key" onClick={this.props.input} />
        <Button value={5} className="key" onClick={this.props.input} />
        <Button value={6} className="key" onClick={this.props.input} />
        <Button value="+" className="key" onClick={this.props.input} />
        <Button value={1} className="key" onClick={this.props.input} />
        <Button value={2} className="key" onClick={this.props.input} />
        <Button value={3} className="key" onClick={this.props.input} />
        <Button value="-" className="key" onClick={this.props.input} />
        <Button value="." className="key" onClick={this.props.input} />
        <Button value={0} className="key" onClick={this.props.input} />
        <Button value="/" className="key" onClick={this.props.input} />
        <Button value="x" className="key" onClick={this.props.input} />
        <Button
          value="RESET"
          className="key blue reset"
          onClick={this.props.input}
        />
        <Button
          value="="
          className="key red equal"
          onClick={this.props.input}
        />
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: Array(),
    };
  }
  handleInput(input) {
    let value = this.state.numbers;
    switch (true) {
      case Number.isInteger(input):
        value.push(input);
        break;
      case input == "DEL":
        value.pop();
        break;
    }
    this.setState({
      numbers: value,
    });
  }
  render() {
    return (
      <div className="calculator">
        <div className="toggle"></div>
        <Screen className="screen" value={this.state.numbers} />
        <Keypad className="keypad" input={(input) => this.handleInput(input)} />
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
