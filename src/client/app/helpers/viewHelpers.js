import axios from 'axios';

// --------------------------------------------------------------------------
// HomeView Helpers
// --------------------------------------------------------------------------

exports.getAllTeachersClasses = (teacherId) => {
  return axios.get('api/allTeachersClasses', {
    params: {
      // I might need to change the property names here?
      teacher_id: teacherId
    }
  }); 
};

// --------------------------------------------------------------------------
// Example Route for this axios request:
// --------------------------------------------------------------------------
// In a file called dataRoutes.js, provide me the following route:
// 
// router.get('/allTeachersClasses', controller.classes.getAll);
// --------------------------------------------------------------------------
// 
// --------------------------------------------------------------------------
// Example Controller for this route:
// --------------------------------------------------------------------------
// In a file called dataControllers.js, provide the following function:
// 
// THIS EXAMPLE IS IN KNEX, NOT SEQUELIZE!!!!
// 
// ...but same idea!
// 
// classes: {   
//   getAll: function(req, res) {
//     console.log(req.query);
//     var teacher_id = req.query.teacher_id;
//     knex('Teachers')
//       .select('*')
//       .where('teacher_id', '=', teacher_id)
//       .then(function(data){
//         res.send(data);
//       })
//   },
//   nextFunctionUnderClasses: function(req, res) {},
//   etc: function(req, res) {}
// }
// 
// 
// --------------------------------------------------------------------------

exports.getAllStudentsInClass = (classId) => {
  return axios.get('api/allClassesStudents', {
    params: {
      class_Id: classId,
      token: window.localStorage.token
    }
  }); 
};

// router.get('/allClassesStudents', controller.students.getAll);

exports.getAllTestsInClass = (classId) => {
  return axios.get('api/allClassesTests', {
    params: {
      class_Id: classId,
      token: window.localStorage.token
    }
  }); 
};

// router.get('/allClassesTests', controller.tests.getAll);

exports.getAllStudentsWhoTookTest = (testId) => {
  return axios.get('api/allStudentsWhoTookTest', {
    params: {
      test_Id: testId,
      token: window.localStorage.token
    }
  }); 
};


// Need one more function for getting most recent test results...


// Other Model Requests:

// exports.getTeachersClasses = (teacherId) => {
//   return axios.get('teacher/teachersClasses');
// };

// exports.addSomeKindOfData = (dataToAdd) => {
//   return axios({
//     method: 'POST',
//     url: 'teacher/emotionalStateData',
//     data: emotionalStateEntry
//   });
// };

// --------------------------------------------------------------------------
// StudentsView Helpers
// --------------------------------------------------------------------------

exports.getAllStudents = (teacherId) => {
  return axios.get('/api/getAllStudents', {
    params: {
      // I might need to change the property names here?
      teacher_id: teacherId,
      token: window.localStorage.token
    }
  }); 
};