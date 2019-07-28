let chai = require('chai');
let expect = chai.expect;
let makeStudent = require('./index')

describe('makeStudent', () => {
  it('throws error if invalid payload', () => {
    let errorMessage = [
      'must have name as string',
      'age must be a number',
      'grade must be a number',
      'prefect must be a boolean'
    ].join('\n')

    expect(() => {
      makeStudent({
        grade: 'twelve',
        age: 'twleve',
        prefect: 12
      })
    }).to.throw(errorMessage)
  })
  it('must have name', () => {
    let student = makeStudent({
      name: 'howie',
    })
    let input = student.getName()
    let actual = 'howie'
    expect(input).to.equal(actual)
  })
  it('can have grade', () => {
    let student = makeStudent({name: 'howie', grade: 2})
    let input = student.getGrade()
    let actual = 2
    expect(input).to.equal(actual)
  })
  it('can have age', () => {
    let student = makeStudent({name: 'howie', age: 12})
    let input = student.getAge()
    let actual = 12
    expect(input).to.equal(actual)
  })
  it('sets prefect to false by default', () => {
    let student = makeStudent({name: 'howie'})
    let input = student.isPrefect()
    let actual = false
    expect(input).to.equal(actual)
  })
})