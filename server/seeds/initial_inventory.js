/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('inventory').del()
  .then(function() {
    return knex('inventory').insert([
      {name: '', description: '', quantity: 0},
    ]);
  })
  
};
