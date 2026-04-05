function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

function evaluate(operator) {
  return function (a) {
    return function (b) {
      if (operator == "Sum") return a + b;
      else if (operator == "Divide") return a / b;
      else if (operator == "Multiply") return a * b;
      else if (operator == "substract") return a - b;
      else return "Not an operator";
    };
  };
}

const multiply = evaluate("Multiply");
const divide = evaluate("Divide");
const addition = evaluate("Sum");
const substract = evaluate("substract");

// Infinite currying

function add(a) {
  return function (b) {
    if (b) return add(a + b);
    return a;
  };
}

// Manipulating dom using currying

function updateElementText(id) {
  return function (content) {
    document.getElementById(id).textContent = content;
  };
}

const heading = updateElementText("heading");

heading("I will join big company soon");

heading("Finally I made it");

// Currying

function curry(func) {
  return function curriedFunc(...args) {
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return function (...next) {
        return curriedFunc(...args, ...next);
      };
    }
  };
}

// const sum = (a, b, c, d) => a + b + c + d;

const totalSum = curry(sum);

// console.log(totalSum(5, 10, 10));
