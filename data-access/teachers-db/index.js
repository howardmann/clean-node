let {
  listTeachers,
  findTeacher,
  addTeacher
} = require('./memory/index') // switch out db as required

let teachersDb = {
  listTeachers,
  findTeacher,
  addTeacher
}

module.exports = teachersDb
