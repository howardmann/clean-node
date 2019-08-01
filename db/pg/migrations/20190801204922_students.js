
exports.up = function(knex) {
  return knex.raw(`
    CREATE TABLE Students (
      id serial PRIMARY KEY,
      name varchar(100),
      age int,
      grade int,
      prefect boolean DEFAULT false
    );
  `)
};

exports.down = function(knex) {
  return knex.raw(`
    DROP TABLE Students;
  `)
};
