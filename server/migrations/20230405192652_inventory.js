/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('inventory', table => {
        table.increments('id'); // adds an auto incrementing PK column
        table.string('name').notNullable();
        table.string('description');
        table.integer('quantity');
        table.integer('manager_id').unsigned().notNullable();
        table.foreign('manager_id').references('id').inTable('managers');
        //table.timestamps(true, true); // adds created_at and updated_at
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('inventory');
};
