let Joi = require('joi')
let studentSchema = require('./student-schema')
let teacherSchema = require('./teacher-schema')

let JoiValidator = (payload, schema) => {
  let {error} = Joi.validate(payload, schema, {abortEarly: false})
  if (error) {
    let message = error.details.map(el => el.message).join('\n')
    return {
      error: message
    }
  }
  return true
}

let validator = {
  studentValidator: (payload) => JoiValidator(payload, studentSchema),
  teacherValidator: (payload) => JoiValidator(payload, teacherSchema)
}

module.exports = validator