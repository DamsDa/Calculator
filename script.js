// dom Select ELEMENT
const displayHistory = document.querySelector(".display-history");
const displayInput = document.querySelector(".display-input");
const tempResult = document.querySelector(".temp-result");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const lastEntyClear = document.querySelector(".last-entity-clear");
const clearAll = document.querySelector(".clear-all");
const equal = document.querySelector(".equal");

let display1Num = "";
let display2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

// check Click every Num
numbers.forEach((num) => {
  num.addEventListener("click", (e) => {
    // check if e inner text .
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    display2Num += e.target.innerText;
    displayInput.innerText = display2Num;
  });
});

// check click every operation
operations.forEach((op) => {
  op.addEventListener("click", (e) => {
    if (!display2Num) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (display1Num && display2Num && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(display2Num);
    }
    clearVar(operationName);
    lastOperation = operationName;
  });
});

function clearVar(name = "") {
  display1Num += display2Num + " " + name + " ";
  displayHistory.innerText = display1Num;
  displayInput.innerText = "";
  display2Num = "";
  tempResult.innerHTML = result;
}

function mathOperation() {
  if (lastOperation === "X" || lastOperation === "x") {
    result = parseFloat(result) * parseFloat(display2Num);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(display2Num);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(display2Num);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(display2Num);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(display2Num);
  }
}

equal.addEventListener("click", () => {
  if (!display1Num || !display2Num) return;
  haveDot = false;
  mathOperation();
  clearVar();
  displayInput.innerText = result;
  tempResult.innerText = "";
  display2Num = result;
  display1Num = "";
});

clearAll.addEventListener("click", () => {
  display1Num = "";
  display2Num = "";
  haveDot = false;
  result = "";
  lastOperation = "";
  displayHistory.innerText = "";
  tempResult.innerText = "";
  displayInput.innerText = "";
});

lastEntyClear.addEventListener("click", () => {
  displayInput.innerText = "";
  display2Num = "";
});

// keyboard input for calcu
window.addEventListener("keypress", (e) => {
  if (e.key === "0" || e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4" || e.key === "5" || e.key === "6" || e.key === "7" || e.key === "8" || e.key === "9") {
    clickButton(e.key);
  } else if (e.key === "+" || e.key === "/" || e.key === "-" || e.key === "%") {
    operatorClicked(e.key);
  } else if (e.key === "*") {
    operatorClicked("X");
  } else if (e.key === "Enter" || e.key === "=") {
    clickEqual();
  } else if (e.key === 8 || e.key === "Backspace" || e.key === "delete") {
    clickClear();
  }
});
function clickButton(key) {
  numbers.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function operatorClicked(key) {
  operations.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}

function clickEqual() {
  equal.click();
}

function clickClear() {
  clearAll.click();
}
