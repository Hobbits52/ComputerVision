const fs = require('fs');


// Number of data points for the chart
// const numDataPoints = 1000;

// // Returns a pair of random gaussian numbers
// const randomGaussNum = (mu, sigma) => {
//   // Generate pair of independent random uniformly distributed variables
//   // within interval (0,1).
//   let u1 = Math.random();
//   let u2 = Math.random();

//   // Transform u1 and u2 to independent random variables with a standard 
//   // normal distribution.
//   let z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
//   let z1 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);

//   // Transform standard normal deviate, z0, to a value within a normal
//   // distribution with mean, mu, and standard deviation, sigma.
//   return z0 * sigma + mu;
// }

// // Creates an array of random normally distrubted test scores with mean, mu,
// // and standard deviation, sigma.
// const randomGaussDataSet = (mu, sigma) => {
//   console.log('From CHART: ', Array.apply(null, {length: numDataPoints}).map(() => randomGaussNum(mu, sigma)));
//   return Array.apply(null, {length: numDataPoints}).map(() => randomGaussNum(mu, sigma));
// }

// fs.writeFile('./testScore.json', JSON.stringify({'answers': randomGaussDataSet(72, 4)}));


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const generateStudentAnswers = function() {
//   var answerKey = {"1":["a"],"2":["c"],"3":["b"],"4":["d"],"5":["d"],"6":["c"],"7":["d"],"8":["b"],"9":["c"],"10":["c"],"11":[
//   "a"],"12":["d"],"13":["d"],"14":["c","e"],"15":["a"],"16":["a"],"17":["d"],"18":["d"],"19":["e"],"20":["c"],"21":["a"],"22"
//   :["c"],"23":["c"],"24":["b"],"25":["d"],"26":["c"],"27":["d"],"28":["e"]};

//   var studentScore = require('./testScore.json');
//   var studentAnswers = {};
//   studentAnswers.answers = [];
//   var studentScores = studentScore.answers;

//   for (var i = 0; i < 1000; i++) {
//     var studentAnswer = Object.assign({}, answerKey);
//     var numWrong = Math.floor(((100 - studentScores[i])/100) * 28);
//     var changed = {};
//     while (numWrong > 0) {
//       var possible = ['a', 'b', 'c', 'd', 'e'];
//       var questNum = Math.floor(Math.random() * 28);
//       if (changed[questNum] === undefined) {
//         changed[questNum] = questNum;
//         for (var j = 0; j < possible.length; j++) {
//           if (possible[j] !== studentAnswer[questNum]) {
//             studentAnswer[questNum] = [possible[j]];
//             numWrong--;
//             j = 1000;
//           }
//         }
//       }
//       if (numWrong === 0) {
//         studentAnswers.answers.push(studentAnswer);
//       }
//     }
//     if (i === 999) {
//       var answer = JSON.stringify(studentAnswers);
//       fs.writeFile('./studentAnswers.json', answer);
//     }
//   }
// }
//  generateStudentAnswers();

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const generateTestData = function() {
//   const TestCon = require('./test/testController.js');
//   var tests = require('./studentAnswers.json').answers;
//   var testData = {};
//   var url = "http://res.cloudinary.com/dn4vqx2gu/image/upload/v1488672122/rzcckliek05taq6a2pul.jpg";

//   for (var i = 0; i < tests.length; i++) {
//     var temp = {};
//     temp.answerkeyId = 4;
//     temp.URL = url;
//     temp.StudentId = i;
//     temp.ClassId = 5; 
//     temp.answers = JSON.stringify(tests[i]);
//     TestCon.addTest(temp, function(err, data) {
//       if (err) {
//         console.log('FAIL ' + err);
//       } else {
//         console.log('SUCCESS');
//       }
//     });
//   };
// };

// generateTestData();
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var students = require('./studentJSON.json');
console.log(students.length);