// Closure in javascript
// Q1 : What will be logged to console?
// Q2 : Write a function that would allow you to do this?
// Q3 : Time optimization
// Q4 : How would you use a closure to create a private counter?
// Q5 : What is module pattern?
// Q6 : Make this run only once
// Q7 : once Polyfill
// Q8 : Memoize polyfill

// Q8

function myMemoize(fn, context) {
  const res = {};
  return function (...args) {
    let argsCache = JSON.stringify(args);
    if (!res[argsCache]) {
      res[argsCache] = fn.call(context || this, ...args);
    }
    return res[argsCache];
  };
}

const clumsyProduct = (num1, num2) => {
  for (let i = 1; i <= 100000000; i++) {}
  return num1 * num2;
};

const memoizedFnResult = myMemoize(clumsyProduct);

console.time("first call");
console.log(memoizedFnResult(5, 5));
console.timeEnd("first call");

console.time("second call");
console.log(memoizedFnResult(5, 5));
console.timeEnd("second call");

// Q7

function once(func, context) {
  let ran;
  return function () {
    if (func) {
      ran = func.apply(context || this, arguments);
      func = null;
    }
    return ran;
  };
}

const hello = once(() => console.log("Hello"));
hello();
hello();
hello();

// Q6

function getName(name) {
  let called = 0;
  return function () {
    if (called > 0) {
      console.log("Already this function is called");
    } else {
      console.log(name);
      called++;
    }
  };
}

let displayName = getName("Yogesh");
displayName();
displayName();
displayName();

// Q5
let module = (function () {
  function privateMethod() {
    console.log("Private method");
  }

  return {
    publicMethod: function () {
      privateMethod();
    },
  };
})();

module.publicMethod();

// Q4
function counter() {
  let _counter = 0;

  function add(increment) {
    _counter += increment;
  }
  function retrieve() {
    return _counter;
  }

  return {
    add,
    retrieve,
  };
}

const { add, retrieve } = counter();

// Q3
function find() {
  let a = [];
  for (let i = 0; i < 1000000; i++) {
    a[i] = i * i;
  }
  return function (index) {
    console.log(a[index]);
  };
}

console.time("6");
let closure = find();
closure(6);
console.timeEnd("6");

console.time("12");
closure(12);
console.timeEnd("12");

// Q2
function createBase(num) {
  return function addSix(val) {
    return num + val;
  };
}

var addSix = createBase(6);
console.log(addSix(10)); // 16
console.log(addSix(20)); // 26

// Q1;
let count = 0; // global scope
(function printCount() {
  if (count === 0) {
    let count = 1; // Shadowing (block)
    console.log(count); // 1
  }
  console.log(count); // 0
})();
