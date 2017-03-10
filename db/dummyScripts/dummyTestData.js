const generateTestData = function() {
  const TestCon = require('./../test/testController.js');
  var tests = require('./studentAnswers.json').answers;
  var testData = {};
  var url = "http://res.cloudinary.com/dn4vqx2gu/image/upload/v1488672122/rzcckliek05taq6a2pul.jpg";
  var examCount = 0;
  var loopcount = 0;

  const loopExams = function(examCount) {
  	var exam = tests[examCount].tests;
  	var testCount = 0;
  	const loopTests = function(examCount, testCount) {
  		loopcount++;
  		var temp = {};
  		temp.answerkeyId = examCount + 1;
  		temp.URL = url;
  		temp.StudentId = testCount + 1;
  		temp.ClassId = 1;
  		temp.answers = JSON.stringify(exam[testCount]);

  		TestCon.addTest(temp, function(err, data) {
  			if (err) {
  				testCount = exam.length - 1;
  				examCount = tests.length - 1;
  				console.log('FAIL*****************', err);
  			} else {
  				console.log('SUCCESS');
  			}
  			testCount++;
  			if (testCount === exam.length) {
  				console.log(testCount);
  				examCount++;
  				console.log(examCount);
  				if (examCount === 4) {
  					console.log('**********COMPLETE**********');
  					console.log(loopcount);
  					return;
  				} else {
  					loopExams(examCount);
  				}
  			} else {
  				loopTests(examCount, testCount);
  			}
  		});
  	};
  	loopTests(examCount, testCount);
  };

  loopExams(examCount);
};

generateTestData();