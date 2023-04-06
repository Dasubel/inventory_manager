const knex = require("./dbConnection");

module.exports = {
    getAllInventory: () => {
        return knex.select("*").from("inventory");
    },

    getAllManagers: () => {
        return knex.select("*").from("managers");
    },

    getManagerInventory: () => {
        return knex.select("*").from("inventory").where("manager_id", 5);
    },

    addItem: (itemToInsert, itemDesc, Q, id) => {
        return knex("inventory")
          .insert({
            name: itemToInsert,
            description: itemDesc,
            quantity: Q,
            manager_id : id
        })
    },

    newUser: (first, last, uname, pword) => {
        return knex("managers")
        .insert({
            first_name: first,
            last_name: last,
            username: uname,
            password: pword
        })
    },

    deleteItem: async (name, res) => {
        return knex("inventory")
        .where("name", name)
        .del()
    }
}