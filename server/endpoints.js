const express = require('express');
const app = express();
const cors = require('cors')
const port = 8081;
const controllers = require("./controllers");

app.use(express.json())
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};
app.use(cors(corsOptions));

app.listen(port, () => {
    console.log(`Express server listening on port: ${port}`)
})

app.get('/inventory', (req, res) => {
    controllers.getAllInventory()
        .then(data => {
            console.log(data)
            res.status(200).send(data)
        })
})

app.get('/managers', (req, res) => {
    controllers.getAllManagers()
        .then(data => {
            res.status(200).send(data)
        })
})

// app.get(`/inventory/${id}`, (req, res) => {
//     controllers.getManagerInventory()
//         .then(data => {
//             //console.log(data)
//             res.status(200).send(data)
//         })
// })

app.delete('/inventory', (req, res) => {
    const { name } = req.body
    controllers.deleteItem(name)
        .then(() => res.status(201).send({ data: `${name} removed from inventory` }))
})

app.post('/inventory', (req, res) => {
    const { name, description, quantity, manager_Id } = req.body
    controllers.addItem(name, description, quantity, manager_Id)
        .then(() => res.status(201).send({ data: `${name} added to library` }))
})

app.post('/managers', (req, res) => {
    const { first_name, last_name, username, password } = req.body
    controllers.newUser(first_name, last_name, username, password)
        .then(() => res.status(201).send({ data: `${username} added to library` }))
})