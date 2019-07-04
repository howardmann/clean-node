let {
  listStudents,
  findStudent,
  addStudent
} = require('./memory/index') // switch out db as required

let studentsDb = {
  listStudents,
  findStudent,
  addStudent
}

module.exports = studentsDb
