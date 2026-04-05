let arr = [1, 2, 3, 4];

let mapResult = arr.map((num, ind, arr) => {});

// polyfill for map

Array.prototype.myMap = function (callback) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    temp.push(callback(this[i]));
  }
  return temp;
};

let myMapResult = arr.myMap((x) => x * 5);

// polyfill for filter

let filterResult = arr.filter((val, idx, arr) => val > 2);

Array.prototype.myFilter = function (callback) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      temp.push(this[i]);
    }
  }
  return temp;
};

let myFilterResult = arr.myFilter((val, idx, arr) => val > 2);

// polyfill for reduce

let reduceResult = arr.reduce((acc, curr, index, array) => {
  return acc + curr;
}, 0);

Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue;

  for (let i = 0; i < this.length; i++) {
    accumulator = accumulator
      ? callback(accumulator, this[i], i, this)
      : this[i];
  }
  return accumulator;
};

let myReduceResult = arr.myReduce((acc, curr, index, arr) => acc + curr);

// map, filter and reduce O/P Based Questions
// Question 1 - Return only name of students in Capital
// Question 2 - Return only details of those who scored more than 60 marks
// Question 3 - More than 60 marks and rollNumber greater than 15
// Question 4 - Sum of marks of all students
// Question 5 - Return only names of students who scored more than 60
// Question 6 - Return total marks for students with marks grater than 60 after 20 marks have been added to those who scored less than 60

let students = [
  { name: "Piyush", rollNumber: 31, marks: 80 },
  { name: "Jenny", rollNumber: 15, marks: 69 },
  { name: "Kaushal", rollNumber: 16, marks: 35 },
  { name: "Dilpreet", rollNumber: 7, marks: 55 },
];

let q1 = students.map((student) => student.name.toUpperCase());

let q2 = students.filter((student) => student.marks > 60);

let q3 = students.filter(
  (student) => student.marks > 60 && student.rollNumber > 15,
);

let q4 = students.reduce((acc, curr) => (acc = acc + curr.marks), 0);

let q5 = students
  .filter((student) => student.marks > 60)
  .map((student) => student.name);

let q6 = students
  .map((student) => {
    if (student.marks < 60) {
      student.marks += 20;
    }
    return student;
  })
  .filter((student) => student.marks > 60)
  .reduce((acc, curr) => acc + curr.marks, 0);

console.log(q6);
