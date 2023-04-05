/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('inventory', table => {
        table.increments('id'); // adds an auto incrementing PK column
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.integer('quantity').notNullable();
        table.timestamps(true, true); // adds created_at and updated_at
    });
};

exports.up = function (knex) {
    return knex.schema.createTable('managers', table => {
        table.increments('id'); // adds an auto incrementing PK column
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.timestamps(true, true); // adds created_at and updated_at
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('inventory');
};
