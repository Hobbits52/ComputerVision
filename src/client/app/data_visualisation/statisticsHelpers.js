import { getAllTestFromClass } from '../helpers/viewHelpers.js';

var allTestsFromClass = getAllTestsFromClass(1);
console.log(allTestsFromClass);

var master = {};

for (var key in allTestsInClass.answerKeys) {
  master[key] = {id: key,
                 name: key,  // This will be name in the future. 
                 correctAnswers: JSON.parse(allTestsInClass.answerKeys[key]),
                 studentAnswers: []
                });
};

allTestsInClass.students.forEach(function(student) {
  var studentId = student.StudentId;
  var studentName = student.StudentName;

  student.tests.forEach(function(item) {
    var test = {};
    // test.testId = item.id;
    test.studentId = studentId;
    test.studentName = studentName;
    test.studentScore = item.result;
    test.studentAnswers = JSON.parse(item.studentAnswers);
    test.imageUrl = item.URL;

    master.forEach(function(exam) {
      if (item.id === exam.id) {
        exam.studentAnswers.push(test);
      }
    });
  });
});


// --------------------------------------------------------------------------------
// All Students' Results from a Single Exam
// --------------------------------------------------------------------------------
var allStudentResults =
  [
    {student: {id: 123456, name: 'Anthony Pecchillo'},
     answers: [ [A], [B], [C,D], [E], [D], [C], [A,B], [B], [A], [D] ],
     score: 95
    },
    {student: {id: 234567, name: 'Benze Gong'},
     answers: [ [D], [C], [A,B], [B], [A], [D], [C,E], [C], [C], [E] ],
     score: 95
    },
    {student: {id: 345678, name: 'Cynthia Bathgate'},
     answers: [ [A], [D], [C,E], [C], [C], [E], [A,B], [B], [A], [D] ],
     score: 95
    },
    {student: {id: 456789, name: 'Kevin Gin'},
     answers: [ [A], [D], [C,E], [C], [C], [E], [A,B], [B], [A], [D] ],
     score: 95
    }
  ]

// --------------------------------------------------------------------------------
// Answer Key from a Single Exam
// --------------------------------------------------------------------------------
var answerKey = [ [A], [B], [C,D], [E], [D], [C], [A,B], [B], [A], [D] ]





// --------------------------------------------------------------------------------
// Formulas for Statistical Variables:
// --------------------------------------------------------------------------------

// Sum
const sum = (arrayOfGrades) => d3.sum(arrayOfGrades, 'Accessor Function Here!');

// Mean
const mean = (arrayOfGrades) => d3.mean(arrayOfGrades, 'Accessor Function Here!');

// Median
const median = (arrayOfGrades) => d3.median(arrayOfGrades, 'Accessor Function Here!');

// Standard Deviation
const stdDev = (arrayOfGrades) => d3.deviation(arrayOfGrades, 'Acessore Function Here!');

// Variance
const variance = (arrayOfGrades) => d3.variance(arrayOfGrades, 'Acessore Function Here!');

// Quantiles, where p is a number in the range [0, 1].  
const quantile = (arrayOfGrades) => d3.quantile(arrayOfGrades, p, 'Acessore Function Here!');
// Example: p = 0.25 is the first quantile, Q1.  
//          p = 0.75 is the third quantile, Q3.


// Test Item Difficulty
const singleItemDifficulty = (arrayIndivQuesScores) => mean(arrayIndivQuesScores) / arrayIndivQuesScores.length;

// Test Difficulty

const testDifficulty = ()







// Reliability Coeffecient (Chronbach's Alpha)
const alpha = (k, arrayOfArraysOfStudentAnswers, arrayOfGrades) => {'sttuffff'};
// alpha = (k / (k - 1)) * (1 - (sum( sigma2(arrayOfGradesForSignleTestItem))) / sigma2(arrayOfExamGrades) )























