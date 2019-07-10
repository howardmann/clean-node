let {studentValidator, teacherValidator} = require('./joi')
// let {studentValidator, teacherValidator} = require('./validatejs')


/*
  valid ? true : {error: [message]}
*/
let validator = {
  studentValidator: (payload) => studentValidator(payload),
  teacherValidator: (payload) => teacherValidator(payload)
}

module.exports = validator

// let student = {
//   name: 21
// }

// let result = validator.studentValidator(student) //?