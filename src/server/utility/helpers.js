exports.compareArrays = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }
  return array1.reduce((acc, val, index) => {
    return acc && val === array2[index];
  }, true);
};

exports.calculateResult = (studentAnswers, keyAnswers, cb) => {
  let amountPossible = 0;
  for (let key in keyAnswers) {
    if (keyAnswers[key].length > 0) {
      amountPossible++;
    }
  }

  let amountCorrect = 0;
  for (let key in studentAnswers) {
    if (keyAnswers[key].length > 0 && exports.compareArrays(studentAnswers[key], keyAnswers[key])) {
      amountCorrect++;
    }
  }

  //round to two decimal places
  let percentage = Math.round((amountCorrect/amountPossible) * 100) / 100
  cb(percentage);
};