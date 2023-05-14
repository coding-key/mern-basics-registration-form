const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/regform")
.then(() => {
    console.log("Database Connected");
})
.catch((error) => {
    console.log(`Database Error: ${error}`);
})