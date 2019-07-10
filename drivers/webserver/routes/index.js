const express = require('express')
const router = express.Router()

const students = require('./students')
const teachers = require('./teachers')

router
  .get('/students', students.index)
  .get('/students/:id', students.show)
  .post('/students', students.create)

router
  .get('/teachers', teachers.index)
  .get('/teachers/:id', teachers.show)
  .post('/teachers', teachers.create)
  

module.exports = router