let teachersDb = require('../../../data-access/teachers-db')

let teachers = module.exports = {}

teachers.index = (req, res, next) => {
  teachersDb.listTeachers()
    .then(data => {
      res.send(data)
    })
}

teachers.show = (req, res, next) => {
  teachersDb.findTeacher('id', req.params.id)
    .then(data => {
      res.send(data)
    })
}

teachers.create = (req, res, next) => {
  teachersDb.addTeacher(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}