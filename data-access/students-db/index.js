// let {
//   listStudents,
//   findStudent,
//   findStudentsBy,
//   addStudent,
//   deleteStudent,
//   dropAll
// } = require('./memory/index') // switch out db as required

let {
  listStudents,
  findStudent,
  findStudentsBy,
  addStudent,
  deleteStudent,
  dropAll
} = require('./mongod/index')

let studentsDb = {
  listStudents,
  findStudent,
  findStudentsBy,
  addStudent,
  deleteStudent,
  dropAll
}

module.exports = studentsDb
