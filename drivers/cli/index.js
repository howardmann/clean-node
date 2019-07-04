let args = require('yargs-parser')(process.argv.slice(2))
let studentsDb = require('../../data-access/students-db/index')

let printHelp = function () {
  console.log(`
    Help usage:
    --index  list students
    --show   find student by {ID}
    --help   print help
  `);
}

let valid = args.index || args.show

if (args.help || !valid) {
  printHelp()
  process.exit(1)
}

if (args.index) {
  studentsDb.listStudents().then(data => {
    console.log(data);
    process.exit(1)
  })
}

if (args.show) {
  studentsDb.findStudent('id', args.show).then(data => {
    console.log(data);
    process.exit(1)
  })
}
