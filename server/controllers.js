const knex = require("./dbConnection");

module.exports = {
    getAllInventory: () => {
        return knex.select("*").from("inventory");
    },

    addItem: (itemToInsert, itemDesc, Q) => {
        return knex("inventory")
          .insert({
            name: itemToInsert,
            description: itemDesc,
            quantity: Q
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