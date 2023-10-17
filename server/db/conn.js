const mongoose = require("mongoose");

const DB = "mongodb+srv://admin:12345@cluster0.lr90jd5.mongodb.net/mernstack?retryWrites=true&w=majority";

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(() => console.log("connection start")).catch((error) => console.log(error.message));