let TEACHERS = require('../../../db/memory/teachers') // DB
let makeTeacher = require('../../../models/teacher/index') // model
let serialize = require('./serializer') // serializer custom to db

let listTeachers = () => {
  return Promise.resolve(serialize(TEACHERS))
}

let findTeacher = (prop, val) => {
  if (prop === 'id') {
    prop = 'serial'
  }
  let teacher = TEACHERS.find(teacher => teacher[prop] == val)
  return Promise.resolve(serialize(teacher))
}

let addTeacher = (teacherInfo) => {
  let teacher = makeTeacher(teacherInfo)
  let newTeacher = {
    serial: TEACHERS.length + 1,
    class: teacher.getSubject(),
    tenure: teacher.isTenure()
  }
  TEACHERS.push(newTeacher)
  return findTeacher('serial', newTeacher.serial)
}

module.exports = {
  listTeachers,
  findTeacher,
  addTeacher
}

// let teachers = listTeachers() //?
// let bob = findTeacher('id', 1) //?
// addTeacher({
//   name: 'bill',
//   subject: 'boom',
//   grade: 1
// }) //?

// listTeachers() //?
