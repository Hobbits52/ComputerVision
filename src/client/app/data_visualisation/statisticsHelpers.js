import { getAllTestsInClass } from '../helpers/viewHelpers.js';

var objToArray = function(obj) {
  return Object.keys(obj).map(function(key) {
    return obj[key];
  });
};

exports.processData = function(classId) {
  return getAllTestsInClass(classId).then(function(allTestsFromClass) {
    var allTestData = {};
    console.log('allTestsFromClass: ', allTestsFromClass);

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
    console.log('Final allTestData object after processing: ', allTestData);
    return allTestData;
  });
};

exports.prepStudentAnswersForTest = function(allTestData) {
  console.log('Im Inside prepStudentAnswersForTest and allTestData is: ', allTestData);
  return allTestData[0].studentTestResults.map(function(item) {
    return item.studentAnswers;
  });
}

exports.responseFrequency = function(studentAnswersForTest) {
  console.log('studentAnswersForTest: ', studentAnswersForTest);

  var totalFrequencyCount = [];
  console.log('CYNTHIA: ', studentAnswersForTest);
  for (var i = 0; i < studentAnswersForTest[0].length; i++) {
    var singleFrequencyCount = {a: 0, b: 0, c: 0, d: 0, e: 0};
    totalFrequencyCount[i] = singleFrequencyCount;
  }

  studentAnswersForTest.forEach(function(answerSet) {
    answerSet.forEach(function(answer, index) {
      if (answer[0] === 'a') {         // Maybe use .contains here instead for questions with more than one answer?
        totalFrequencyCount[index]['a']++;
        if (index === 1 && answer[0] === 'a') { console.log('KSJDHFKSJDHF: ', totalFrequencyCount[index]); }
      } else if (answer[0] === 'b') {  // Maybe use .contains here instead for questions with more than one answer?
        totalFrequencyCount[index]['b']++;
      } else if (answer[0] === 'c') {  // Maybe use .contains here instead for questions with more than one answer?
        totalFrequencyCount[index]['c']++;
      } else if (answer[0] === 'd') {  // Maybe use .contains here instead for questions with more than one answer?
        totalFrequencyCount[index]['d']++;
      } else if (answer[0] === 'e') {  // Maybe use .contains here instead for questions with more than one answer?
        totalFrequencyCount[index]['e']++;
      }
    });
  });
    // console.log('------', totalFrequencyCount);
  return totalFrequencyCount;
}

// // --------------------------------------------------------------------------------
// // Formulas for Statistical Variables:
// // --------------------------------------------------------------------------------

// // Sum
// const sum = (arrayOfGrades) => d3.sum(arrayOfGrades, 'Accessor Function Here!');

// // Mean
// const mean = (arrayOfGrades) => d3.mean(arrayOfGrades, 'Accessor Function Here!');

// // Median
// const median = (arrayOfGrades) => d3.median(arrayOfGrades, 'Accessor Function Here!');

// // Standard Deviation
// const stdDev = (arrayOfGrades) => d3.deviation(arrayOfGrades, 'Acessore Function Here!');

// // Variance
// const variance = (arrayOfGrades) => d3.variance(arrayOfGrades, 'Acessore Function Here!');

// // Quantiles, where p is a number in the range [0, 1].  
// const quantile = (arrayOfGrades) => d3.quantile(arrayOfGrades, p, 'Acessore Function Here!');
// // Example: p = 0.25 is the first quantile, Q1.  
// //          p = 0.75 is the third quantile, Q3.


// // Test Item Difficulty
// const singleItemDifficulty = (arrayIndivQuesScores) => mean(arrayIndivQuesScores) / arrayIndivQuesScores.length;

// // Test Difficulty

// const testDifficulty = ()

// // Reliability Coeffecient (Chronbach's Alpha)
// const alpha = (k, arrayOfArraysOfStudentAnswers, arrayOfGrades) => {'sttuffff'};
// // alpha = (k / (k - 1)) * (1 - (sum( sigma2(arrayOfGradesForSignleTestItem))) / sigma2(arrayOfExamGrades) )
