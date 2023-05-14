const express = require("express");
const database = require('./database/database');
const User = require('./database/schema');
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
    console.log("Server is Running at: http://localhost:3000/");
})

// APIs
app.post('/', async (request, response) => {
    let newUser = new User({
        email: request.body.email,
        password: request.body.password
    });

    await newUser.save();
    await response.json("You are now Registred");
});

app.get("/", async (request, response) => {
    const allData = await User.find({})
    await response.json(allData);
});