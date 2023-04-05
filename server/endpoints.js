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