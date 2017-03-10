import { getAllTestsInClass } from '../helpers/viewHelpers.js';
import * as d3 from "d3";

var objToArray = function(obj) {
  return Object.keys(obj).map(function(key) {
    return obj[key];
  });
};

exports.processData = function(classId) {
  return getAllTestsInClass(classId).then(function(allTestsFromClass) {
    var allTestData = {};
    // console.log('allTestsFromClass: ', allTestsFromClass);

    for (var key in allTestsFromClass.data[0].answerKeys) {     
      allTestData[key] = {id: allTestsFromClass.data[0].answerKeys[key].keyId,
                          name: allTestsFromClass.data[0].answerKeys[key].keyName,  // This will be name in the future. 
                          correctAnswers: objToArray(JSON.parse(allTestsFromClass.data[0].answerKeys[key].answers)),
                          studentTestResults: [],
                          studentTestScores: []
                         };
    };

    allTestsFromClass.data[0].students.forEach(function(student) {
      var studentId = student.StudentId;
      var studentName = student.StudentName;

      student.tests.forEach(function(item) {
        var test = {};
        // test.testId = item.id;
        test.student = {id: studentId, name: studentName};
        test.studentScore = Math.round(item.result * 100);
        test.studentAnswers = objToArray(JSON.parse(item.studentAnswers));
        test.imageUrl = item.URL;
        test.answerKeyId = item.answerKeyId;

        for (var key in allTestData) {
          if (Number(allTestData[key].id) === Number(test.answerKeyId)) {
            allTestData[key].studentTestResults.push(test);
            allTestData[key].studentTestScores.push(test.studentScore);
          }
        }
      });
    });
    // console.log('Final allTestData object after processing: ', allTestData);
    return allTestData;
  });
};

exports.prepStudentAnswersForTest = function(allTestData) {
  console.log('Im Inside prepStudentAnswersForTest and allTestData is: ', allTestData);
  return allTestData[0].studentTestResults.map(function(item) {
    return item.studentAnswers;
  });
}

// exports.getCorrectAnswerForTestQuestion = function(allTestData, testId, questionOfInterest) {
//   //        indexOfTestInfo
//   console.log('1: ', gaussData[testId - 1]);
//   console.log('2: ', gaussData[testId - 1].correctAnswers);
//   console.log('3: ', gaussData[testId - 1].correctAnswers[questionOfInterest - 1]);
//   return allTestData[testId - 1].correctAnswers[questionOfInterest - 1][0];
// }

exports.responseFrequency = function(studentAnswersForTest, questionOfInterest) {
  // console.log('studentAnswersForTest: ', studentAnswersForTest);

  var totalFrequencyCount = [];
  for (var i = 0; i < studentAnswersForTest[0].length; i++) {
    var singleFrequencyCount = [
      {name: 'A', value: 0}, 
      {name: 'B', value: 0}, 
      {name: 'C', value: 0}, 
      {name: 'D', value: 0}, 
      {name: 'E', value: 0}
    ];
    totalFrequencyCount[i] = singleFrequencyCount;
  }

  studentAnswersForTest.forEach(function(answerSet) {
    answerSet.forEach(function(answer, index) {
      if (answer[0] === 'a') {         // Maybe use .contains here instead for questions with more than one answer?
        totalFrequencyCount[index][0].value++;
      } else if (answer[0] === 'b') {  // Maybe use .contains here instead for questions with more than one answer?
        totalFrequencyCount[index][1].value++;
      } else if (answer[0] === 'c') {  // Maybe use .contains here instead for questions with more than one answer?
        totalFrequencyCount[index][2].value++;
      } else if (answer[0] === 'd') {  // Maybe use .contains here instead for questions with more than one answer?
        totalFrequencyCount[index][3].value++;
      } else if (answer[0] === 'e') {  // Maybe use .contains here instead for questions with more than one answer?
        totalFrequencyCount[index][4].value++;
      }
    });
  });
    // console.log('------', totalFrequencyCount);
  return totalFrequencyCount[questionOfInterest - 1];
}

// // --------------------------------------------------------------------------------
// // Formulas for Statistical Variables:
// // --------------------------------------------------------------------------------

// Sum
exports.sum = (arrayOfGrades) => d3.sum(arrayOfGrades, 'Accessor Function Here!');

// Mean
exports.mean = (arrayOfGrades) => d3.mean(arrayOfGrades);

// Median
exports.median = (arrayOfGrades) => d3.median(arrayOfGrades, 'Accessor Function Here!');

// Standard Deviation
exports.stdDev = (arrayOfGrades) => d3.deviation(arrayOfGrades);

// Variance
exports.variance = (arrayOfGrades) => d3.variance(arrayOfGrades, 'Acessore Function Here!');

// Quantiles, where p is a number in the range [0, 1].  
exports.quantile = (arrayOfGrades) => d3.quantile(arrayOfGrades, p, 'Acessore Function Here!');
// Example: p = 0.25 is the first quantile, Q1.  
//          p = 0.75 is the third quantile, Q3.


// Test Item Difficulty
exports.singleItemDifficulty = function(allTestData, testId, responseFrequency, studentAnswersForEntireTest, questionOfInterest) {
  // Assume item is worth 1 point.
  var fullScoreForItem = 1;
  // var fullScoreForItem = (1 / studentAnswersForEntireTest[0].length) * 100;
  console.log('Question of Interest: ', questionOfInterest);
  var correctChoice = allTestData[testId - 1].correctAnswers[questionOfInterest - 1][0];
  console.log('Correct Choice: ', correctChoice);
  
  var numIncorrect = responseFrequency.reduce(function(acc, curr) {
    if (curr.name.toLowerCase() !== correctChoice) {
      acc += curr.value;
    }
    return acc;
  }, 0);
  // console.log('Number Incorrect: ', numIncorrect);

  // Replace studentAnswersForEntireTest with responseFrequency!!!!
  var averageScoreForItem = (studentAnswersForEntireTest.length - numIncorrect) / studentAnswersForEntireTest.length;
  // console.log('averageScoreForItem: ', averageScoreForItem);
  var itemDifficulty = averageScoreForItem / fullScoreForItem;
  console.log('itemDifficulty #', questionOfInterest, ': ', itemDifficulty);

  return itemDifficulty;
}

const testDifficulty = function(allTestData, testId, studentAnswersForEntireTest) {
  var fullScoreForItem = 1;
  var sumSingleItems = 0;
  var totalPointsForTest = 28;
  console.log('studentAnswersForEntireTest: ', studentAnswersForEntireTest);
  
  for (var i = 1; i < studentAnswersForEntireTest[0].length; i++) {
    var respFreq2 = responseFrequency(studentAnswersForEntireTest, i);
    sumSingleItems += singleItemDifficulty(allTestData, testId, respFreq2, studentAnswersForEntireTest, i) * fullScoreForItem;
  }

  var totalDifficulty = (1 / totalPointsForTest) * sumSingleItems;

  return totalDifficulty;
}

// Reliability Coeffecient (Chronbach's Alpha)
exports.alpha = (k, arrayOfArraysOfStudentAnswers, arrayOfGrades) => {'sttuffff'};
// alpha = (k / (k - 1)) * (1 - (sum( sigma2(arrayOfGradesForSignleTestItem))) / sigma2(arrayOfExamGrades) )






























