// const fs = require('fs');
// var a = '{"1":["a"],"2":["c"],"3":["b"],"4":["d"],"5":["d"],"6":["c"],"7":["d"],"8":["b"],"9":["c"],"10":["c"],"11":["a"],"12":["d"],"13":["d"],"14":["c","e"],"15":["a"],"16":["a"],"17":["d"],"18":["d"],"19":["e"],"20":["c"],"21":["a"],"22":["c"],"23":["c"],"24":["b"],"25":["d"],"26":["c"],"27":["d"],"28":["e"]}';
// var b = '{"1":["b"],"2":["e"],"3":["a"],"4":["c"],"5":["c"],"6":["a"],"7":["e"],"8":["a"],"9":["a"],"10":["d"],"11":["e"],"12":["b"],"13":["e"],"14":["a","d"],"15":["e"],"16":["a"],"17":["a"],"18":["a"],"19":["b"],"20":["d"],"21":["d"],"22":["b"],"23":["e"],"24":["d"],"25":["c"],"26":["a"],"27":["e"],"28":["b"]}';
// var c = '{"1":["b"],"2":["c"],"3":["c"],"4":["e"],"5":["e"],"6":["d"],"7":["c"],"8":["c"],"9":["e"],"10":["b"],"11":["a"],"12":["d"],"13":["a"],"14":["c","c"],"15":["c"],"16":["a"],"17":["e"],"18":["e"],"19":["b"],"20":["a"],"21":["a"],"22":["d"],"23":["e"],"24":["a"],"25":["e"],"26":["d"],"27":["c"],"28":["e"]}';
// var d = '{"1":["a"],"2":["d"],"3":["b"],"4":["a"],"5":["a"],"6":["a"],"7":["d"],"8":["c"],"9":["c"],"10":["c"],"11":["b"],"12":["e"],"13":["e"],"14":["c","e"],"15":["b"],"16":["a"],"17":["a"],"18":["d"],"19":["c"],"20":["e"],"21":["c"],"22":["a"],"23":["c"],"24":["e"],"25":["b"],"26":["a"],"27":["d"],"28":["e"]}';
// var arr = [a, b, c, d];
// var names = ['Precourse', 'Midterm 1', 'Midterm 2', 'Final'];

// var keyObj = {};
// keyObj.keys = [];

// for (var i = 0; i < arr.length; i++) {
// 	var temp = {};
// 	temp.keyName = names[i];
// 	temp.URL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1488672122/rzcckliek05taq6a2pul.jpg';
// 	temp.answers = arr[i];
// 	temp.ClassId = 1;
// 	temp.TeacherId = 1;
// 	keyObj.keys.push(temp);
// 	if (i === arr.length - 1) {
// 		fs.writeFile('./answerKey.json', JSON.stringify(keyObj));
// 	}
// }


// Number of data points for the chart
// const numDataPoints = 1000;

// // // // Returns a pair of random gaussian numbers
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

// var distArr = [{mean: 81, sd: 4}, {mean: 65, sd: 6}, {mean: 68, sd: 4}, {mean: 73, sd: 8}];
// var testData = [];
// var count = 0;

// var test = function() {
// 	var data = randomGaussDataSet(distArr[count].mean, distArr[count].sd);
// 	testData.push(data);
// 	count++;
// 	if (count === distArr.length) {
// 		fs.writeFile('./testScore.json', JSON.stringify({'answers': testData}));
// 	} else if (count < distArr.length) {
// 		test();
// 	}
// };

// test();


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const generateStudentAnswers = function() {
//   var answerKeys = require('./answerKey.json').keys;
//   var studentScores = require('./testScore.json').answers;
//   var classAnswers = {};
//   classAnswers.answers = [];
//   var count = 0;
//  	var test = function() {
//  		var studentAnswers = {};
//  		studentAnswers.testName = answerKeys[count].keyName;
//  		studentAnswers.tests = [];
//  		var answerKey = answerKeys[count];
//  		for (var i = 0; i < 1000; i++) {
//  			var studentAnswer = Object.assign({}, JSON.parse(answerKeys[count].answers));
//  			var numWrong = Math.floor(((100 - studentScores[count][i])/100) * 28);
//  			var changed = {};
//  			while (numWrong > 0) {
//  				var possible = ['a', 'b', 'c', 'd', 'e'];
//  				var questNum = Math.ceil(Math.random() * 28);
//  				if (changed[questNum] === undefined) {
//  					changed[questNum] = questNum;
//  					var newAnswer = function() {
//  						var num = Math.floor(Math.random() * 4.9);
//  						if (possible[num] !== studentAnswer[questNum]) {
//  							studentAnswer[questNum] = [possible[num]];
//  							numWrong--;
//  						} else {
//  							newAnswer();
//  						}
//  					}
//  					newAnswer();
//  					// for (var j = 0; j < possible.length; j++) {
//  					// 	if (possible[j] !== studentAnswer[questNum]) {
//  					// 		studentAnswer[questNum] = [possible[j]];
//  					// 		numWrong--;
//  					// 		j = 1000;
//  					// 	}
//  					// }
//  				}
//  				if (numWrong === 0) {
//  					studentAnswers.tests.push(studentAnswer);
//  					if (i === 999) {
// 	 					classAnswers.answers.push(studentAnswers);
// 	 					count++;
// 		 				if (count === answerKeys.length) {
// 		 					fs.writeFile('./studentAnswers.json', JSON.stringify(classAnswers));
// 		 				} else if (count < answerKeys.length) {
// 		 					test();
// 		 				}
// 		 			}
//  				}
//  			}
//  		}
//  	}
//  	test();
// }

// generateStudentAnswers();

// var test = require('./studentAnswers.json').answers;
// console.log(test.length);