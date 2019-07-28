# Clean Node Architecture

My version of a basic clean node architecture.

Directory:
```bash
==========================================================================================================
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
============================================================================================================
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
==============================================================================================================
drivers
  L cli                   // cli driver depends on data-access students-db
  L webserver             // express web-server
    L routes
      L index.js          // routes paths
      L students.js       // requires our data-access students-db
      L teachers.js       // per above
    L server.js
```