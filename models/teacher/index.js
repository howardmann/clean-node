let buildMakeTeacher = require('./teacher')
let {
  teacherValidator
} = require('../../validator')

let makeTeacher = buildMakeTeacher(teacherValidator)

module.exports = makeTeacher

// let robert = makeTeacher({name: 'robert frost', subject: 12})
// robert //?