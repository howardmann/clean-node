let chai = require('chai');
let expect = chai.expect;
let makeTeacher = require('./index')

describe('makeTeacher', () => {
  it('validates name (string:required), grade (number), age (number) and prefect (boolean)', () => {
    let errorMessage = [
      'must have name as string',
      'subject must be a string',
      'tenure must be a boolean'
    ].join('\n')

    expect(() => {
      makeTeacher({
        subject: 31,
        tenure: 12
      })
    }).to.throw(errorMessage)
  })
  it('must have name', () => {
    let teacher = makeTeacher({
      name: 'howie',
    })
    let input = teacher.getName()
    let actual = 'howie'
    expect(input).to.equal(actual)
  })
  it('can have subject', () => {
    let teacher = makeTeacher({
      name: 'howie',
      subject: 'maths'
    })
    let input = teacher.getSubject()
    let actual = 'maths'
    expect(input).to.equal(actual)
  })
  it('sets tenure to false by default', () => {
    let teacher = makeTeacher({
      name: 'howie'
    })
    let input = teacher.isTenure()
    let actual = false
    expect(input).to.equal(actual)
  })
})