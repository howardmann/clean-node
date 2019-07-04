# Clean Node Architecture

My version of a basic clean node architecture.

Directory:
```bash
==========================================================================================================
models                    // entity responsible for schema validation. No dependencies to other logic
  L student
    L index.js            // dependency inject schema/ validation library
    L student-schema.js   // external JOI validation library
    L student.js          // simple model takes info, validates and returns read only object

db                        // db connection and adapter
  L memory                // in memory JSON
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
==============================================================================================================
drivers
  L cli                   // cli driver depends on data-access students-db
  L webserver             // express web-server
    L routes
      L index.js          // routes paths
      L students.js       // requires our data-access students-db
    L server.js
```