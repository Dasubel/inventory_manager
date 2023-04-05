/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('managers').del()
  await knex('managers').insert([
    {first_name: 'Corey', last_name: 'Milan', username: 'Dasubel', password:'Password1234'},
  ]);
};