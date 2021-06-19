const OperandElements = document.querySelectorAll(".operand-btn");
const binaryOperatorElements = document.querySelectorAll(".binary-operator-btn");
const unaryOperatorElements = document.querySelectorAll(".unary-operator-btn");
const resetElement = document.querySelector(".reset-btn");
const equalsElement = document.querySelector(".equals-btn");
const decimalElement = document.querySelector(".decimal-btn");

class Calculator {
  #screenElement = document.querySelector(".screen-label");
  #operatorElement = null;
  #currentOperand = null;
  #prevOperand = null;
  #operation = null;
  #result = null;
  #equalsHasBeenPressed = false;

  get currentOperand() {
    return this.#currentOperand;
  }

  set currentOperand(operand) {
    this.#currentOperand = operand;
  }

  get prevOperand() {
    return this.#prevOperand;
  }

  set prevOperand(operand) {
    this.#prevOperand = operand;
  }

  get operatorElement() {
    return this.#operatorElement;
  }

  set operatorElement(operatorElement) {
    this.#operatorElement = operatorElement;
  }

  get operation() {
    return this.#operation;
  }

  set operation(operation) {
    this.#operation = operation;
  }

  get eqaulsHasBeenPressed() {
    return this.#equalsHasBeenPressed;
  }

  set eqaulsHasBeenPressed(boolValue) {
    this.#equalsHasBeenPressed = boolValue;
  }

  updateScreen() {
    this.#screenElement.innerHTML = this.#currentOperand;
  }

  appendOperand(operand) {
    this.#currentOperand += operand;
  }

  popNumber() {
    this.#currentOperand = this.#currentOperand.slice(0, -1);
  }

  getPercent() {
    const temp = Number(this.#currentOperand) / 100;
    this.#currentOperand = String(temp);
  }

  negate() {
    const operand = Number(this.#currentOperand);
    if (operand === 0) return;
    this.#currentOperand = String(-1 * operand);
  }

  reset() {
    this.#screenElement.innerHTML = "0";
    this.#operatorElement = null;
    this.#currentOperand = null;
    this.#prevOperand = null;
    this.#operation = null;
    this.#result = null;
    this.#equalsHasBeenPressed = false;
  }

  compute() {
    switch (this.#operation) {
      case "divide":
        this.#result = Number(this.#prevOperand) / Number(this.#currentOperand);
        break;
      case "multiply":
        this.#result = Number(this.#prevOperand) * Number(this.#currentOperand);
        break;
      case "subtract":
        this.#result = Number(this.#prevOperand) - Number(this.#currentOperand);
        break;
      case "add":
        this.#result = Number(this.#prevOperand) + Number(this.#currentOperand);
        break;
      default:
        alert("Something went wrong in compute");
    }
    this.#result = String(this.#result);
    return this.#result;
  }
}

const calc = new Calculator();

function handelOperand(e) {
  const operand = e.currentTarget.innerHTML;

  if (calc.operatorElement !== null) {
    calc.prevOperand = calc.currentOperand;
    calc.currentOperand = null;
    calc.operatorElement.classList.remove("selected");
    calc.operatorElement.classList.add("unselected");
    calc.operatorElement = null;
  }

  if (calc.eqaulsHasBeenPressed) {
    calc.currentOperand = null;
    calc.eqaulsHasBeenPressed = false;
  }

  if (calc.currentOperand === null) calc.currentOperand = "";
  if ((operand === ".") & (calc.currentOperand === "")) {
    calc.currentOperand = "0";
  } else if ((operand === ".") & calc.currentOperand.includes(".")) {
    return;
  } else if ((operand === "0") & (calc.currentOperand === "0")) {
    return;
  } else if ((calc.currentOperand === "0") & (operand !== ".")) {
    calc.currentOperand = "";
  }

  calc.appendOperand(operand);
  calc.updateScreen();
}

function handelBinaryOperator(e) {
  const element = e.currentTarget;

  if ((calc.currentOperand !== null) & (calc.prevOperand !== null)) {
    const ans = calc.compute();
    calc.currentOperand = ans;
    calc.prevOperand = null;
    calc.updateScreen();
  }

  if ((calc.operatorElement !== null) & (calc.operatorElement !== element)) {
    calc.operatorElement.classList.remove("selected");
    calc.operatorElement.classList.add("unselected");
    calc.operatorElement = null;
  }

  if (!element.classList.contains("selected") & !element.classList.contains("unselected")) {
    element.classList.add("selected");
    calc.operatorElement = element;
  } else {
    element.classList.toggle("selected");
    element.classList.toggle("unselected");
    element.classList.contains("selected")
      ? (calc.operatorElement = element)
      : (calc.operatorElement = null);
  }

  if (calc.operatorElement !== null) {
    calc.operation = calc.operatorElement.getAttribute("data-operation");
  } else {
    calc.operation = null;
  }
}

function handelUnaryOperator(e) {
  const operation = e.currentTarget.getAttribute("data-operation");

  if (calc.currentOperand === null) return;
  if (calc.currentOperand === "0") return;
  if (calc.operatorElement !== null) return;

  switch (operation) {
    case "backspace":
      const operandLength = calc.currentOperand.length;
      if (operandLength === 1) {
        calc.currentOperand = "0";
      } else {
        calc.popNumber();
      }
      break;
    case "percent":
      calc.getPercent();
      break;
    case "negate":
      calc.negate();
      break;
    default:
      alert("something went wrong in handelUnaryOperator");
  }

  calc.updateScreen();
}

function handelEquals() {
  if (calc.operatorElement !== null) {
    calc.operatorElement.classList.remove("selected");
    calc.operatorElement.classList.add("unselected");
    calc.operatorElement = null;
    calc.operation = null;
  }

  if (calc.prevOperand === null) return;

  const ans = calc.compute();
  calc.currentOperand = ans;
  calc.prevOperand = null;
  calc.eqaulsHasBeenPressed = true;
  calc.updateScreen();
}

function handelReset() {
  calc.reset();
}

document.addEventListener("DOMContentLoaded", () => {
  OperandElements.forEach((OperandElement) => {
    OperandElement.addEventListener("click", handelOperand);
  });

  binaryOperatorElements.forEach((binaryOperatorElement) => {
    binaryOperatorElement.addEventListener("click", handelBinaryOperator);
  });

  unaryOperatorElements.forEach((unaryOperatorElement) => {
    unaryOperatorElement.addEventListener("click", handelUnaryOperator);
  });

  equalsElement.addEventListener("click", handelEquals);

  resetElement.addEventListener("click", handelReset);
});
