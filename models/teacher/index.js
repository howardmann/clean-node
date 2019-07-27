let buildMakeTeacher = require('./teacher')
let teacherSchema = require('./teacher-schema')
let teacherValidator = require('../validator')(teacherSchema)
// let {
//   teacherValidator
// } = require('../../validator')

let makeTeacher = buildMakeTeacher(teacherValidator)

module.exports = makeTeacher

