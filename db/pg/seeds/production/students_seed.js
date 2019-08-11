exports.seed = async function (knex) {
  await knex.raw('DELETE FROM Students')

  await knex.raw('ALTER SEQUENCE students_id_seq RESTART WITH 1')

  await knex.raw(`
    INSERT INTO Students (name, age, grade, prefect) VALUES
    ('howie', 12, 3, TRUE),
    ('felix', 9, 4, FALSE),
    ('hela', 16, 5, FALSE),
    ('tony hawk', 45, 5, FALSE)
  `)
};