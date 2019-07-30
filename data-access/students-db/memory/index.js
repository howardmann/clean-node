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

let findStudentsBy = (prop, val) => {
  let student = STUDENTS.filter(student => student[prop] == val)
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

let deleteStudent = (id) => {
  return findStudent({id})
    .then(student => {
      if (student.id == id) {
        STUDENTS = STUDENTS.filter(student => student.serial != id)
        return {
          id,
          status: 'success'
        }
      }
      return {
        status: 'fail'
      }
    })
}

let dropAll = () => {
  STUDENTS = [];
  return STUDENTS;
}

module.exports = {
  listStudents,
  findStudent,
  findStudentsBy,
  addStudent,
  deleteStudent,
  dropAll
}
