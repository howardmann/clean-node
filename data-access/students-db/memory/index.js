let STUDENTS = require('../../../db/memory/students') // DB
let makeStudent = require('../../../models/student/index') // model
let serialize = require('./serializer') // serializer custom to db

let listStudents = () => {
  return Promise.resolve(serialize(STUDENTS))
}

let findStudent = (prop, val) => {
  if (prop === 'id') { prop = 'serial' }
  let student = STUDENTS.find(student => student[prop] == val)
  return Promise.resolve(serialize(student))
}

let addStudent = (studentInfo) => {
  let student = makeStudent(studentInfo)
  let newStudent = {
    serial: STUDENTS.length + 1,
    year: student.getGrade(),
    name: student.getName(),
    age: student.getAge(),
    prefect: student.isPrefect()
  }
  STUDENTS.push(newStudent)
  return findStudent('serial', newStudent.serial)
}

module.exports = {
  listStudents,
  findStudent,
  addStudent
}

// let students = listStudents() //?
// let howie = findStudent('id', 1) //?
// addStudent({
//   name: 12,
//   age: 21,
//   grade: 1
// }) //?

// listStudents() //?
