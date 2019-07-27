let buildMakeStudent = require('./student')
let studentSchema = require('./student-schema')
// let {studentValidator} = require('../../validator')
let studentValidator = require('../validator/')(studentSchema)

let makeStudent = buildMakeStudent(studentValidator)

module.exports = makeStudent

