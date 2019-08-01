var environment = 'development';
var config = require('../../knexfile')[environment];

module.exports = require('knex')(config);