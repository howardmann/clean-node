# Clean Architecture in Node.js

[Click here for full blog post](https://mannhowie.com/clean-architecture-node)

Uncle Bob's famous [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) is a way to write resilient software.

Resilient software is divided into layers, underpinned by business logic and is independent of technologies. It should be:
1. **Independent of Frameworks**. Libraries and frameworks should be treated as tools and not dependencies.
2. **Testable**. Can be tested without external dependencies.
3. **Independent of UI**. You can easily switch CLI for Web or RasberryPi.
4. **Independent of Database**. Switch out SQL for MongoDB.
5. **Independent of any external agency**. Business rules don't know anything about outside world.

![The Clean Architecture diagram](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

In practice, choice of technology should be the last decision you make or code you write (e.g. database, platform, framework).

By following clean architecture, you can write software today that can be easily switched out for different technologies in the future.

## Practical Example of Clean Architecture in Node.js
This is an example of a simple CRUD application with layered software and separation of business logic vs technology. 

It is a simple API for creating `students` and `teachers` and includes validation, persistence and UI. It includes examples using different interfaces (CLI and Web), databases (in memory, MongoDB), and libraries (validation).

[Click here for github repo.](https://github.com/howardmann/clean-node)

*Note: this application is different to the Clean Architecture diagram above but attempts to achieve the same outcome.*

### Software layer overview
The application is separated into three layers. Inner layers cannot depend on outer layers and outer layers should only depend one layer in:

- **Inner Layer**
  - **Models**. Handles the creation, validation and reading of our entities (students and teachers). Note that this should be custom logic and not include the DB implementation of models (e.g. in Mongoose DB ORM, their models should be encapsulated in the DB layer below). Our model schemas live here. 
  - **DB**. Our choice of DB (in memory, MongoDB, SQL), this is independent of the model. Note that in Clean Architecture this is considered an outer layer framework, but for practical applications I find it easier to place it inner and have the data-access layer depend on it rather than injecting it in.
- **Middle Layer**
  - **Data-Access**. Handles transfer between the DB (like an ORM). Depends on the model to validate and create the entity in DB. The key is to have a consistent & custom API that all outer layers communicate with. Testing here will ensure that replacing or using multiple DBs doesn't break anything further upstream. 
- **Outer Layer**
  - **Drivers**. Represents the UI or interface (Web or CLI). It communicates only with the data-access layer.

### Example application structure
```bash
============= INNER LAYER =====================================================================
models                    // create new entity by validating payload and returning new read only object 
  L student
    L index.js            // dependency inject schema/ validation library
    L index.test.js       // tests makeStudent()
    L student.js          // simple model takes info, validates and returns read only object
    L student-schema.js   // student validation schema
  L teacher
    L index.js
    L teacher.js
    L teacher-schema.js
  L validator             // wrapper around JOI validation library
    L index.js            // consistent API if ever to switch out a new validation library
    L index.test.js       // tests for validation schema for all models

db                        // db connection and adapter
  L memory                // in memory JSON
    L students.js         
    L teachers.js         
  L mongodb               // mongodb alternative
    L connection.js       // connection library
    L seeds               // seed library
      L students-seeds.js // async seed students db
    L models
      L student.js        // models specific to mongodb. this is different to our business logic models which handle tests and validation

============= MIDDLE LAYER =====================================================================
data-access               // think of it as our internal ORM (logic for our use-cases lies here)
  L students-db           
    L index.js            // other controllers and drivers rely on this API (findStudent, listStudents, addStudent)
    L memory              // in memory
      L index.js          // expose the memory implementation of findStudent, listStudents, addStudents
      L serializer.js     // serializes to DB specific properties (e.g. serial > id, year > grade)
    L mongodb             // mongodb ORM
      L index.js          // uses mongoose implementation of findStudent, listStudents, dropAll etc.
      L serializer.js     // serializes _id to id
    L postgresql          // TODO: Illustrative
    L airtable            // TODO: Illustrative
  L teachers-db           // per students-db above

============= OUTER LAYER =====================================================================
drivers
  L cli                   // cli driver depends on data-access students-db
  L webserver             // express web-server
    L routes
      L index.js          // routes paths
      L students.js       // requires our data-access students-db
      L teachers.js       // per above
    L server.js
```

### Practical approach
In practice, we can defer technology decisions by writing our application in the following order:
1. Start with models, schema and validation. Write test spec.
2. Defer DB decision by using in-memory JSON store
3. Create a data-access API that depends on model and in-memory DB. Write test spec.
4. First tech decision: UI interface (e.g. web or CLI). Depend on above data-access layer. Write integration test spec. 
5. Second tech decision: DB choice (MongoDB, SQL). Replace in-memory DB store. Write data-access methods specific to the DB choice. Ensure previously written test specs pass.

### Models
Our model is a simple factory function that validates a payload (dependency injected validator) and returns a new object with getters.

```javascript
// models/student/student.js
let buildMakeStudent = function(studentValidator) {
  return ({
    name,
    age,
    grade,
    prefect = false
  } = {}) => {
    let {error} = studentValidator({name, age, grade, prefect})
    if (error) throw new Error(error)

    return {
      getName: () => name,
      getAge: () => age,
      getGrade: () => grade,
      isPrefect: () => prefect
    }
  }
}

module.exports = buildMakeStudent
```
While the model schema is dependent on a validation library and breaks the Clean rules, I find it easier to understand the model by having the schema inside the model. (Note: see the repo for an example of how the validator could be separated into its own software entity).

```javascript
// models/student/student-schema.js
let Joi = require('joi')

module.exports = Joi.object().keys({
  name: Joi.string().required().error(() => 'must have name as string'),
  age: Joi.number().error(() => 'age must be a number'),
  grade: Joi.number().error(() => 'grade must be a number'),
  prefect: Joi.boolean().error(() => 'prefect must be a boolean')
})
```

We then dependency inject the validation library into the model. Note we use a wrapper for the validation library to make it easier to switch out libraries in future.

```javascript
// models/student/index.js
let buildMakeStudent = require('./student')
let studentSchema = require('./student-schema')
let studentValidator = require('../validator/')(studentSchema)

let makeStudent = buildMakeStudent(studentValidator)

module.exports = makeStudent
```

Write two sets of unit tests for our model. First testing the validation library for valid vs invalid payloads and relevant error messages. And second testing the creation and read only of the model entity.

```javascript
// models/validator/index.test.js
studentValidator
  [] validates name:string:required, grade:number, age:number, prefect:boolean 
  [] returns error messages if invalid

teacherValidator
  [] validates name:string:required, subject:string, tenure:boolean
  [] returns error messages if invalid
```

```javascript
// models/student/index.test.js
makeStudent
  [] throws error if invalid payload
  [] must have name
  [] can have grade
  [] can have age
  [] sets prefect to false by default
```
### Data-Access
The data-access layer is one of the most important. We should feel confident to easily replace DBs.

Here we need three key components
1. API and test spec
2. Serializers to adapt custom DB to our model schema
3. DB implementation of the API and passing of test

Start with how we think the outer layers will communicate with the data-access layer and what they should expect to get.

```javascript
// data-access/students-db/index.test.js
// example test spec
studentsDb
  - listStudents() lists students
  - findStudent() find single student by id
  - findStudentsBy() finds all students by property
  - addStudent() inserts a student
  - throws error if student payload invalid
  - deleteStudent() deletes a student
  - dropAll() drops students database
```

Write a serializer which adapts the custom DB schema with our model schema.

```javascript
// data-access/students-db/mongodb/serializer.js
// e.g. mongodb stores property id as _id
const _serializeSingle = (student) => {
  return {
    'id': student._id,
    'grade': student.grade,
    'name': student.name,
    'age': student.age,
    'prefect': student.prefect
  };
};

const serializer = (data) => {
  if (!data) {
    return null
  }
  if (Array.isArray(data)) {
    return data.map(_serializeSingle)
  }
  return _serializeSingle(data)
}

module.exports = serializer
```
Write custom DB implementation of the test spec API. Here is an example of an in-memory implementation (which you should start with) and a MongoDB version. Note: the advantage of writing a test spec is you can focus on simply writing code that just has to work.
#### In-memory data-access:
```javascript
// data-access/students-db/memory/index.js
let STUDENTS = require('../../../db/memory/students') // DB
let makeStudent = require('../../../models/student/index') // model
let serialize = require('./serializer') // serializer custom to db

let listStudents = () => {
  return Promise.resolve(serialize(STUDENTS))
}

let findStudent = (prop, val) => {
  if (prop === 'id') { prop = 'serial' }
  let student = STUDENTS.find(student => student[prop] == val)
  return Promise.resolve(serialize(student))
}

let findStudentsBy = (prop, val) => {
  let student = STUDENTS.filter(student => student[prop] == val)
  return Promise.resolve(serialize(student))
}


let addStudent = (studentInfo) => {
  let student = makeStudent(studentInfo)
  let newStudent = {
    serial: STUDENTS.length + 1,
    year: student.getGrade(),
    name: student.getName(),
    age: student.getAge(),
    prefect: student.isPrefect()
  }
  STUDENTS.push(newStudent)
  return findStudent('serial', newStudent.serial)
}

let deleteStudent = (id) => {
  return findStudent({id})
    .then(student => {
      if (student.id == id) {
        STUDENTS = STUDENTS.filter(student => student.serial != id)
        return {
          id,
          status: 'success'
        }
      }
      return {
        status: 'fail'
      }
    })
}

let dropAll = () => {
  STUDENTS = [];
  return STUDENTS;
}

module.exports = {
  listStudents,
  findStudent,
  findStudentsBy,
  addStudent,
  deleteStudent,
  dropAll
}
```
#### MongoDB data-access:
Note for our MongoDB data-access implementation we depend on the DB from the inner layer. The DB includes MongoDB specific implementation of the model and DB connection.

We write a dropAll function for the purposes of writing a test spec that can be used across any DB choice. E.g. beforeEach test we would drop the DB and seed items for testing.
```javascript
// data-access/students-db/mongod/index.js
let Student = require('../../../db/mongodb/models/student')
let makeStudent = require('../../../models/student/index') // model
let serialize = require('./serializer') // serializer custom to db

let listStudents = () => {
  return Student.find({})
    .then(serialize)
}

let findStudent = (prop, val) => {
  if (prop === 'id') {
    prop = '_id'
  }
  return Student.find({[prop]: val})
    .then(resp => {
      return serialize(resp[0])
    })
}

let findStudentsBy = (prop, val) => {
  return Student.find({[prop]: val})
    .then(serialize)
}

let addStudent = (studentInfo) => {
  let student = makeStudent(studentInfo)
  let newStudent = {
    name: student.getName(),
    grade: student.getGrade(),
    age: student.getAge(),
    prefect: student.isPrefect()
  }
  return Student.create(newStudent)
    .then(serialize)
}

let deleteStudent = (id) => {
  return Student.findByIdAndDelete(id)
    .then(resp => {
      return {
        id: resp._id.toString(),
        status: 'success'
      }
    })
    .catch(err => {
      return {
        status: 'fail'
      }
    })
}

let dropAll = () => {
  return Student.remove()
}

module.exports = {
  listStudents,
  findStudent,
  findStudentsBy,
  addStudent,
  deleteStudent,
  dropAll
}
```
### Drivers
Finally we write our drivers whose only dependency is our data-access layer. The drivers should not communicate directly with the model or db.

Any changes to the inner layer will cascade up and as a result there should be less testing done on the outer layers. E.g. if we were to test changes to the model schema in the driver layer we would need to rewrite our tests here as well.

```bash
drivers
  L cli
    L index.js
  L webserver         // express webserver
    L routes
      L index.js
      L students.js   // depends on students data-access layer
      L teachers.js   // depends on teachers data-access layer
    L server.js       // depends on routes
```