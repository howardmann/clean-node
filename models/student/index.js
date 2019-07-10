let buildMakeStudent = require('./student')
let {studentValidator} = require('../../validator')

let makeStudent = buildMakeStudent(studentValidator)

module.exports = makeStudent

// let howie = makeStudent({name: 'howie'})
// howie //?