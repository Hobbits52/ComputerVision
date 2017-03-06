import axios from 'axios';
// var request = require('request');
// var fs = require('fs');

// --------------------------------------------------------------------------
// HomeView Helpers
// --------------------------------------------------------------------------

exports.getAllTeachersClasses = () => {
  return axios.get('/api/getClasses', {
    params: {
      token: window.localStorage.token
    }
  }); 
};


exports.getAllStudentsInClass = (classId) => {
  return axios.get('api/allClassesStudents', {
    params: {
      class_Id: classId,
      token: window.localStorage.token
    }
  }); 
};

exports.getAllTestsInClass = (classId) => {
  return axios.get('/api/getTestsForClass', {
    params: {
      class_Id: classId,
      token: window.localStorage.token
    }
  }); 
};
 
exports.getAllStudentsWhoTookTest = (testId) => {
  return axios.get('api/allStudentsWhoTookTest', {
    params: {
      test_Id: testId,
      token: window.localStorage.token
    }
  }); 
};

exports.getKeysForClass = (classId) => {
  return axios.get('/api/getKeysForClass', {
    params: {
      class_Id: classId,
      token: window.localStorage.token
    }
  })
}


// Need one more function for getting most recent test results...

// --------------------------------------------------------------------------
// StudentsView Helpers
// --------------------------------------------------------------------------

exports.getAllStudents = (teacherId) => {
  return axios.get('/api/getStudentsByClass', {
    params: {
      // I might need to change the property names here?
      teacher_id: teacherId,
      token: window.localStorage.token
    }
  }); 
};

// --------------------------------------------------------------------------
// Retrieving Key Image
// --------------------------------------------------------------------------

//storing the image so we are not storing the url
// exports.getImage = ()

