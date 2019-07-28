let chai = require('chai');
let expect = chai.expect;
let validator = require('./index')
let studentSchema = require('../student/student-schema')
let studentValidator = validator(studentSchema)
let teacherSchema = require('../teacher/teacher-schema')
let teacherValidator = validator(teacherSchema)

describe('validators', () => {
  describe('studentValidator', () => {
    it('validates name:string:required, grade:number, age:number, prefect:boolean', () => {
      let validPayload = {
        name: 'howie',
        grade: 12,
        age: 17,
        prefect: false
      }
      let input = studentValidator(validPayload)
      let actual = true
      expect(input).to.equal(actual)
    })

    it('returns error messages if invalid', () => {
      let invalidPayload = {
        grade: 'twelve',
        age: null,
        prefect: 1,
        secret: 'boom'
      }
      let input = studentValidator(invalidPayload)
      let errorMessage = [
        'must have name as string',
        'age must be a number',
        'grade must be a number',
        'prefect must be a boolean',
        '"secret" is not allowed'
      ].join('\n')

      let actual = {
        error: errorMessage
      }

      expect(input).to.eql(actual)
    })
  })

  describe('teacherValidator', () => {
    it('validates name:string:required, subject:string, tenure:boolean', () => {
      let validPayload = {
        name: 'Mr brown',
        subject: 'History',
        tenure: true
      }
      let input = teacherValidator(validPayload)
      let actual = true
      expect(input).to.equal(actual)
    })

    it('returns error messages if invalid', () => {
      let invalidPayload = {
        subject: 1,
        tenure: null,
        secret: 'boom'
      }
      let input = teacherValidator(invalidPayload)
      let errorMessage = [
        'must have name as string',
        'subject must be a string',
        'tenure must be a boolean',
        '"secret" is not allowed'
      ].join('\n')

      let actual = {
        error: errorMessage
      }

      expect(input).to.eql(actual)
    })


  })
})
