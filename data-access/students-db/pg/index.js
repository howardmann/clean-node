let knex = require('../../../db/pg/knex')
let makeStudent = require('../../../models/student/index') // model

let listStudents = () => {
  return knex.raw(`SELECT * FROM students;`)
    .then(data => data.rows)
}

let findStudent = (prop, val) => {
  return knex.raw(`
    SELECT * FROM students WHERE ${prop}= '${val}'
  `)
    .then(data => data.rows[0])
}

let findStudentsBy = (prop, val) => {
  return knex.raw(`
    SELECT * FROM students WHERE ${prop}= '${val}'
  `)
    .then(data => data.rows)
}

let addStudent = (studentInfo) => {
  let student = makeStudent(studentInfo)
  let newStudent = {
    name: student.getName(),
    grade: student.getGrade(),
    age: student.getAge(),
    prefect: student.isPrefect()
  }
  return knex('students')
    .insert(newStudent)
    .returning('*')
    .then(result => result[0])
}

let deleteStudent = (id) => {
  return knex('students')
    .where('id', id)
    .del()
    .then(resp => {
      if(resp == 1) {
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
  return knex.raw(`
    DELETE FROM students;
    ALTER SEQUENCE students_id_seq RESTART WITH 1;
  `)
}

module.exports = {
  listStudents,
  findStudent,
  findStudentsBy,
  addStudent,
  deleteStudent,
  dropAll
}