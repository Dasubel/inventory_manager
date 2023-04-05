const knex = require("./dbConnection");

module.exports = {
    getAllInventory: () => {
        return knex.select("*").from("inventory");
    },

    addItem: (itemToInsert, itemDesc, Q) => {
        return knex("inventory")
          .insert({name: itemToInsert})
          .insert({description: itemDesc})
          .insert({quantity: Q})
    },

    newUser: (first, last, uname, pword) => {
        return knex("managers")
        .insert({first_name: first})
        .insert({last_name: last})
        .insert({username: uname})
        .insert({password: pword})
    },

    deleteItem: async (name, res) => {
        let results = await knex("inventory")
        .where("name", name)
        .del()
    }
}