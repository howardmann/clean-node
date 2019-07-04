let studentsDb = require('../../../data-access/students-db')

let students = module.exports = {}

students.index = (req, res, next) => {
  studentsDb.listStudents()
    .then(data => {
      res.send(data)
    })
}

students.show = (req, res, next) => {
  studentsDb.findStudent('id', req.params.id)
    .then(data => {
      res.send(data)
    })
}

students.create = (req, res, next) => {
  studentsDb.addStudent(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}