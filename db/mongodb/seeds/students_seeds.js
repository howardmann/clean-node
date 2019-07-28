let mongoose = require('mongoose')
let Student = require('../models/student')

// Seeder using async await
let seedDatabase = async function () {
  let howie = {
    name: 'howie',
    age: 12,
    grade: 3,
    prefect: true
  }

  let felix = {
    name: 'felix',
    age: 9,
    grade: 4
  }

  let hela = {
    name: 'hela',
    age: 16,
    grade: 5
  }

  await Student.create(howie)
  await Student.create(felix)
  await Student.create(hela)
};

// Drop DB then seed
mongoose.connection.collections.students.drop(async function () {
  await seedDatabase()
  mongoose.connection.close()
});