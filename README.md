# Clean Node Architecture

My version of a basic clean node architecture.

Directory:
```bash
==========================================================================================================
validator                 // validate object against schema (easily switch between libraries with consistent external API)
  L index.js              // root, access all validators (e.g. studentValidator, teacherValidator) depdendant on validation library
  L joi                   // different validation libraries
    L index.js            // wrapper to expose consistent validator API (i.e. true if valid otherwise { error: [message]} )
    L student-schema.js   // object schema dependens on specific library
    L teacher-schema.js
  L validatejs            // per above but different library
    L student-schema.js
    L teacher-schema.js
==========================================================================================================
models                    // create new entity by validating payload and new returning read only object 
  L student
    L index.js            // dependency inject schema/ validation library (from validator above)
    L student.js          // simple model takes info, validates and returns read only object
  L teacher
    L index.js
    L teacher.js

db                        // db connection and adapter
  L memory                // in memory JSON
    L students.js         
    L teachers.js         
  L mongodb               // TODO: using mongoose connection
============================================================================================================
data-access               // think of it as our internal ORM (logic for our use-cases lies here)
  L students-db           
    L index.js            // other controllers and drivers rely on this API (findStudent, listStudents, addStudent)
    L memory              // in memory
      L index.js          // expose the memory implementation of findStudent, listStudents, addStudents
      L serializer.js     // serializes to DB specific properties (e.g. serial > id, year > grade)
    L mongodb             // TODO: Illustrative
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