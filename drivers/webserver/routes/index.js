const express = require('express')
const router = express.Router()

const students = require('./students')

router
  .get('/students', students.index)
  .get('/students/:id', students.show)
  .post('/students', students.create)

module.exports = router