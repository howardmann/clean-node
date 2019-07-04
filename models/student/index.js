let buildMakeStudent = require('./student')
let studentSchema = require('./student-schema')

let makeStudent = buildMakeStudent({
  schema: studentSchema
})

module.exports = makeStudent

// let howie = makeStudent({name: 'howie'})
// howie //?